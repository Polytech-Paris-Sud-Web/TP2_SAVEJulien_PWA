import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from 'rxjs';
import {Author} from "./models/Author";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private pauthors: Author[] | undefined;

  constructor(private http: HttpClient) {
  }


  public getAuthor(name: string): Observable<Author> {
    const defaultAuthor : Author = {
      name: 'Inconnu',
      id: 0,
      biography: 'Pas d\'information sur cet auteur',
    }

    return of(this.pauthors?.find(author => author.name === name) || defaultAuthor);
  }

  public preloadAuthors(): Observable<Author[]> {
    if (!this.pauthors) {
      return this.http.get<Author[]>(`${environment.db}/authors`).pipe(
        map(authors => {
          this.pauthors = authors;
          return authors;
        }));
    }
    return of(this.pauthors);
  }

}

