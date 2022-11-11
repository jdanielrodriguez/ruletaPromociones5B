import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    dots: false,
    startPosition: 0,
    navText: ['', ''],
    slideTransition: 'linear',
    autoplayTimeout: 100,
    autoplaySpeed: 3000,
    autoplayHoverPause: false,
    mouseDrag: false,
    pullDrag: false,
    freeDrag: false,
    rewind: false,
    animateOut: 'backOutLeft',
    animateIn: 'backInRight',
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      1920: {
        items: 7
      }
    },
    nav: false
  }

}
