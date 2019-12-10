import { Injectable } from '@angular/core';
import { ConfigVariables } from './config'
import { HttpClient } from  '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './classes/user'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    user = new User();

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

  public numberOfvideos() {
      return this.http.get(`${ConfigVariables.API_URL}user/home/numberOfvideos`).pipe(map((res)=> {
          return res
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

  public addFavMovie(data) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/movies/addFav`, data).pipe(map((res: any)=> {
          this.updateUserLocal((res)=> {
              return res;
          });
      }))
  }

  public addFavSerie(data) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/Series/addFav`, data).pipe(map((res: any)=> {
          this.updateUserLocal((res)=> {
              return res;
          });
      }))
  }

  public delFavMovie(data) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/movies/delFav`, data).pipe(map((res: any)=> {
          this.updateUserLocal((res)=> {
              return res;
          });
      }))
  }

  public delFavSerie(data) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/Series/delFav`, data).pipe(map((res: any)=> {
          this.updateUserLocal((res)=> {
              return res;
          });
      }))
  }

  public sendMessage(title, mess) {
      return this.http.post<any>(`${ConfigVariables.API_URL}user/message`, {
          user_email: JSON.parse(localStorage.getItem('currentUser')).email,
          title: title,
          mess: mess
      }).pipe(map((res: any)=> {
          this.updateUserLocal((res)=> {
              return res;
          });
      }))
  }

  private updateUserLocal(callback) {
      this.user = JSON.parse(localStorage.getItem('currentUser'))
      this.login(this.user.email, this.user.pass).pipe().subscribe(data=> {
              if(typeof data == 'string') {

              } else {
                  localStorage.setItem('currentUser', JSON.stringify(data))
                  console.log("User Updated!")
                  callback(true);
              }
      })
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

  public getMessage() {
      return this.http.get(`${ConfigVariables.API_URL}admin/get/message`).pipe(map((res)=> {
          return res;
      }))
  }

  public getMessageNumber() {
      return this.http.get(`${ConfigVariables.API_URL}admin/get/numMess`).pipe(map((res)=> {
          return res;
      }))
  }

  public readMessage(id) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/mark_read/message`, {
          'id': id
      }).pipe(map((res: any)=> {
          return res;
      }))
  }

  //*************************
  // Pages //
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

  public getMoviesTempAll() {
      return this.http.get(`${ConfigVariables.API_URL}admin/get/moviesTempAll`).pipe(map((res)=> {
          return res
      }))
  }

  public getSeriesTemp() {
      return this.http.get(`${ConfigVariables.API_URL}admin/get/seriesTemp`).pipe(map((res)=> {
          return res
      }))
  }

  public getMoviesTempById(id) {
      return this.http.post(`${ConfigVariables.API_URL}admin/get/moviesTempById`, {
          id: id
      }).pipe(map((res)=> {
          return res;
      }))
  }

  public getSeriesTempById(id) {
      return this.http.post(`${ConfigVariables.API_URL}admin/get/seriesTempById`, {
          id: id
      }).pipe(map((res)=> {
          return res;
      }))
  }

  public addNewTempsMovies(data, posterData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/add/moviesTemp/poster`, posterData).pipe(map((res)=> {
          this.addNewTempsMoviesData(res, data).pipe().subscribe(data=> {
              return data;
          })
      }))
  }

  private addNewTempsMoviesData(oldName, newData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/add/moviesTemp/data`, {
          new: newData,
          oldName: oldName
      }).pipe(map((res)=> {
          return res
      }))
  }


  public addNewTempSeries(data, posterData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/add/seriesTemp/poster`, posterData).pipe(map((res)=> {
          this.addNewTempsSeriesData(res, data).pipe().subscribe(data=> {
              return data;
          })
      }))
  }

  private addNewTempsSeriesData(oldName, newData) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/add/seriesTemp/data`, {
          new: newData,
          oldName: oldName
      }).pipe(map((res)=> {
          return res
      }))
  }

  public deleteTempMovie(id) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/delete/movieTemp`, {
          id: id
      }).pipe(map((res)=> {
          return res
      }))
  }

  public deleteTempSerie(id) {
      return this.http.post<any>(`${ConfigVariables.API_URL}admin/delete/serieTemp`, {
          id: id
      }).pipe(map((res)=> {
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

  public getMoviebyTempId(tempId) {
      return this.http.post<any>(`${ConfigVariables.API_URL}movies/getByTempId`, tempId).pipe(map((res)=> {
          return res
      }))
  }

  public getMoviebyIDS(id) {
      return this.http.post<any>(`${ConfigVariables.API_URL}movies/getById`, id).pipe(map((res)=> {
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

  public getSeriesbyTempId(tempId) {
      return this.http.post<any>(`${ConfigVariables.API_URL}series/getByTempId`, tempId).pipe(map((res)=> {
          return res
      }))
  }

  public getSeriesbyIDS(id) {
      return this.http.post<any>(`${ConfigVariables.API_URL}series/getById`, id).pipe(map((res)=> {
          return res
      }))
  }

}
