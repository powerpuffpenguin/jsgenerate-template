import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { i18n } from 'src/internal/i18n';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  i18nG = i18n.general
  constructor(readonly router: Router) { }
}
