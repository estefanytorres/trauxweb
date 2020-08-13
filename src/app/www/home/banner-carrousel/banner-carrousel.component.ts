import { Component, OnInit } from '@angular/core';
import {HomeSlide} from '../../../../models/home-slide.model';

@Component({
  selector: 'app-banner-carrousel',
  templateUrl: './banner-carrousel.component.html',
  styleUrls: ['./banner-carrousel.component.css']
})
export class BannerCarrouselComponent implements OnInit {

  home_slides: HomeSlide[] = [
    new HomeSlide('slide-1', 'url(\'assets/img/slide-1.jpg\')',
      'Adquiera el sistema ERP que le da resultados en tiempo real.'),
    new HomeSlide('slide-2', 'url(\'assets/img/slide-2.jpg\')',
      'Prepárese para la facturación electrónica con un software completamente integrado'),
    new HomeSlide('slide-3', 'url(\'assets/img/slide-3.jpg\')',
      'Digitalice todos los soportes para minimizar el espacio físico de su archivo'),
    new HomeSlide('slide-4', 'url(\'assets/img/slide-4.jpg\')',
      'Almacene la información de su empresa en una base de datos robusta y confiable'),
  ]

  constructor() { }

  ngOnInit() {
  }

}
