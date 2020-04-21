import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'app/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
  
  constructor(private authService: AuthService,private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) {
    this.addForm = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordCheck: new FormControl('', Validators.required),  
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

  public changeGender(gend) {
    this.addForm.value.gender = gend.value;
  }
  public changeQualification(qual) {
    this.addForm.value.qualification = qual.value;
  }

  public register() {
    console.log(this.addForm.value);
    if(this.addForm.value.qualification == "")
    {
      this.addForm.value.qualification = "Junior";
    }
    if(this.addForm.value.gender =="")
    {
      this.addForm.value.gender = "Male";
    }
    this.error = null;
      this.authService.register(JSON.stringify(this.addForm.value))
        .subscribe(res => /*this.router.navigate(['/app/dashboard'])*/
                          this.successfull(),
                   error => this.check(error))
  }
  public check(error) {
    if(error.error.text == "good"){
      this.toastr.success('New Employee', 'added Successfully!');
    }
    else
    {
      this.toastr.error('Please check the values', 'add failed!');
    }
    
  }
  public successfull() {
    this.toastr.success('New Employee', 'add Success!');
  }

}
