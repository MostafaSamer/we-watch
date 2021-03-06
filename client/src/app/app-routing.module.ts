import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HomeMovieComponent } from './components/home-movie/home-movie.component';
import { HomeSerieComponent } from './components/home-serie/home-serie.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { MoviesComponent } from './components/adminAdd/movies/movies.component';
import { SeriesComponent } from './components/adminAdd/series/series.component';
import { TempMovieComponent } from './components/adminAdd/temp-movie/temp-movie.component';
import { TempSeriesComponent } from './components/adminAdd/temp-series/temp-series.component';
import { VeiwTempComponent } from './components/veiw-temp/veiw-temp.component';
import { ViewVideoMoviesComponent } from './components/view-video-movies/view-video-movies.component';
import { ViewVideoSeriesComponent } from './components/view-video-series/view-video-series.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ListFavComponent } from './components/list-fav/list-fav.component';
import { AdminEditTempMoviesComponent } from './components/admin-edit-temp-movies/admin-edit-temp-movies.component';
import { AdminEditTempSeriesComponent } from './components/admin-edit-temp-series/admin-edit-temp-series.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdminNotificationComponent } from './components/admin-notification/admin-notification.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
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
        path: 'movies',
        component: HomeMovieComponent
    },
    {
        path: 'series',
        component: HomeSerieComponent
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
        path: 'edit-temp-movie/:id',
        component: AdminEditTempMoviesComponent
    },
    {
        path: 'edit-temp-serie/:id',
        component: AdminEditTempSeriesComponent
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
    {
        path: 'view-temp/:type/:id',
        component: VeiwTempComponent
    },
    {
        path: 'view-video-movies/:id',
        component: ViewVideoMoviesComponent

    },
    {
        path: 'view-video-series/:id',
        component: ViewVideoSeriesComponent
    },
    {
        path: 'search/:name',
        component: SearchResultComponent
    },
    {
        path: 'listFav',
        component: ListFavComponent
    },
    {
        path: 'contact',
        component: ContactUsComponent
    },
    {
        path: 'admin_notification',
        component: AdminNotificationComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
