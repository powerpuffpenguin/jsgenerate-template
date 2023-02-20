import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';
import { SettingsService } from './core/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { i18n } from 'src/internal/i18n';
import { ViewState } from 'src/internal/view';
import { TitleService } from './core/title.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  env = environment
  i18nG = i18n.general

  view = new ViewState<void>()
  constructor(private primengConfig: PrimeNGConfig,
    private readonly settingsService: SettingsService,
    private readonly sanitizer: DomSanitizer,
    translateService: TranslateService,
    titleService: TitleService
  ) {
    this.theme = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/themes/${settingsService.theme.value}/theme.css`)
    translateService.use(settingsService.lang.value)
    this.view.loader = async () => {
      new Promise<void>((resove) => {
        let first = true
        translateService.stream(i18n.general.title).subscribe((val) => {
          titleService.defaultTitle = val
          if (first) {
            titleService.set(val)
            first = false
          }
          resove()
        })
      })
    }
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    // 執行初始化
    this.view.get()
  }
  theme: SafeResourceUrl
  themeSidebar = false // 主題側邊欄
  themes = Themes // 可選主題
  /**
   * 設置主題
   */
  onClickTheme(theme: string) {
    if (this.settingsService.theme.value != theme) {
      this.settingsService.theme.value = theme
      this.theme = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/themes/${theme}/theme.css`)
    }
  }
  isTheme(theme: string) {
    return this.settingsService.theme.value == theme
  }
}

