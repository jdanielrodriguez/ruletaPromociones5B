import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})
export class RuletaComponent implements OnInit {

  constructor() { }

  private animateRuleta = false;

  ngOnInit(): void {
  }
  iniciarJuego() {
    this.setAnimate();
  }
  isAnimate() {
    return this.animateRuleta;
  }
  setAnimate() {
    this.animateRuleta = !this.animateRuleta;
  }
}
