import { Component } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlayService } from './services/play-service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ruleta5b';
  closeResult = '';
  public options = {
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: true,
  }
  constructor(
    private modalService: NgbModal,
    private playService: PlayService
  ) { }

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

  get isPowerOn() {
    return this.playService.isPowerOn();
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
}
