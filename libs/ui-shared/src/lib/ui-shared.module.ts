import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeperatorPipe } from './pipes/seperator.pipe';
import { UiInputComponent } from './components/ui-input/ui-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { UiToolbarComponent } from './components/ui-toolbar/ui-toolbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        OverlayModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        SeperatorPipe,
        UiInputComponent,
        UiToolbarComponent,
    ],
    exports: [
        SeperatorPipe,
        UiInputComponent,
        UiToolbarComponent,
    ]
})
export class UiSharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: UiSharedModule
        }
    }
}
