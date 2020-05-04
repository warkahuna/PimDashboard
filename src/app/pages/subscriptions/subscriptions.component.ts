import { Component, OnInit, HostBinding } from '@angular/core';
import { TablesService } from 'app/services/manage/tables.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  
  public readonly Array = Array;
  private info = [];
  private info2 = [];
  mySubscription: any;
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;
  @HostBinding('class.ui-tables') private readonly uiTables = true;
  @HostBinding('class.ui-buttons') private readonly uiButtons = true;

  public constructor(private tablesService: TablesService,private route : ActivatedRoute,
    private router : Router) {
  }

  ngOnInit() {
    this.getdata()
  }

  public readonly sortOrder = {
    asc: 1,
    desc: -1,
  };

  
  public headers = this.tablesService.getHeadersSubscriptions();
  public borderedTable=this.info2;
  
  public genreColors = {
    'Children\'s book': 'orange',
    'Gothic fiction': 'purple',
    'Horror fiction': 'dark-gray',
    'Fiction': 'green',
    'Novel': 'teal',
    'Fantasy': 'red',
    'Adventure': 'light-blue',
  };

  private colors1 = [
    'light-blue',
    'teal',
    'orange',
    'red',
    'green',
    'purple',
  ];
  

  public currentPage = 1;
  private countPerPage = 4;
  
  public getdata()
  {
    this.info2=[];
    this.tablesService.listSubscription()
    .subscribe(
      data=>this.fillData(data),
      error=>console.log(error)
    )
  }

  public fillData(data){
    
    data.forEach(element => {
      console.log(element)
      this.info.push(element.plan.nickname);
      this.info.push(new Date(element["current_period_start"]*1000).toLocaleString());
      this.info.push(new Date(element["current_period_end"]*1000).toLocaleString());

      var diff = Math.abs(
        new Date(element["current_period_start"]).getTime() - new Date(element["current_period_end"]).getTime()
                         );
      var diffDays = Math.ceil(diff / (1000 * 3600 * 24)); 
      
      if(diffDays>0)
      this.info.push(diffDays)
      else
      this.info.push(0)
      this.info.push(element.status);
      this.info.push(element.id);
      this.info2.push(this.info);
      this.info=[];
    });
    console.log(this.info2);
    //console.log(this.tablesService.getBorderedTable())
    this.borderedTable = this.info2;
  }

  public getActiveSubscriptions()
  {
    this.info2=[];
    this.tablesService.listSubscriptionActive()
    .subscribe(
      data=>this.fillData(data),
      error=>console.log(error)
    )
  }

  public getCanceledSubscriptions()
  {
    this.info2=[];
    this.tablesService.listSubscriptionCanceled()
    .subscribe(
      data=>this.fillData(data),
      error=>console.log(error)
    )
  }


}
