import { Component, OnInit } from '@angular/core';
import { ArticleService} from "../article.service";
import {Article} from "../models/Article";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private articleService: ArticleService) { }

  articles!: Article[];

  ngOnInit(): void {
    this.articleService.lastTenArticles().subscribe(articles => {
      this.articles = articles;
    });
  }





}
