import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Subject, observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class StdService {

  private _http = inject(HttpClient)


  private newStdSubject$ = new Subject;
  newStdSubjectAsObs$ = this.newStdSubject$.asObservable()


  stdUrl: string = `${environment.baseUrl}/std.json`


  constructor() { }



  sendNewStd(newStd: any) {
    console.log(newStd);

    this._http.post(this.stdUrl, newStd)
      .subscribe(res => console.log(res));
    this.newStdSubject$.next(newStd);
  }
  getAllStd() {
    this._http.get(this.stdUrl)
      .subscribe(res => console.log(res));
  }

}
