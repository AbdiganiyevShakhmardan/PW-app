import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NxModule } from '@nrwl/nx';
import { AuthRoutingModule } from './app-routing.module';
import { BackendModule } from '@pw/backend';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        NxModule.forRoot(),
        AuthRoutingModule,
        BackendModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
