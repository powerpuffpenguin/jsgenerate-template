import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// primeng
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { TooltipModule } from 'primeng/tooltip';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';

// import ngx-translate and the http loader
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
import { MenuModule } from 'primeng/menu';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './app/not-found/not-found.component';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { MenuLanguageComponent } from './app/menu-language/menu-language.component';

export function HttpLoaderFactory(http: HttpClient, locationStrategy: LocationStrategy): TranslateHttpLoader {
  let url = locationStrategy.getBaseHref();
  if (!url.endsWith('/')) {
    url += '/'
  }
  return new TranslateHttpLoader(http, `${url}assets/i18n/`, '.json')
}

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    AboutComponent,
    MenuLanguageComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: "en",// 指定默認語言
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory, // 使用 http 加載語言包
        deps: [HttpClient, LocationStrategy]
      }
    }),
    ToolbarModule, ButtonModule, SidebarModule, TooltipModule,
    MessagesModule, MessageModule, MenuModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
