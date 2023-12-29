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

  stdArr!:Array<any> ;

  private _stdService = inject(StdService)
  constructor() { }

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

    // this.stdArr.push(newstdObj)
    // console.log(this.stdArr);



  }

}
