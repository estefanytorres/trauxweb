import { Component, OnInit } from '@angular/core';
import { Testimonial } from '../../../../models/testimonial.model';

@Component({
  selector: 'app-banner-testimonials',
  templateUrl: './banner-testimonials.component.html',
  styleUrls: ['./banner-testimonials.component.css']
})
export class BannerTestimonialsComponent implements OnInit {

  testimonials: Testimonial[] = [
    new Testimonial('Administrativamente  necesitaba  una herramienta que pudiera brindar información veraz de la situación' +
      'económica de la empresa, gracias al soporte y adiestramiento recibido tengo información veraz de mis' +
      'operaciones administrativas y he podido hacer ajustes para aumentar la rentabilidad y mejorar las operaciones' +
      'de la empresa, considero a traux una herramienta muy completa y versátil para llevar control administrativos de la empresas.',
      'Diego Terán', 'Gerente General', ' Staylinplus Comercias S.A.S', 'assets/img/portrait.png',
      'assets/clients/staylingpro.png'
    ),
    new Testimonial('Desde 1952, nuestra empresa presta servicios en sector privado del área de salud y desde el año 2013 hemos ' +
      'confiado todos nuestros procesos administrativos contables a traux,  podemos dar fe de disponer en una aplicación ' +
      'eficiente que nos ha permitido mejorar nuestros procesos de control administrativo y contar con los informes financieros en el  ' +
      'tiempo requerido. Adicionalmente  recibimos los informes de costos generales, por unidad operativa, así como los costos unitarios ' +
      'para cada uno de los  servicios prestado,  con la premura requerida para la toma de decisiones gerenciales.',
      'Dr. José Luis Paz Díaz', 'Director', 'Policlinica Maracaibo', 'assets/img/portrait.png',
      'assets/clients/policlinicamaracaibo.jpg'
    ),
  ];

  constructor() { }

  ngOnInit() {
  }

}
