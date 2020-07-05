import { Component, OnInit, ValueProvider, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddExpenseComponent } from '../shared/add-expense/add-expense.component';
import { Expense } from '../interfaces/expense';
import { SubscriptionLike } from 'rxjs';
import { DataService } from '../services/data/data.service';
import { ActionService } from '../services/action/action.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  expenses: Expense[] = [];
  dashboardSubs: SubscriptionLike;

  constructor(private modalController: ModalController, private dataService: DataService, private actionService: ActionService) { }

  ngOnInit() {
    this.actionService.getTodayExpensesFromLocal().then((value => this.expenses = value));
    this.dashboardSubs = this.dataService.getExpenseSubs();
    this.dashboardSubs = this.dataService.getExpenseSubs().subscribe({
      next: (expense) => {
        if (expense != null) {
          this.expenses.push(expense);
        }
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({ component: AddExpenseComponent });

    return await modal.present();
  }

  ngOnDestroy(): void {
    this.dashboardSubs.unsubscribe();
  }
}
