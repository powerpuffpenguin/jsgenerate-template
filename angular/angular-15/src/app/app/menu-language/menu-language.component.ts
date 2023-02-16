import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { SettingsService } from 'src/app/core/settings.service';
import { i18n } from 'src/internal/i18n';

@Component({
  selector: 'app-menu-language',
  templateUrl: './menu-language.component.html',
  styleUrls: ['./menu-language.component.scss']
})
export class MenuLanguageComponent {
  i18n = i18n
  langs: MenuItem[]
  constructor(private readonly settingsService: SettingsService,
    private readonly translateService: TranslateService,
  ) {
    this.langs = this._update()
  }
  private _update() {
    const settingsService = this.settingsService
    const langs = settingsService.langs
    return langs.map<MenuItem>((lang) => {
      return {
        label: lang.name,
        icon: lang.checked ? 'pi pi-check-circle' : 'pi pi-circle',
        command: () => {
          if (lang.checked) {
            return
          }
          const id = lang.id
          settingsService.lang.value = id
          for (const val of langs) {
            val.checked = val.id == id
          }
          this.translateService.use(id)
          this.langs = this._update()
        },
      }
    })
  }
}
