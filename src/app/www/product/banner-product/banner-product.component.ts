import { Component, OnInit } from '@angular/core';
import { Trauxmenu } from '../../../../models/trauxmenu.model';

@Component({
  selector: 'app-banner-product',
  templateUrl: './banner-product.component.html',
  styleUrls: ['./banner-product.component.css']
})
export class BannerProductComponent implements OnInit {

  selected: Trauxmenu;

  included_menus: Trauxmenu[] = [
    new Trauxmenu('Contabilidad',
      'El módulo de Contabilidad permite obtener los resultados financieros de manera inmediata, a partir de los procesos ' +
      'administrativos registrados. Genera los informes financieros, bajo las normas fiscales y la normativa NIIF.',
      './assets/icons/trauxmenu/Contabilidad.png' , '#7bedfc'),
    new Trauxmenu('Auxiliares',
      'A través del Módulo de Auxiliares se contempla el registro de las transacciones que afectan los  estados financieros.',
      './assets/icons/trauxmenu/Auxiliares.png' , '#6e01ad'),
    new Trauxmenu('Cuentas por Cobrar',
      'Cuentas por Cobrar y Pagar permiten obtener informes relacionados con los estados de cuenta de clientes y proveedores.',
      './assets/icons/trauxmenu/CxCobrar.png', '#01ad59' ),
    new Trauxmenu('Cuentas por Pagar',
      'Cuentas por Cobrar y Pagar permiten obtener informes relacionados con los estados de cuenta de clientes y proveedores.',
      './assets/icons/trauxmenu/CxPagar.png' , '#797a79'),
    new Trauxmenu('Finanzas',
      'El módulo de Finanzas automatiza los procesos relacionados con el efectivo en cajas y bancos, las conciliaciones ' +
      'bancarias, así como  el arqueo de caja. Incorpora esquemas modernos como el pago en lote a proveedores y la mensajería ' +
      'automática vía email a proveedores y clientes ',
      './assets/icons/trauxmenu/Finanzas.png' , '#007505'),
    new Trauxmenu('Inventario',
      'TRAUX  presenta versatilidad y simplicidad en los controles del inventario, su diseño contempla la posibilidad de operar ' +
      'bajo los diferentes modelos de valuación y control, tales como FIFO, LIFO, lotes, seriales, vencimiento y último costo. ',
      './assets/icons/trauxmenu/Inventario.png' , '#682600'),
    new Trauxmenu('Ventas',
      'El módulo de Ventas gestiona la facturación, la cual puede realizarse a partir de pedidos y cotizaciones, facilitando la ' +
      'relación con los clientes y su satisfacción.',
      './assets/icons/trauxmenu/Ventas.png' , '#fcc911'),
    new Trauxmenu('Configuración',
      'Traux es un sistema altamente configurable, la mayoria de los procesos pueden ser ajustados hasta el mas mínimo detalle ' +
      'y relacionado a opciones de seguridad según el rol del usuario.',
      './assets/icons/trauxmenu/Configuracion.png' , '#106b82'),
  ];

  extra_menus: Trauxmenu[] = [
    new Trauxmenu('Nómina',
      'El módulo nómina se adaptada a cualquier modelo de gestión del talento humano, en relación a  formas de pagos y ' +
      'turnos de trabajo. El sistema permite la programación de fórmulas para el cálculo de las horas trabajadas y los conceptos de ' +
      'pago como horas extras, bonificaciones; entre otras.',
      './assets/icons/trauxmenu/Nomina.png' , '#ff7b00'),
    new Trauxmenu('Costo',
      'El sistema TRAUX permite la determinación de los Costos basado en el modelo ABC, el usuario utiliza un esquema de ' +
      'reglas programables para la distribución de los costos de las diferentes unidades negocios.',
      './assets/icons/trauxmenu/Costo.png' , '#963700'),
    new Trauxmenu('Activos',
      'TRAUX permite organizar y controlar los Activos Fijos de la empresa, generando reportes  sobre la valoración, ' +
      ' depreciación  y revaluación de los bienes.',
      './assets/icons/trauxmenu/Activos.png' , '#0000ff'),
    new Trauxmenu('Clinica',
      'TRAUX desarrolló el módulo Clínicas, especializado para la administración de las empresas en el área de salud, ' +
      'además permite la gestión de expedientes clínicos de los pacientes.',
      './assets/icons/trauxmenu/Clinica.png' , '#960000'),
  ];

  constructor() {
    this.selected = null;
  }

  ngOnInit() {
  }

  // SelectMenu(event: Event, menu: Trauxmenu) {
  //   // console.log(event);
  //   // console.log(event.target);
  //   const styles: CSSStyleDeclaration = window.getComputedStyle(<Element>event.target);
  //   console.log(styles['grid-row']);
  //   console.log(styles['grid-column']);
  //   if (this.selected && this.selected.name === menu.name) {
  //     this.selected = null;
  //   } else {
  //     this.selected = menu;
  //   }
  // }

}
