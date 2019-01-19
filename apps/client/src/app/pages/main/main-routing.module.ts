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
                path: 'history',
                component: TransactionHistoryComponent
            },
            {
                path: 'transfer',
                component: TransactionComponent
            },
            {
                path: '',
                redirectTo: '/transaction/history'
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
