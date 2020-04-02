import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @HostBinding('class.employer-form') private readonly employerForm = true;
  public qualifications = ['Junior', 'Middle', 'Senior'];

  constructor() { }

  ngOnInit() {
  }

}
