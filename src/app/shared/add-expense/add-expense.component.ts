import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Expense } from 'src/app/interfaces/expense';
import { ActionService } from 'src/app/services/action/action.service';
import { DatetimeService } from 'src/app/services/datetime/datetime.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
})
export class AddExpenseComponent implements OnInit {
  // expense: Expense;
  addExpenseForm: FormGroup;

  constructor(private modalController: ModalController, private actionService: ActionService, private dateTimeService: DatetimeService) { }

  ngOnInit(): void {
    this.addExpenseForm = new FormGroup({
      amount: new FormControl('', Validators.required),
      description: new FormControl(''),
      type: new FormControl('', Validators.required)
    });
  }

  createExpense(): void {
    const expense = this.addExpenseForm.value;

    expense.createdOn = this.dateTimeService.getCurrentDateTime();

    this.actionService.createExpense(expense).then(() => {
      console.log('Expense fue creado');
      this.dismissModal();
    }).catch((error) => console.log(error));
  }

  dismissModal(): void {
    this.modalController.dismiss().then().catch();
  }
}
