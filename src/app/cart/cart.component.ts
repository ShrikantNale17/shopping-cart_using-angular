import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
	selector: 'app-cart',
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

	cart: any = [];

	amount_payable: number = 0;

	constructor(private appService: AppService, private router: Router) { }

	ngOnInit(): void {
		const temp = JSON.parse(localStorage.getItem('cart') || '') || [];
		this.cart = temp;
		this.set_amount_payable();
	}

	set_amount_payable() {
		this.amount_payable = this.cart.reduce((total: number, item: any) => total + (item.price * item.qty), 0)
	}

	increment(id: any) {
		this.cart.forEach((element: any, index: number) => {
			if (element._id == id) {
				this.cart[index].qty += 1;
			}
		});
		localStorage.setItem('cart', JSON.stringify(this.cart));
		this.set_amount_payable();
	}

	decrement(id: any) {
		this.cart.forEach((element: any, index: number) => {
			if (element._id == id) {
				this.cart[index].qty -= 1;
			}
		});
		localStorage.setItem('cart', JSON.stringify(this.cart));
		this.set_amount_payable();
	}

	removeItem(id: any) {
		this.cart = this.cart.filter((element: any) => element._id !== id);
		localStorage.setItem('cart', JSON.stringify(this.cart));
		this.appService.itemsInCart.next(this.cart.length);
		this.set_amount_payable();
	}

	goToPlaceOrder() {
		this.router.navigate(['/place-order'], { state: { data: this.cart } });
	}

}
