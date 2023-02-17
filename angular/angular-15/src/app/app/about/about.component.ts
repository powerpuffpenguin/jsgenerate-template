import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AssetsService } from 'src/app/core/assets.service';
import { TitleService } from 'src/app/core/title.service';
import { BaseComponent } from 'src/internal/base-component';
import { i18n } from 'src/internal/i18n';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends BaseComponent implements OnInit {
  constructor(
    private readonly titleService: TitleService,
    private readonly assetsService: AssetsService,
    private readonly httpClient: HttpClient,
  ) {
    super()
  }
  i18nAB = i18n.about
  selfLicenses = ''
  licenses = ''
  ngOnInit(): void {
    this.titleService.watchTitle(i18n.about.title, this.observableClosed)

    this.assetsService.text('assets/3rdpartylicenses.txt').pipe(
      this.takeUntilClosed()
    ).subscribe((val) => {
      this.licenses = val
    })

    // this.assetsService.text('assets/LICENSE').pipe(
    //   this.takeUntilClosed()
    // ).subscribe((val) => {
    //   this.selfLicenses = val
    // })
  }
}
