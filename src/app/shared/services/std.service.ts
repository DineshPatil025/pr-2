import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, map, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StdService {

  private _http = inject(HttpClient)
  stdArr!: Array<any>;

  private newStdSubject$ = new Subject;
  newStdSubjectAsObs$ = this.newStdSubject$.asObservable()

  private editStdSubject$ = new Subject;
  editStdSubjectAsObs$ = this.editStdSubject$.asObservable()

  private updtStdSubject$ = new Subject;
  updtStdSubjectAsObs$ = this.updtStdSubject$.asObservable()


  stdUrl: string = `${environment.baseUrl}/std.json`
  getStdUrl: string = `https://dp-angular-3aab9-default-rtdb.asia-southeast1.firebasedatabase.app/std`


  constructor() { }



  sendNewStd(newStd: any) {

    this._http.post(this.stdUrl, newStd)
      .subscribe((res: any) => {


        this.newStdSubject$.next({ ...newStd, stdId: res['name'] });
      }
      );

  }



  getAllStd() {
    return this._http.get(this.stdUrl)
      .pipe(
        map((res: any) => {
          this.stdArr = []
          for (const key in res) {

            this.stdArr.push({ ...res[key], stdId: key });
          }
          return this.stdArr;
        })
      )



  }

  getObj(id: string) {
    let editObj;
    this._http.get(`${this.getStdUrl}/${id}.json`).subscribe((res) => {
      editObj = { ...res, stdId: id }
      this.editStdSubject$.next(editObj)

    });

  }

  sendUpdtedStd(id: string, stdObj: any) {
    this._http.patch(`${this.getStdUrl}/${id}.json`, stdObj)
      .subscribe(res => {
        this.updtStdSubject$.next({ ...res, stdId: id })
      });
  }

}
