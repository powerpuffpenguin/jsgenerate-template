import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/core/session/session';
import { SessionService } from 'src/app/core/session/session.service';
import { BaseComponent } from 'src/internal/base-component';
import { i18n } from 'src/internal/i18n';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent extends BaseComponent implements OnInit {
  i18nG = i18n.general
  display = false
  constructor(
    private readonly sessionService: SessionService,
  ) {
    super()
  }
  session: undefined | Session
  ngOnInit() {
    this.sessionService.stream.pipe(
      this.takeUntilClosed()
    ).subscribe((session) => {
      this.session = session
    })
  }
}
