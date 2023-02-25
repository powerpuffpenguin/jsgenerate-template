import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PrimeNGConfig } from 'primeng/api';
import { SettingsService } from './core/settings.service';
import { TranslateService } from '@ngx-translate/core';
import { i18n } from 'src/internal/i18n';
import { ViewState } from 'src/internal/view';
import { TitleService } from './core/title.service';
import { environment } from 'src/environments/environment';
import { Session } from './core/session/session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  env = environment
  i18nG = i18n.general

  view = new ViewState<void>()
  constructor(private primengConfig: PrimeNGConfig,
    private readonly settingsService: SettingsService,
    private readonly sanitizer: DomSanitizer,
    translateService: TranslateService,
    config: PrimeNGConfig,
    titleService: TitleService,
  ) {
    this.theme = this.sanitizer.bypassSecurityTrustResourceUrl(`assets/themes/${settingsService.theme.value}/theme.css`)
    translateService.use(settingsService.lang.value)
    this.view.loader = async () => {
      new Promise<void>((resove) => {
        let first = true
        // 設置 primeng
        translateService.stream('primeng').subscribe((val) => {
          config.setTranslation(val)
        })
        // 設置標題
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
  session: undefined | Session
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
  get sidebar(): { width: string, fontsize: string } {
    if (document.body.clientWidth > 500) {
      return {
        width: "30rem",
        fontsize: "font-size: 0.875rem;",
      }
    }
    return {
      width: "24rem",
      fontsize: "font-size: 0.7rem;",
    }
  }
}

const Themes: Array<{
  title: string
  values: Array<{
    value: string
    label: string
    svg?: string
  }>
}> = [
    {
      title: 'Bootstrap',
      values: [
        {
          label: 'Blue',
          value: 'bootstrap4-light-blue',
        },
        {
          label: 'Purple',
          value: 'bootstrap4-light-purple',
        },
        {
          label: 'Blue',
          value: 'bootstrap4-dark-blue',
        },
        {
          label: 'Purple',
          value: 'bootstrap4-dark-purple',
        },
      ],
    },
    {
      title: 'Material Design',
      values: [
        {
          label: 'Indigo',
          value: 'md-light-indigo',
        },
        {
          label: 'Deep Purple',
          value: 'md-light-deeppurple',
        },
        {
          label: 'Indigo',
          value: 'md-dark-indigo',
        },
        {
          label: 'Deep Purple',
          value: 'md-dark-deeppurple',
        },
      ],
    },
    {
      title: 'Material Design Compact',
      values: [
        {
          label: 'Indigo',
          value: 'mdc-light-indigo',
          svg: 'md-light-indigo',
        },
        {
          label: 'Deep Purple',
          value: 'mdc-light-deeppurple',
          svg: 'md-light-deeppurple',
        },
        {
          label: 'Indigo',
          value: 'mdc-dark-indigo',
          svg: 'md-dark-indigo',
        },
        {
          label: 'Deep Purple',
          value: 'mdc-dark-deeppurple',
          svg: 'md-dark-deeppurple',
        },
      ],
    },
    {
      title: 'Tailwind',
      values: [
        {
          label: 'Tailwind Light',
          value: 'tailwind-light',
        },
      ],
    },
    {
      title: 'Fluent UI',
      values: [
        {
          label: 'Fluent Light',
          value: 'fluent-light',
        },
      ],
    },
    {
      title: 'PrimeOne Design - Lara',
      values: [
        {
          label: 'Light Indigo',
          value: 'lara-light-indigo',
        },
        {
          label: 'Dark Indigo',
          value: 'lara-dark-indigo',
        },
        {
          label: 'Light Purple',
          value: 'lara-light-purple',
        },
        {
          label: 'Dark Purple',
          value: 'lara-dark-purple',
        },
        {
          label: 'Light Blue',
          value: 'lara-light-blue',
        },
        {
          label: 'Dark Blue',
          value: 'lara-dark-blue',
        },
        {
          label: 'Light Teal',
          value: 'lara-light-teal',
        },
        {
          label: 'Dark Teal',
          value: 'lara-dark-teal',
        },
      ],
    },
    {
      title: 'PrimeOne Design - Legacy',
      values: [
        {
          label: 'Saga Blue',
          value: 'saga-blue',
        },
        {
          label: 'Saga Green',
          value: 'saga-green',
        },
        {
          label: 'Saga Orange',
          value: 'saga-orange',
        },
        {
          label: 'Saga Purple',
          value: 'saga-purple',
        },
        {
          label: 'vela blue',
          value: 'vela-blue',
        },
        {
          label: 'vela green',
          value: 'vela-green',
        },
        {
          label: 'vela orange',
          value: 'vela-orange',
        },
        {
          label: 'vela purple',
          value: 'vela-purple',
        },

        {
          label: 'Arya Blue',
          value: 'arya-blue',
        },
        {
          label: 'Arya Green',
          value: 'arya-green',
        },
        {
          label: 'Arya Orange',
          value: 'arya-orange',
        },
        {
          label: 'Arya Purple',
          value: 'arya-purple',
        },
      ],
    },
    {
      title: 'Legacy',
      values: [
        {
          label: 'Nova',
          value: 'nova',
        },
        {
          label: 'Nova Alt',
          value: 'nova-alt',
        },
        {
          label: 'Nova Accent',
          value: 'nova-accent',
        },
        {
          label: '',
          value: ''
        },
        {
          label: 'Luna Amber',
          value: 'luna-amber',
        },
        {
          label: 'Luna Blue',
          value: 'luna-blue',
        },
        {
          label: 'Luna Green',
          value: 'luna-green',
        },
        {
          label: 'Luna Pink',
          value: 'luna-pink',
        },
        {
          label: 'Rhea',
          value: 'rhea',
        },
      ],
    },
  ]