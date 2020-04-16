import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { IProduct } from './product';

@Injectable({ providedIn: 'root' })
export class ProductService {

  private productUrl = 'api/productapi';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

/** GET products from the server */
  get(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.productUrl).pipe(
      catchError(this.handleError('get', []))
    )
  }

  /** POST: add a new product to the database */
  post(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(this.productUrl, product, this.httpOptions).pipe(
      tap((newProduct: IProduct) => this.log(`added product w/ Product Id = ${newProduct.ProductId}`)),
      catchError(this.handleError<IProduct>('post'))
    );
  }

  /** PUT: update the product on the server */
  update(product: IProduct): Observable<any> {
    const id = typeof product === 'number' ? product : product.ProductId;
    const url = `${this.productUrl}/${id}`;

    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => this.log(`updated product id=${product.ProductId}`)),
      catchError(this.handleError<any>('update'))
    );
  }

  /** DELETE: delete the product from the server */
  delete(product: IProduct | number): Observable<IProduct> {
    const id = typeof product === 'number' ? product : product.ProductId;
    const url = `${this.productUrl}/${id}`;

    return this.http.delete<IProduct>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<IProduct>('delete'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`Message: ${message}`);
  }
}
