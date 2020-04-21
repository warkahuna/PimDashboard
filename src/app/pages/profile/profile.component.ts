import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from 'app/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { REACTIVE_DRIVEN_DIRECTIVES } from '@angular/forms/src/directives';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @HostBinding('class.employer-form') private readonly employerForm = true;
  public qualifications = ['Junior', 'Middle', 'Senior'];
  email;
  lastName:String = '';
  firstName:String = '';
  password:String = '';
  passwordCheck:String = '';
  phoneNumber:String = '';
  public profileForm: FormGroup;
  public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  constructor(private authService: AuthService,private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router) {

    this.profileForm = this.fb.group({
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

    this.authService.adminProfile()
    .subscribe(
      data=>console.log(data),
      error=>this.check(error)
    )
}

  ngOnInit() {
  }

  profileFill(profileData)
  {
    //console.log(profileData)
    this.profileForm.get('email').setValue("barbatos252@gmail.com");
    this.profileForm.get('firstName').setValue("bi");
    this.profileForm.get('lastName').setValue("bi");
    this.profileForm.get('phoneNumber').setValue("123456");
    //this.profileForm.get('gender').setValue(profileData.gender);
    //this.profileForm.get('qualification').setValue(profileData.qualification);
    this.profileForm.get('position').setValue("bi");
  }
  public changeGender(gend) {
    this.profileForm.value.gender = gend.value;
  }
  public changeQualification(qual) {
    this.profileForm.value.qualification = qual.value;
  }

  public check(error) {
    this.router.navigate(['/pages/login']);
  }

  public update()
  {

  }
}
