import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-std-form',
  templateUrl: './std-form.component.html',
  styleUrls: ['./std-form.component.scss']
})
export class StdFormComponent implements OnInit {

  stdForm!: FormGroup;

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
    console.log(this.stdForm.value);
    


  }

}
