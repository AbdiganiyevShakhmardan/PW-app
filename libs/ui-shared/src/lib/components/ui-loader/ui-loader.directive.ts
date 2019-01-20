import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
    selector: '[uiLoader]',
    exportAs: 'uiLoader'
})
export class UiLoaderDirective {

    @HostBinding('style.position') private position = 'relative';

    isLoading = false;

    constructor(private el: ElementRef) { }

    showLoader() {
        this.isLoading = true;
    }

    hiderLoader() {
        this.isLoading = false;
    }

}
