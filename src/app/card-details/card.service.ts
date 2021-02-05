import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Card } from './card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private cardUrl = 'api/card';

  constructor(private http: HttpClient) { }

  getCard(): Observable<Card> {
    return this.http.get<Card>(this.cardUrl)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  createCard(card: Card): Observable<Card> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // Card Id must be null for the Web API to assign an Id
    const newCard = { ...card, id: Math.floor(Math.random() * 1000) + 1 };
    return this.http.post<Card>(this.cardUrl, newCard, { headers })
      .pipe(
        tap(data => console.log('createCard: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // updateCard(card: Card): Observable<Card> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //   const url = `${this.cardsUrl}/${card.id}`;
  //   return this.http.put<Card>(url, card, { headers })
  //     .pipe(
  //       tap(() => console.log('updateCard: ' + card.id)),
  //       // Return the card on an update
  //       map(() => card),
  //       catchError(this.handleError)
  //     );
  // }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

}
