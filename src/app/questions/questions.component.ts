import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Pattern } from '../pattern';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {


  AllQuestions: Pattern [] = [];
  cnt:number = 0;
  PointsBar:number = 0;
  time:number = 60;
  subscribe!:Subscription;
  constructor(private http:HttpClient){

    http.get<Pattern>('http://localhost:3000/questions').subscribe((data:any)=>{
      this.AllQuestions = data;
    })
  }

  Next()
  {
    this.cnt++;
   
  this.subscribe =  interval(1000).subscribe((data:any)=>{
      this.time = 60 - data;
      if(data>=60)
      {
        this.subscribe.unsubscribe();
        this.Next();
      }
    })
  }

  Previous()
  {
    this.cnt--;
  }

  Answered(id:any)
  {
    this.AllQuestions[this.cnt].myAnswer = id;
     
    if(this.AllQuestions[this.cnt].options[id].correct==true)
    {
      this.PointsBar = this.PointsBar+10;
    }
    else
    {
      this.PointsBar -= 10; 
    }
    
  }
}
