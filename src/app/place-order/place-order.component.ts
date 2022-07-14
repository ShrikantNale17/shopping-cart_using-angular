import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
	selector: 'app-place-order',
	templateUrl: './place-order.component.html',
	styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

	cart: any = [];

	amount_payable: number = 0;
	total_quantity: number = 0;

	order_details!: FormGroup;
	isSubmitted: boolean = false;

	constructor(private fb: FormBuilder, private router: Router, private appService: AppService) {
	}

	ngOnInit(): void {
		const temp = JSON.parse(localStorage.getItem('cart') || '') || [];
		this.cart = temp;
		this.set_amount_payable();
		this.order_details = this.fb.group({
			personName: ['', [Validators.required]],
			deliveryAddress: ['', [Validators.required]]
		})
	}

	get name() {
		return this.order_details.get('personName') as FormControl;
	}

	get address() {
		return this.order_details.get('deliveryAddress') as FormControl;
	}

	set_amount_payable() {
		this.amount_payable = this.cart.reduce((total: number, item: any) => total + (item.price * item.qty), 0);
		this.total_quantity = this.cart.reduce((total: number, item: any) => total + item.qty, 0);
	}

	onSubmit() {
		this.isSubmitted = true;
		if (this.order_details.valid) {
			let body = {
				...this.order_details.value,
				productsOrdered: this.cart.map((prod: any) => ({
					productID: prod._id,
					qty: prod.qty,
					price: +prod.price,
					total: prod.qty * prod.price
				})),
				orderTotal: this.amount_payable
			}
			this.appService.placeOrder(body).subscribe((response) => console.log(response));
		}
	}

}
