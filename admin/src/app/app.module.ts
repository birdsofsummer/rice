import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { 
    APP_BASE_HREF,
    AsyncPipe,
    CommonModule,
    CurrencyPipe,
    DOCUMENT,
    DatePipe,
    DecimalPipe,
    FormStyle,
    FormatWidth,
    HashLocationStrategy,
    I18nPluralPipe,
    I18nSelectPipe,
    JsonPipe,
    KeyValuePipe,
    LOCATION_INITIALIZED,
    Location,
    LocationStrategy,
    LowerCasePipe,
    NgClass,
    NgComponentOutlet,
    NgForOf,
    NgForOfContext,
    NgIf,
    NgIfContext,
    NgLocaleLocalization,
    NgLocalization,
    NgPlural,
    NgPluralCase,
    NgStyle,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgTemplateOutlet,
    NumberFormatStyle,
    NumberSymbol,
    PathLocationStrategy,
    PercentPipe,
    PlatformLocation,
    Plural,
    SlicePipe,
    TitleCasePipe,
    TranslationWidth,
    UpperCasePipe,
    VERSION,
    ViewportScroller,
    WeekDay,
    formatCurrency,
    formatDate,
    formatNumber,
    formatPercent,
    getCurrencySymbol,
    getLocaleCurrencyCode,
    getLocaleCurrencyName,
    getLocaleCurrencySymbol,
    getLocaleDateFormat,
    getLocaleDateTimeFormat,
    getLocaleDayNames,
    getLocaleDayPeriods,
    getLocaleDirection,
    getLocaleEraNames,
    getLocaleExtraDayPeriodRules,
    getLocaleExtraDayPeriods,
    getLocaleFirstDayOfWeek,
    getLocaleId,
    getLocaleMonthNames,
    getLocaleNumberFormat,
    getLocaleNumberSymbol,
    getLocalePluralCase,
    getLocaleTimeFormat,
    getLocaleWeekEndRange,
    getNumberOfCurrencyDigits,
    isPlatformBrowser,
    isPlatformServer,
    isPlatformWorkerApp,
    isPlatformWorkerUi,
    registerLocaleData,
    ɵBrowserPlatformLocation,
    ɵDomAdapter,
    ɵNullViewportScroller,
    ɵPLATFORM_BROWSER_ID,
    ɵPLATFORM_SERVER_ID,
    ɵPLATFORM_WORKER_APP_ID,
    ɵPLATFORM_WORKER_UI_ID,
    ɵangular_packages_common_common_a,
    ɵangular_packages_common_common_b,
    ɵangular_packages_common_common_c,
    ɵangular_packages_common_common_d,
    ɵangular_packages_common_common_e,
    ɵangular_packages_common_common_f,
    ɵgetDOM,
    ɵparseCookieValue,
    ɵsetRootDomAdapter

} from '@angular/common';
import zh from '@angular/common/locales/zh';



import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { NzTableModule } from 'ng-zorro-antd/table';

registerLocaleData(zh);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
      AppComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    NzTableModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }
