import { Component } from '@angular/core';
import { Pattern } from '../pattern';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  AllQuestions: Pattern [] = [];
  constructor()
  {
    let a = localStorage.getItem('quize');
    this.AllQuestions = a && JSON.parse(a);
  }

}
