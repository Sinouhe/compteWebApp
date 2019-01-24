import { Component, OnInit } from '@angular/core';
import { ServiceModalBootstrapService } from '../../services/service-modal-bootstrap.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  private title: string;
  private texte: string;
  private texteButton: string;

  constructor(private _serviceModalService: ServiceModalBootstrapService) { }

  ngOnInit() {
    this._serviceModalService.subject.subscribe(
                        (data) => {
                          this.title = data.title;
                          this.texte = data.texte;
                          this.texteButton = data.texteButton;
                          console.log(JSON.stringify(data));
                        },
                        (error) => {
                          console.log(error);
                        });
  }
}
