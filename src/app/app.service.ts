import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService implements OnInit {

  itemsInCart: Subject<number> = new Subject();

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  placeOrder(order_details: any) {
    return this.http.post(`http://xapi.ngminds.com/api/placeOrder`, order_details)
  }
}
