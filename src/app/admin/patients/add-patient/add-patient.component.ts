import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Doctor } from 'src/app/shared/security/doctor';
import { Pat } from 'src/app/shared/security/patient';
import { Patient } from '../allpatients/patient.model';


@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.sass'],
})
export class AddPatientComponent {
  patientForm: FormGroup;
  constructor(private http:HttpClient,private fb: FormBuilder) {
    this.patientForm = this.fb.group({
      first: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      last: [''],
      gender: ['', [Validators.required]],
      mobile: [''],
      dob: ['', [Validators.required]],
      age: [''],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      maritalStatus: [''],
      address: [''],
      bGroup: [''],
      bPresure: [''],
      sugger: [''],
      injury: [''],
      uploadImg: [''],
    });
  }
  onSubmit() {
    const {first,last,gender,dob} = this.patientForm.value;

      const dat: Pat = new Pat();
             dat.first = first;
             dat.dob = dob;
    
    console.log('Form Value', this.patientForm.value);
    this.http.post('http://localhost:8009/Patient/',this.patientForm.value).subscribe(data => {
      console.log(data);
    })
  }
}
