import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AddExpenseComponent } from './add-expense/add-expense.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddExpenseComponent],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