const Themes: Array<{
  title: string
  values?: Array<{
    value: string
    label: string
    src?: string
  }>
}> = [
    {
      title: 'Bootstrap',
      values: [
        {
          label: 'Blue',
          value: 'bootstrap4-light-blue',
          src: 'assets/images/themes/bootstrap4-light-blue.svg',
        },
        {
          label: 'Purple',
          value: 'bootstrap4-light-purple',
          src: 'assets/images/themes/bootstrap4-light-purple.svg',
        },
        {
          label: 'Blue',
          value: 'bootstrap4-dark-blue',
          src: 'assets/images/themes/bootstrap4-dark-blue.svg',
        },
        {
          label: 'Purple',
          value: 'bootstrap4-dark-purple',
          src: 'assets/images/themes/bootstrap4-dark-purple.svg',
        },
      ],
    },
    {
      title: 'Material Design',
      values: [
        {
          label: 'Indigo',
          value: 'md-light-indigo',
          src: 'assets/images/themes/md-light-indigo.svg',
        },
        {
          label: 'Deep Purple',
          value: 'md-light-deeppurple',
          src: 'assets/images/themes/md-light-deeppurple.svg',
        },
        {
          label: 'Indigo',
          value: 'md-dark-indigo',
          src: 'assets/images/themes/md-dark-indigo.svg',
        },
        {
          label: 'Deep Purple',
          value: 'md-dark-deeppurple',
          src: 'assets/images/themes/md-dark-deeppurple.svg',
        },
      ],
    },
    {
      title: 'Material Design Compact',
      values: [
        {
          label: 'Indigo',
          value: 'mdc-light-indigo',
          src: 'assets/images/themes/md-light-indigo.svg',
        },
        {
          label: 'Deep Purple',
          value: 'mdc-light-deeppurple',
          src: 'assets/images/themes/md-light-deeppurple.svg',
        },
        {
          label: 'Indigo',
          value: 'mdc-dark-indigo',
          src: 'assets/images/themes/md-dark-indigo.svg',
        },
        {
          label: 'Deep Purple',
          value: 'mdc-dark-deeppurple',
          src: 'assets/images/themes/md-dark-deeppurple.svg',
        },
      ],
    },
    {
      title: 'Tailwind',
      values: [
        {
          label: 'Tailwind Light',
          value: 'tailwind-light',
          src: 'assets/images/themes/tailwind-light.png',
        },
      ],
    },
    {
      title: 'Fluent UI',
      values: [
        {
          label: 'Fluent Light',
          value: 'fluent-light',
          src: 'assets/images/themes/fluent-light.png',
        },
      ],
    },
    {
      title: 'PrimeOne Design',
      values: [
        {
          label: 'Lara Light Indigo',
          value: 'lara-light-indigo',
          src: 'assets/images/themes/lara-light-indigo.png',
        },
        {
          label: 'Lara Dark Indigo',
          value: 'lara-dark-indigo',
          src: 'assets/images/themes/lara-dark-indigo.png',
        },
        {
          label: 'Lara Light Purple',
          value: 'lara-light-purple',
          src: 'assets/images/themes/lara-light-purple.png',
        },
        {
          label: 'Lara Dark Purple',
          value: 'lara-dark-purple',
          src: 'assets/images/themes/lara-dark-purple.png',
        },
        {
          label: 'Lara Light Blue',
          value: 'lara-light-blue',
          src: 'assets/images/themes/lara-light-blue.png',
        },
        {
          label: 'Lara Dark Blue',
          value: 'lara-dark-blue',
          src: 'assets/images/themes/lara-dark-blue.png',
        },
        {
          label: 'Lara Light Teal',
          value: 'lara-light-teal',
          src: 'assets/images/themes/lara-light-teal.png',
        },
        {
          label: 'Lara Dark Teal',
          value: 'lara-dark-teal',
          src: 'assets/images/themes/lara-dark-teal.png',
        },
      ],
    },
    {
      title: 'PrimeOne Design - Legacy',
      values: [
        {
          label: 'Saga Blue',
          value: 'saga-blue',
          src: 'assets/images/themes/saga-blue.png',
        },
        {
          label: 'Saga Green',
          value: 'saga-green',
          src: 'assets/images/themes/saga-green.png',
        },
        {
          label: 'Saga Orange',
          value: 'saga-orange',
          src: 'assets/images/themes/saga-orange.png',
        },
        {
          label: 'Saga Purple',
          value: 'saga-purple',
          src: 'assets/images/themes/saga-purple.png',
        },
        {
          label: 'vela blue',
          value: 'vela-blue',
          src: 'assets/images/themes/vela-blue.png',
        },
        {
          label: 'vela green',
          value: 'vela-green',
          src: 'assets/images/themes/vela-green.png',
        },
        {
          label: 'vela orange',
          value: 'vela-orange',
          src: 'assets/images/themes/vela-orange.png',
        },
        {
          label: 'vela purple',
          value: 'vela-purple',
          src: 'assets/images/themes/vela-purple.png',
        },

        {
          label: 'Arya Blue',
          value: 'arya-blue',
          src: 'assets/images/themes/arya-blue.png',
        },
        {
          label: 'Arya Green',
          value: 'arya-green',
          src: 'assets/images/themes/arya-green.png',
        },
        {
          label: 'Arya Orange',
          value: 'arya-orange',
          src: 'assets/images/themes/arya-orange.png',
        },
        {
          label: 'Arya Purple',
          value: 'arya-purple',
          src: 'assets/images/themes/arya-purple.png',
        },
      ],
    },
    {
      title: 'Legacy',
      values: [
        {
          label: 'Nova',
          value: 'nova',
          src: 'assets/images/themes/nova.png',
        },
        {
          label: 'Nova Alt',
          value: 'nova-alt',
          src: 'assets/images/themes/nova-alt.png',
        },
        {
          label: 'Nova Accent',
          value: 'nova-accent',
          src: 'assets/images/themes/nova-accent.png',
        },
        {
          label: '',
          value: ''
        },
        {
          label: 'Luna Amber',
          value: 'luna-amber',
          src: 'assets/images/themes/luna-amber.png',
        },
        {
          label: 'Luna Blue',
          value: 'luna-blue',
          src: 'assets/images/themes/luna-blue.png',
        },
        {
          label: 'Luna Green',
          value: 'luna-green',
          src: 'assets/images/themes/luna-green.png',
        },
        {
          label: 'Luna Pink',
          value: 'luna-pink',
          src: 'assets/images/themes/luna-pink.png',
        },
        {
          label: 'Rhea',
          value: 'rhea',
          src: 'assets/images/themes/rhea.png',
        },
      ],
    },
  ]