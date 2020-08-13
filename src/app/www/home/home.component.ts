import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <app-banner-carrousel></app-banner-carrousel>
    <app-banner-onesystem></app-banner-onesystem>
    <app-banner-results></app-banner-results>
    <app-banner-testimonials></app-banner-testimonials>
    <app-banner-consult></app-banner-consult>
  `
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
