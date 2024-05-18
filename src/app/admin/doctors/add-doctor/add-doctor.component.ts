import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/security/auth.service';
import { Doctor } from 'src/app/shared/security/doctor';

import { Role } from 'src/app/shared/security/role';
import { User } from 'src/app/shared/security/user';
@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.sass']
})
export class AddDoctorComponent {
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  
  constructor(private http:HttpClient,private fb: FormBuilder,private authservice:AuthService) {
    this.docForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      designation: [''],
      department: [''],
      address: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)]
      ],
      dob: ['', [Validators.required]],
      education: [''],
      uploadImg: [''],
      role:[''],
      username:['']
    });
  }
  get roles(): FormArray {
    return this.docForm.get('roles') as FormArray;
}
  onSubmit() {
    const {first,last,username,gender,dob,department,mobile,designation,
      address,education,email,password,role} = this.docForm.value;

    const doctorData: Doctor = {first:first,last:last,username:username,gender:gender,dob:dob,department:department,mobile:mobile,designation:designation,
      address:address,education:education,email:email,password:password,role: [role]};
    //const userData: User = {name:first,username:username,email:email,password: password,role: [role]};
    
    console.log('Form Value', doctorData);
    this.http.post('http://localhost:8009/api/auth/signup',doctorData).subscribe(data => {
      console.log(data);
    })
  }
}
