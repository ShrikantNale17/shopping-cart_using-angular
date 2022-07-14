import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	products: any = [];

	constructor(private http: HttpClient, private appService: AppService) { }

	ngOnInit(): void {
		this.http.get(`http://xapi.ngminds.com/api/getAllProducts`).subscribe((response: any) => {
			const products = response.products;
			for (let i = 0; i < products.length; i += 4) {
				const temp = products.slice(i, i + 4);
				this.products.push(temp);
			}
			// this.products = response.products;
			// console.log(response.products);
		})
	}

	addToCart(product: any) {
		let cart = JSON.parse(localStorage.getItem('cart') as any) || [];
		const isInCart = cart.find((element: any) => element._id == product._id);
		if (isInCart) {
			cart = cart.map((element: any) => {
				if (element._id == product._id) {
					return { ...element, qty: element.qty + 1 }
				}
				return element;
			});
		} else {
			cart.push({ ...product, qty: 1 });
		}
		this.appService.itemsInCart.next(cart.length)
		localStorage.setItem('cart', JSON.stringify(cart));
	}

}
