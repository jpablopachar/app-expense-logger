import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tablero',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'cuenta',
        loadChildren: () => import('../account/account.module').then(m => m.AccountModule)
      },
      {
        path: 'presupuesto',
        loadChildren: () => import('../budget/budget.module').then(m => m.BudgetModule)
      },
      {
        path: 'actividad',
        loadChildren: () => import('../activity/activity.module').then(m => m.ActivityModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tablero',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tablero',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
