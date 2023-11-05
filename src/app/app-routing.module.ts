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
    {
        path: '**',
        loadChildren: () =>
            import('./pages/not-found/not-found.module').then(
                (m) => m.NotFoundModule
            ),
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
