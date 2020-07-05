import { Injectable } from '@angular/core';
import { DataService } from '../data/data.service';
import { Expense } from 'src/app/interfaces/expense';
import { StorageService } from '../storage/storage.service';
import { DatetimeService } from '../datetime/datetime.service';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  constructor(private dataService: DataService, private storageService: StorageService, private dateTimeService: DatetimeService) { }

  async createExpense(expence: Expense): Promise<void> {
    const key = this.dateTimeService.getDateTimeISO(expence.createdOn);

    this.storageService.saveExpenseToLocal(expence);

    return this.dataService.setExpenses(expence);
  }

  async getTodayExpensesFromLocal(): Promise<Expense[]> {
    return await this.storageService.getExpensesFromLocal().then((expenses: Expense[]) => {
      return expenses;
    });
  }
}
