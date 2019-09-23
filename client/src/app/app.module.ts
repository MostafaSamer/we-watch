import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileSelectDirective } from 'ng2-file-upload';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { AdminAddComponent } from './components/admin-add/admin-add.component';
import { SeriesComponent } from './components/adminAdd/series/series.component';
import { MoviesComponent } from './components/adminAdd/movies/movies.component';
import { TempMovieComponent } from './components/adminAdd/temp-movie/temp-movie.component';
import { TempSeriesComponent } from './components/adminAdd/temp-series/temp-series.component';
import { VeiwTempComponent } from './components/veiw-temp/veiw-temp.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminAddComponent,
    FileSelectDirective,
    SeriesComponent,
    MoviesComponent,
    TempMovieComponent,
    TempSeriesComponent,
    VeiwTempComponent,
    NavbarComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
