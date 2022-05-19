import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from 'rxjs';
import { Article} from './models/Article';
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private pArticles: Article[] | undefined;

  constructor(private http : HttpClient) {
  }

  public getArticles(): Observable<Article[]> {
    return this.pArticles ? of(this.pArticles) : this.http.get<Article[]>(`${environment.db}/articles`);
  }

  public deleteArticle(article: Article) {
    return this.http.delete(`http://localhost:3000/articles/${article.id}`).subscribe(value => {
    });
  }

  public createArticle(newArticle: { title: string; content: string; author: string; }) {
    console.log("add articles")
    return this.http.post("http://localhost:3000/articles", newArticle).subscribe(value => {
      console.log(value);
    });
  }

  public getArticle(id: number): Observable<Article> {
    return this.getArticles().pipe(
      map(articles => articles.find(article => article.id === id) as Article)
    );
    }

  public search(mot : string): Observable<Article[]> {
    return this.getArticles().pipe(map(articles => articles.filter(article => article.title.includes(mot) || article.content.includes(mot) || article.author.includes(mot))));
  }

  public lastTenArticles(): Observable<Article[]> {
    return this.getArticles().pipe(map(articles => articles.slice(0, 10)));
  }

  public preloadArticles(): Observable<Article[]> {
    if (!this.pArticles) {
      return this.http.get<Article[]>(`${environment.db}/articles`).pipe(
        map(article => {
          this.pArticles = article;
          return article;
        }));
    }
    return of(this.pArticles);
  }

}
