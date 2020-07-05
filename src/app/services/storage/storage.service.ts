import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { DatetimeService } from '../datetime/datetime.service';
import { Expense } from 'src/app/interfaces/expense';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private dateTimeService: DatetimeService) { }

  async saveExpenseToLocal(expense: Expense): Promise<void> {
    const key = this.dateTimeService.getDateTimeISO();
    let todaysExpenses: Expense[] = [];

    this.getFromLocalStorage(key).then((expenses: Expense[]) => {
      if (expenses == null) {
        todaysExpenses.push(expense);
      } else {
        todaysExpenses = expenses;

        todaysExpenses.push(expense);
      }
    }).then(() => {
      this.saveToLocalStorage(key, todaysExpenses);
    }).catch((error) => console.log(error));
  }

  async getExpensesFromLocal(date?: Date): Promise<Expense[]> {
    const key = date ? this.dateTimeService.getDateTimeISO(date) : this.dateTimeService.getDateTimeISO();

    return await this.getFromLocalStorage(key).then((expense: Expense[]) => {
      return expense;
    });
  }

  async getFromLocalStorage(key: string): Promise<any> {
    const ret = await Plugins.Storage.get({ key });

    return JSON.parse(ret.value);
  }

  async saveToLocalStorage(key: string, value: Expense[]): Promise<void> {
    await Plugins.Storage.set({
      key,
      value: JSON.stringify(value)
    });
  }

  async removeFromLocalStorage(key: string): Promise<void> {
    return await Plugins.Storage.remove({ key });
  }

  async clearLocalStorage(): Promise<void> {
    return await Plugins.Storage.clear();
  }
}
