import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainGuard } from './providers/guards/main.guard';
import { AuthorizedGuard } from './providers/guards/authorized.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'transaction',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        canActivate: [AuthorizedGuard],
        loadChildren: './pages/auth/auth.module#AuthModule'
    },
    {
        path: 'transaction',
        canActivate: [MainGuard],
        loadChildren: './pages/main/main.module#MainModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
