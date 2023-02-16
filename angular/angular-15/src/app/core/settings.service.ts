import { Injectable } from '@angular/core';
import { getItem, setItem } from 'src/internal/local-storage';
import { TranslateService } from '@ngx-translate/core';
export class SettingsString {
  private value_: string
  constructor(private readonly key_: string, val: string) {
    this.value_ = getItem(key_, val)
  }
  get value(): string {
    return this.value_
  }
  set value(val: string) {
    if (val != this.value_) {
      this.value_ = val
      setItem(this.key_, val)
    }
  }
}
export interface Language {
  id: string
  name: string
  checked?: boolean
}
@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // 支持的語言
  readonly langs: Array<Language> = [
    {
      id: 'en',
      name: '🇺🇸 English',
    },
    {
      id: 'zh-Hant',
      name: '🇹🇼 繁體中文',
    },
    {
      id: 'zh-Hans',
      name: '🇨🇳 简体中文',
    },
  ]
  constructor(private readonly translate: TranslateService) {
    this.lang = new SettingsString('language', '')
    this._initLang()
    const id = this.lang.value
    for (const val of this.langs) {
      if (val.id == id) {
        val.checked = true
        break
      }
    }
  }
  private _initLang() {
    const lang = this.lang
    const langs = this.langs
    let id = lang.value
    for (const val of langs) {
      if (val.id == id) {
        return
      }
    }

    id = this.translate.getBrowserCultureLang()?.toLowerCase() ?? ''
    console.log(id)
    if (id == 'zh') {
      id = 'zh-Hant'
    } else if (id.startsWith('zh-')) {
      id = 'zh-Hant'
      for (const v of ['hans', 'cn']) {
        if (id.indexOf(v) >= 0) {
          id = 'zh-Hans'
          break
        }
      }
    } else {
      id = 'en'
    }
    lang.value = id
  }
  lang: SettingsString
  theme = new SettingsString(
    "theme",
    "bootstrap4-dark-blue",
  )
}
