import { Injectable } from '@angular/core';
import { ConfigVariables } from './config'
import { HttpClient } from  '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
      private http: HttpClient,
  ) { }

  //*************************
  // USER //
  //*************************
  public login(email, pass) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/login`, {
          'email': email,
          'pass': pass
      }).pipe(map((res: any)=> {
          return res;
      }))
  }

  public register(user) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/register`, user).pipe(map((res: any)=> {
          return res;
      }))
  }

  public search(key) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/search`, key).pipe(map((res: any)=> {
          return res;
      }))
  }

  //*************************
  // ADMIN //
  //*************************
  public adminLogin(email, pass) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/login`, {
          'email': email,
          'pass': pass
      }).pipe(map((res: any)=> {
          return res;
      }))
  }

  //*************************
  // General //
  //*************************
  public getlastAddedMovie(offset) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/home/moviesOffset`, {
          offset: offset
      }
      ).pipe(map((res)=> {
          return res
      }))
  }

  public getlastAddedSeries(offset) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/home/seriesOffset`, {
          offset: offset
      }
      ).pipe(map((res)=> {
          return res
      }))
  }

  //*************************
  // Temps //
  //*************************
  public getMoviesTemp() {
      return this.http.get(`${ConfigVariables.API_URL}admin/get/moviesTemp`).pipe(map((res)=> {
          return res
      }))
  }

  public getSeriesTemp() {
      return this.http.get(`${ConfigVariables.API_URL}admin/get/seriesTemp`).pipe(map((res)=> {
          return res
      }))
  }

  public addNewTempsMovies(tempData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/add/moviesTemp`, tempData
      ).pipe(map((res)=> {
          return res
      }))
  }
  public addNewTempSeries(tempData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/add/seriesTemp`, tempData
      ).pipe(map((res)=> {
          return res
      }))
  }

  //*************************
  // MOVIES //
  //*************************
  public adminUploadMovie(videoData, originalData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/upload/movies`, videoData).pipe(map((res: any)=> {
          this.organizeDataMovie(res, originalData).pipe().subscribe(data=> {
              return data
          })

      }))
  }

  private organizeDataMovie(fileOldName, originalData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/upload/movies/originalDataAndName`, {
          'oldName': fileOldName,
          'newData': originalData
      }).pipe(map((res)=> {
          return res
      }))
  }

  //*************************
  // SERIES //
  //*************************
  public adminUploadSeries(videoData, originalData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/upload/series`, videoData).pipe(map((res: any)=> {
          this.organizeDataSeries(res, originalData).pipe().subscribe(data=> {
              return data
          })

      }))
  }

  private organizeDataSeries(fileOldName, originalData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/upload/series/originalDataAndName`, {
          'oldName': fileOldName,
          'newData': originalData
      }).pipe(map((res)=> {
          return res
      }))
  }

}