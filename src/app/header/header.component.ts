import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  itemInCart: number = JSON.parse(localStorage.getItem('cart') || '[]').length;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.appService.itemsInCart.subscribe((value) => this.itemInCart = value)
  }

}
