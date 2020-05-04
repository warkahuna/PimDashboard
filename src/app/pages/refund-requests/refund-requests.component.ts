import { Component, OnInit, HostBinding } from '@angular/core';
import { TablesService } from 'app/services/manage/tables.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-refund-requests',
  templateUrl: './refund-requests.component.html',
  styleUrls: ['./refund-requests.component.scss']
})
export class RefundRequestsComponent implements OnInit {

  
  
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

  
  public headers = this.tablesService.getHeadersRefunds();
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
    this.tablesService.refundRequestList()
    .subscribe(
      data=>this.fillData(data),
      error=>console.log(error)
    )
  }

  public fillData(data){
    
    data.forEach(element => {
      console.log(element)
      this.info.push(element.planNickname);
      this.info.push(element.subscriptionId);
      this.info.push(element.email);
      this.info.push(element.daysLeft);
      this.info.push(0);
      this.info2.push(this.info);
      this.info=[];
    });
    console.log(this.info2);
    //console.log(this.tablesService.getBorderedTable())
    this.borderedTable = this.info2;
  }
  acceptRefund(row)
  {
    this.tablesService.accetpRefund({subscriptionId : row[1],daysLeft:row[3]})
    .subscribe(
      data=>this.fillData(data),
      error=>console.log(error)
    )
  }
  refuseRefund(row)
  {
    console.log(row)
  }

}
