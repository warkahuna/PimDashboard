import { Component, OnInit, HostBinding } from '@angular/core';
import { AuthService } from 'app/services';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { REACTIVE_DRIVEN_DIRECTIVES } from '@angular/forms/src/directives';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @HostBinding('class.employer-form') private readonly employerForm = true;
  public qualifications = ['Junior', 'Middle', 'Senior'];
  email;
  public gend='Male';
  public quali = 'Junior';
  lastName:String = '';
  firstName:String = '';
  password:String = '';
  passwordCheck:String = '';
  phoneNumber:String = '';
  public profileForm: FormGroup;
  public emailPattern = '^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$';
  constructor(private authService: AuthService,private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private cookie:CookieService,
    ) {

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

    if(this.cookie.get("id") != "")
    {
    this.authService.adminProfile({_id:this.cookie.get("id")})
    .subscribe(
      data=>{console.log(data),this.profileFill(data)},
      error=>this.check(error)
    )
    }
    else
    {
      this.router.navigate(['/pages/login'])
    }
    
      //console.log(this.cookie.get("id"))

}

  ngOnInit() {
  }

  profileFill(profileData)
  {
    profileData.forEach(element => {
       console.log(element)
    this.profileForm.get('email').setValue(element.email);
    this.profileForm.get('firstName').setValue(element.firstName);
    this.profileForm.get('lastName').setValue(element.lastName);
    this.profileForm.get('phoneNumber').setValue(element.phoneNumber);
    this.gend = element.gender
    this.quali = element.qualification;
    /*this.profileForm.get('gender').setValue(element.gender);
    this.profileForm.get('qualification').setValue(element.qualification);*/
    this.profileForm.get('position').setValue(element.position);
    });
   
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
    this.authService.updateProfile(this.profileForm.value)
    .subscribe(
      data=>{console.log(data)},
      error=>console.log(error)
    )
  }
}
