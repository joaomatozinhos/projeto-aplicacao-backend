import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonTitlePage } from 'src/common/model/ButtonTitlePage';

@Component({
  selector: 'app-title-page',
  templateUrl: './title-page.component.html',
  styleUrls: ['./title-page.component.css'],
})
export class TitlePageComponent implements OnInit {
  @Input() titlePage!: string;
  @Input() subtitlePage!: string;
  @Input() buttons!: ButtonTitlePage[];

  @Output() clickEvent = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit() {}

  public executarAcaoButton(button: ButtonTitlePage) {
    switch (button?.nome.toLowerCase()) {
      case 'voltar': {
        if (button.url) this.linkTo(button.url);
        break;
      }

      case 'novo': {
        if (button.url) this.linkTo(button.url);
        break;
      }

      case 'salvar': {
        this.clickEvent.emit();
        break;
      }
    }
  }

  linkTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
