import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
    {
        path: 'home',
        loadChildren: () =>
            import('./pages/landing-page/landing-page.module').then(
                (m) => m.LandingPageModule
            ),
    },
    {
        path: 'dashboard',
        loadChildren: () =>
            import('./pages/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
