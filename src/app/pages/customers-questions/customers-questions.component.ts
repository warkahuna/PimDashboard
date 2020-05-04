import { Component, OnInit, HostBinding } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TablesService } from 'app/services/manage/tables.service';

@Component({
  selector: 'app-customers-questions',
  templateUrl: './customers-questions.component.html',
  styleUrls: ['./customers-questions.component.scss']
})
export class CustomersQuestionsComponent implements OnInit {

  
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

  
  public headers = this.tablesService.getHeadersListQuestions();
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
    this.tablesService.listQuestions()
    .subscribe(
      data=>this.chatFill(data),
      error=>console.log(error)
    )
  }

  chatFill(data)
  {
    data.forEach(element => {
      console.log(element)

      this.info.push(element.email);
      this.info.push(element.question);
      console.log(new Date(element.dateQuestion).toISOString().slice(0, 19).replace('T', ' '))
      this.info.push(new Date(element.dateQuestion).toISOString().slice(0, 19).replace('T', ' '));
      console.log(element._id)
      this.info.push(element._id)
      this.info2.push(this.info);
      this.info=[];
    });

    console.log(this.info2);
    //console.log(this.tablesService.getBorderedTable())
    this.borderedTable = this.info2;
  }

  answerQuestion(row)
  {
    this.router.navigate(["/app/customers-answer/"+row[0]+"/"+row[3]])
  }
  

}
