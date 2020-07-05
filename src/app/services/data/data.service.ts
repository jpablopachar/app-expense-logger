import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Expense } from 'src/app/interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private expense: BehaviorSubject<Expense>;

  constructor() {
    this.expense = new BehaviorSubject<Expense>(null);
  }

  async getExpenses(): Promise<Expense> {
    return this.expense.getValue();
  }

  async setExpenses(expenses: Expense): Promise<void> {
    return this.expense.next(expenses);
  }

  getExpenseSubs(): BehaviorSubject<Expense> {
    return this.expense;
  }
}
