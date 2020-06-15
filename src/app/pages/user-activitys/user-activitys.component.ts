import { Component, OnInit, HostBinding } from '@angular/core';
import { TablesService } from 'app/services/manage/tables.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-activitys',
  templateUrl: './user-activitys.component.html',
  styleUrls: ['./user-activitys.component.scss']
})
export class UserActivitysComponent implements OnInit {

  public readonly Array = Array;
  private info = [];
  private info2 = [];
  activitys: any;
  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.mdl-cell') private readonly mdlCell = true;
  @HostBinding('class.mdl-cell--12-col-desktop') private readonly mdlCell12ColDesktop = true;
  @HostBinding('class.mdl-cell--12-col-tablet') private readonly mdlCell12ColTablet = true;
  @HostBinding('class.mdl-cell--4-col-phone') private readonly mdlCell4ColPhone = true;
  @HostBinding('class.mdl-cell--top') private readonly mdlCellTop = true;
  @HostBinding('class.ui-tables') private readonly uiTables = true;

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

  
  public headers = this.tablesService.getHeadersActivitys();
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

  public currentPage = 1;
  private countPerPage = 4;
  
  public getdata()
  {
    this.info2 = [];
    this.tablesService.listUserActivitys()
    .subscribe(
      data=>this.fillData(data),
      error=>console.log(error)
    )
  }

  public fillData(data){
    data.forEach(element => {
      this.info.push(element["user"])
      this.info.push(element["modification"])
      this.info.push("new Activity")
      this.info2.push(this.info);
      this.info=[];
    });
    console.log(this.info2);
    //console.log(this.tablesService.getBorderedTable())
    this.borderedTable = this.info2;
  }

}
