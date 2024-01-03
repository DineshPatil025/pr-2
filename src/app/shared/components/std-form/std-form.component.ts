import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StdService } from '../../services/std.service';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {

  stdForm!: FormGroup;
  stdArr!: Array<any>;
  patchStd!: any;
  isInEditMode: boolean = false;

  private _stdService = inject(StdService)
  constructor() {

    this._stdService.editStdSubjectAsObs$
      .subscribe(res => {
        this.patchStd = res
        this.stdForm.patchValue(this.patchStd)
        this.isInEditMode = true;
      })
  }

  ngOnInit(): void {
    this.createStdForm()
  }

  createStdForm() {
    this.stdForm = new FormGroup({
      fname: new FormControl(null, Validators.required),
      lname: new FormControl(null, Validators.required),
    })
  }

  onFormSubmit() {
    let newstdObj = this.stdForm.value

    this._stdService.sendNewStd(newstdObj)
    this.stdForm.reset();

  }

  OnStdUpdate() {
    let updId = this.patchStd.stdId;
    let updStd = this.stdForm.value;
    console.log(updStd);
    this._stdService.sendUpdtedStd(updId, updStd);


  }

}
