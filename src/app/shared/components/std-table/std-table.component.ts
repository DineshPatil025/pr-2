import { Component, OnInit, inject } from '@angular/core';
import { StdService } from '../../services/std.service';
import { observable } from 'rxjs';

@Component({
  selector: 'app-std-table',
  templateUrl: './std-table.component.html',
  styleUrls: ['./std-table.component.scss']
})
export class StdTableComponent implements OnInit {

  stdArr: Array<any> = [];
  private _stdService = inject(StdService)
  constructor() { }

  ngOnInit(): void {
    this._stdService.newStdSubjectAsObs$
      .subscribe((res: any) => {
        this.stdArr.push(res)
      });



    this._stdService.getAllStd()

      .subscribe(res => {
        this.stdArr = res;
      });

    this._stdService.updtStdSubjectAsObs$
      .subscribe((res: any) => {

        let updIndex = this.stdArr.findIndex(std => std.stdId === res.stdId)
        this.stdArr[updIndex] = res;


      });

  }

  onStdEdit(id: string) {
    this._stdService.getObj(id)

  }
}
