import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TablesService } from 'app/services/manage/tables.service';

@Component({
  selector: 'app-customers-answer',
  templateUrl: './customers-answer.component.html',
  styleUrls: ['./customers-answer.component.scss']
})
export class CustomersAnswerComponent implements OnInit {

  private info = [];
  private info2 = [];
  private email;
  private id;
  sendMessageForm:FormGroup = new FormGroup({
    question: new FormControl(null,Validators.required),
    email: new FormControl(null),
  })
  constructor(
    private router: Router, 
    private tablesService: TablesService,
    private activatedRoute : ActivatedRoute,
    ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.email = params['email'];
      this.id = params['id'];
    })
    this.listQuestions()
  }

  profileFill(profileData)
  {

    
    
  }

  sendMessage()
  {
    this.sendMessageForm.get('email').setValue(this.email);
    if(this.sendMessageForm.valid)
    {
      console.log(this.sendMessageForm.value)
      this.tablesService.answerQuestion({email:this.email,_id:this.id,answer:this.sendMessageForm.get('question').value}).subscribe(
      data=> {console.log(data); this.listQuestions()},
      error=> {console.error(error);this.listQuestions()}
      )
    }
  }

  listQuestions()
  {
    this.info2 = [];
    console.log(this.email)
    console.log(this.id)
    this.tablesService.listClientQuestions({email:this.email,_id:this.id}).subscribe(
      data=> {console.log(data);this.chatFill(data)},
      error=> {console.error(error);}
      )
  }


  chatFill(data)
  {
    data.forEach(element => {
      console.log(element)

      this.info.push(element.question);
      if(element.answer)
      this.info.push(element.answer);
      else
      this.info.push("not answered yet");

      this.info.push(element.dateQuestion);
      if(element.dateAnswer)
      this.info.push(element.dateAnswer);
      else
      this.info.push(false);

      this.info2.push(this.info);
      this.info=[];
    });

    console.log(this.info2);
  }
  
  

}
