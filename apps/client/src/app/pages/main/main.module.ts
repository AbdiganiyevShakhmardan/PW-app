import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main/main.component';
import { UiSharedModule } from '@pw/ui-shared';
import { ReactiveFormsModule } from '@angular/forms';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

@NgModule({
    imports: [
        CommonModule,
        MainRoutingModule,
        ReactiveFormsModule,
        UiSharedModule
    ],
    declarations: [MainComponent, TransactionComponent, TransactionHistoryComponent]
})
export class MainModule { }
