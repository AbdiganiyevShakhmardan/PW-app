import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                redirectTo: '/transaction/history',
                pathMatch: 'full'
            },
            {
                path: 'history',
                component: TransactionHistoryComponent
            },
            {
                path: 'transfer',
                component: TransactionComponent
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
