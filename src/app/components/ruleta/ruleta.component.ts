import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayServiceService } from './../../services/play-service.service';

@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: ['./ruleta.component.css']
})
export class RuletaComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private playServices: PlayServiceService
  ) { }

  private animateRuleta = false;
  private animateRuletaFast = false;
  private moveId: number = 0;

  ngOnInit(): void {
    const moveId = this.route.snapshot.params['move_id'];
    if (moveId) {
      this.moveId = moveId;
    }
  }
  iniciarJuego() {
    this.setAnimate();
    if (this.moveId) {
      setTimeout(() => {
        console.log(this.moveId);
        this.playServices.play(this.moveId).then((response: any) => {
          this.setAnimateFast();
          setTimeout(() => {
            this.setAnimateFast();
            console.log(response);
          }, 5000)
        }).catch((error: any) => {
          console.log(error);
        })
      }, 2000);
    }
  }
  isAnimate() {
    return this.animateRuleta;
  }
  setAnimate() {
    this.animateRuleta = !this.animateRuleta;
  }
  isAnimateFast() {
    return this.animateRuletaFast;
  }
  setAnimateFast() {
    this.animateRuleta = false;
    this.animateRuletaFast = !this.animateRuletaFast;
  }
  get getRuleta() {
    return this.animateRuleta ? '../../../assets/images/rueda.png' : '../../../assets/images/rueda-normal.png'
  }
}
