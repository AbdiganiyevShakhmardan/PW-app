import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';

@Component({
    selector: 'ui-input',
    templateUrl: './ui-input.component.html',
    styleUrls: ['./ui-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UiInputComponent),
            multi: true
        }
    ]
})
export class UiInputComponent implements OnInit, OnDestroy, ControlValueAccessor, OnChanges {
    @Input() cols = 10;
    @Input() rows = 3;
    @Input() placeholder = "";

    value: any;

    @ViewChild('autocomplete')
    private autocompleteTemplate: TemplateRef<any>;

    @Input() leftLabel: string;
    _rightLabel: string | TemplateRef<any>;
    rightLabelTemplate = false;
    @Input() set rightLabel(value) {
        this._rightLabel = value;
        if (this.rightLabel instanceof TemplateRef) {
            this.rightLabelTemplate = true;
        }
    }
    get rightLabel() {
        return this._rightLabel;
    }
    @Input() type = "text";
    @Input() set disabled(isDisabled: boolean) {
        this.setDisabledState(isDisabled)
    }

    @HostBinding('class.disabled')
    get isDisabled() {
        return this.control.disabled;
    }

    private autocompleteOverlay: OverlayRef;
    @Input() min: number;
    @Input() max: number;
    @Input() maxLength = 100;
    control = new FormControl();
    subscription = this.control.valueChanges.subscribe(value => {
        this.value = value;
        if (this.type === 'number') {
            this.value = +this.value;
            if (this.min != null && this.value < this.min) {
                this.control.setValue(this.min);
            }
            if (this.max != null && this.value > this.max) {
                this.control.setValue(this.max);
            }
        }
        if (this.onChange) {
            this.onChange(this.value);
        }
    });

    @Output() autocompleteSelected = new EventEmitter();
    @Input() autocompleteItems: any[] = [];
    @Output() blur = new EventEmitter();
    @Input() autocompleteDisplay = (item) => {
        return item.toString();
    };

    onChange = e => { };
    onTouched = e => { };

    constructor(
        private overlay: Overlay,
        private elementRef: ElementRef,
        private vcr: ViewContainerRef
    ) { }

    private get element() {
        return this.elementRef.nativeElement as HTMLDivElement;
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('autocompleteItems' in changes) {
            if (!changes['autocompleteItems'].isFirstChange()) {
                // this.showAutocomplete(t);
            }
        }
    }

    closeAutocomplete() {
        if (this.autocompleteOverlay && this.autocompleteOverlay.hasAttached()) {
            this.autocompleteOverlay.dispose();
        }
    }

    showAutocomplete(items: any) {
        this.autocompleteItems = items;
        this.closeAutocomplete();
        this.autocompleteOverlay = this.overlay.create({
            width: this.element.clientWidth,
            positionStrategy: this.overlay.position().connectedTo(
                this.elementRef,
                {
                    originX: 'center',
                    originY: 'bottom'
                },
                {
                    overlayX: 'center',
                    overlayY: 'top'
                }
            ).withLockedPosition(true),
            backdropClass: 'transparent',
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            hasBackdrop: true
        });
        this.autocompleteOverlay.backdropClick().subscribe(() => {
            this.closeAutocomplete();
        })

        const portal = new TemplatePortal(this.autocompleteTemplate, this.vcr);
        this.autocompleteOverlay.attach(portal);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    writeValue(obj: any): void {
        this.value = obj;
        this.control.setValue(this.value);
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }
    setDisabledState?(isDisabled: boolean): void {
        if (isDisabled) {
            this.control.disable();
        } else {
            this.control.enable();
        }
    }

    selectAutocompleteItem(item: any) {
        this.autocompleteSelected.emit(item);
    }


}
