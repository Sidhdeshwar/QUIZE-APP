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
  MAINPOINTS:number = 0;
  time:number = 60;
  subscribe!:Subscription;

  constructor(private http:HttpClient){

    http.get<Pattern>('http://localhost:3000/questions').subscribe((data:any)=>{
      this.AllQuestions = data;
       this.countDownMethod();
       for(let i=0 ; i<this.AllQuestions.length ; i++)
       {
            this.AllQuestions[i].TotalPoints = 0;
       }


    })
  }

  Next()
  {
    this.AllQuestions[this.cnt].time = this.time;
    this.cnt++;
    this.subscribe.unsubscribe();
    this.countDownMethod();
    this.AllQuestions[this.cnt-1].TotalPoints = this.PointsBar;
  }

  Previous()
  {
    this.cnt--;
      this.subscribe.unsubscribe();
    this.countDownMethod();
  }

  countDownMethod()
  {
      this.subscribe =  interval(1000).subscribe((data:any)=>{
      this.time = 20 - data;
      if(data>=20)
      {
        this.subscribe.unsubscribe();
        this.Next();
      }
    })
  }

  Answered(id:any)
  {

    this.AllQuestions[this.cnt].myAnswer = id;

    if(this.AllQuestions[this.cnt].options[id].correct==true)
    {
         if(this.cnt==0)
         {
            this.AllQuestions[this.cnt].TotalPoints = 10;
            this.PointsBar = this.AllQuestions[this.cnt].TotalPoints
         }
         else
         {
           this.PointsBar = this.AllQuestions[this.cnt-1].TotalPoints +10;
         }
    }
    else
    {
        if(this.cnt==0)
        {
           this.AllQuestions[this.cnt].TotalPoints=-10;
           this.PointsBar = this.AllQuestions[this.cnt].TotalPoints
        }
        else
        {
          this.PointsBar = this.AllQuestions[this.cnt-1].TotalPoints -10;
        }
    }

  }

  submit()
  {
    localStorage.setItem('quize', JSON.stringify(this.AllQuestions));
  }
}
