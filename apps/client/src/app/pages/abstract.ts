import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Injector, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Backend } from '@pw/backend';
import { HelperService } from '../providers/services/helper.service';

export class Abstract implements OnInit, OnDestroy, AfterViewInit, AfterContentInit{

    viewInitialized = false;
    contentInitialized = false;

    protected stopSubject = new Subject();
    protected destroy = this.stopSubject.asObservable();
    protected backend: Backend;
    protected changeDetector: ChangeDetectorRef;
    protected route: ActivatedRoute;
    protected router: Router;
    protected helper: HelperService;

    constructor(protected injector: Injector) {
        this.backend = this.injector.get(Backend);
        this.changeDetector = this.injector.get(ChangeDetectorRef);
        this.router = this.injector.get(Router);
        this.route = this.injector.get(ActivatedRoute);
        this.helper = this.injector.get(HelperService);
    }

    ngOnInit() {}

    ngOnDestroy(): void {
        this.stopSubject.next();
        this.stopSubject.complete();
    }

    ngAfterViewInit(): void {
        this.viewInitialized = true;
        this.changeDetector.detectChanges();
    }

    ngAfterContentInit(): void {
        this.contentInitialized = true;
        this.changeDetector.detectChanges();
    }
}
