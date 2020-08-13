import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  template: `
  <app-banner-demo></app-banner-demo>
  <app-banner-product></app-banner-product>
  `,
})
export class ProductComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
