import { Component, OnInit, ValueProvider } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddExpenseComponent } from '../shared/add-expense/add-expense.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  async presentModal(): Promise<void> {
    const modal = await this.modalController.create({ component: AddExpenseComponent });

    return await modal.present();
  }
}
