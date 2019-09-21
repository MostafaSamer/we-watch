import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { MoviesComponent } from './components/adminAdd/movies/movies.component';
import { SeriesComponent } from './components/adminAdd/series/series.component';
import { TempMovieComponent } from './components/adminAdd/temp-movie/temp-movie.component';
import { TempSeriesComponent } from './components/adminAdd/temp-series/temp-series.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'admin-login',
        component: AdminLoginComponent
    },
    {
        path: 'admin-home',
        component: AdminHomeComponent
    },
    {
        path: 'admin-add-movies-temp',
        component: TempMovieComponent
    },
    {
        path: 'admin-add-series-temp',
        component: TempSeriesComponent
    },
    {
        path: 'admin-add-movies',
        component: MoviesComponent
    },
    {
        path: 'admin-add-series',
        component: SeriesComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
