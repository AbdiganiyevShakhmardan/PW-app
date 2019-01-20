import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeperatorPipe } from './pipes/seperator.pipe';
import { UiInputComponent } from './components/ui-input/ui-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { UiToolbarComponent } from './components/ui-toolbar/ui-toolbar.component';
import { RouterModule } from '@angular/router';
import { UiLoaderComponent } from './components/ui-loader/ui-loader.component';
import { UiLoaderDirective } from './components/ui-loader/ui-loader.directive';

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
        UiLoaderComponent,
        UiLoaderDirective
    ],
    exports: [
        SeperatorPipe,
        UiInputComponent,
        UiToolbarComponent,
        UiLoaderDirective
    ]
})
export class UiSharedModule {
    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: UiSharedModule
        }
    }
}
