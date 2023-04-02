import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { AbstractControl, FormControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-new-course',
  templateUrl: './create-new-course.component.html',
  styleUrls: ['./create-new-course.component.css']
})
export class CreateNewCourseComponent {


  newCourseForm!: FormGroup;

  accessCode!: string;
  constructor(private router: Router, private fb: FormBuilder) {
    this.accessCode = this.accessCode = this.makeRandomString(8);


  }

  ngOnInit(): void {
    this.newCourseForm = this.fb.group({
      course_name: new FormControl('', [Validators.required]),
      course_access_code: new FormControl(this.accessCode, [Validators.required]),
      course_description: new FormControl('', [Validators.required])
    })

    this.newCourseForm.valueChanges.subscribe(console.log)
  }

  makeRandomString(length:number):string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  randomAccessCode(){
    this.accessCode = this.makeRandomString(8)
    this.newCourseForm.controls['course_access_code'].setValue(this.accessCode);
    
  }

}
