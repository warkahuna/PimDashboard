import { Component, HostBinding, OnInit } from '@angular/core';

import { UpgradableComponent } from 'theme/components/upgradable';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['../charts/charts.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent extends UpgradableComponent implements OnInit{
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-grid--no-spacing') private readonly mdlGridNoSpacing = true;

  constructor() {super();}
  ngOnInit() {
  }

}
