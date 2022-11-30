import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayService } from './../../services/play-service.service';
@Component({
  selector: 'app-ruleta',
  templateUrl: './ruleta.component.html',
  styleUrls: []
})
export class RuletaComponent implements OnInit {
  closeResult = '';
  constructor(
    private route: ActivatedRoute,
    private playServices: PlayService,
    private modalService: NgbModal
  ) {
    this.playServices.setPowerOn(true);
  }

  private animateRuleta = false;
  private animateRuletaFast = false;
  private _customTemplate!: any;
  private _response!: any;
  private moveId: number = 0;
  @ViewChild('winner')// customTemplate!: Winner;
  set customTemplate(v: any) {
    this._customTemplate = v;
  }

  get premio() {
    return this._response ? this._response.obj : null;
  }

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
        // console.log(this.moveId);
        this.playServices.play(this.moveId).subscribe((response: any) => {
          this.setAnimateFast();
          setTimeout(() => {
            this.setAnimateFast();
            if (response.obj) {
              const winObj = response.obj.winObj;
              const optObj = response.obj.winOpt;
              if (winObj && optObj && winObj.use_code) {
                response.obj.winObj.img = winObj.img + optObj.img;
              }
            }
            this._response = response;
            this.open(this._customTemplate)
          }, 5000)
        }, (error: any) => {
          if (error.status === 404) {
            this.setAnimateFast();
            setTimeout(() => {
              this.setAnimateFast();
              this._response = null;
              this.open(this._customTemplate)
            }, 5000)
          } else {
            console.log(error);
          }
        })
      }, 2000);
    }
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', fullscreen: 'modal-fullscreen-xl-down' }).result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
    // console.log(this.closeResult);
  }

  close(content: any) {
    this.modalService.dismissAll();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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
