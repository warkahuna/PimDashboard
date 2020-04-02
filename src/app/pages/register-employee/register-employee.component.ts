import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-employee',
  templateUrl: './register-employee.component.html',
  styleUrls: ['./register-employee.component.scss']
})
export class RegisterEmployeeComponent implements OnInit {
  @HostBinding('class.employer-form') private readonly employerForm = true;
  public qualifications = ['Junior', 'Middle', 'Senior'];
  public addForm: FormGroup;
  private email;
  private password;
  public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  public error: string;
  
  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router) {
    this.addForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      secondName: new FormControl('', Validators.required),  
      gender: new FormControl('', Validators.required),
      position: new FormControl('', Validators.required), 
      qualification: new FormControl('', Validators.required), 
      phoneNumber: new FormControl('', Validators.required), 
    email: new FormControl('', [
    Validators.required,
    Validators.pattern(this.emailPattern),
    Validators.maxLength(20),
    ]),
    });
this.email = this.addForm.get('email');
}

  ngOnInit() {
  }



}
