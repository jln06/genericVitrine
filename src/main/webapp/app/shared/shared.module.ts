import { NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { TranslateDirective } from './language/translate.directive';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { DurationPipe } from './date/duration.pipe';
import { FormatMediumDatetimePipe } from './date/format-medium-datetime.pipe';
import { FormatMediumDatePipe } from './date/format-medium-date.pipe';
import { SortByDirective } from './sort/sort-by.directive';
import { SortDirective } from './sort/sort.directive';
import { ItemCountComponent } from './pagination/item-count.component';
import { FilterComponent } from './filter/filter.component';
import { SafeUrlPipe } from './pipe/safe-url.pipe';
import { SafeHtmlPipe } from './pipe/safe-html.pipe';
import { DragDirective } from './directive/drag.directive';
import { SplideDirective } from './directive/splide.directive';
import { GalerieComponent } from './galerie/galerie.component';
import { GalerieDisplayComponent } from './galerie/galerie-display/galerie-display.component';
import { GalerieUploadComponent } from './galerie/galerie-upload/galerie-upload.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { closeMenuDirective } from './directive/close-menu.directive';

@NgModule({
  imports: [SharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
    SafeUrlPipe,
    SafeHtmlPipe,
    closeMenuDirective,
    DragDirective,
    SplideDirective,
    GalerieComponent,
    GalerieDisplayComponent,
    GalerieUploadComponent,
    ConfirmDialogComponent,
  ],
  exports: [
    SharedLibsModule,
    FindLanguageFromKeyPipe,
    TranslateDirective,
    AlertComponent,
    AlertErrorComponent,
    HasAnyAuthorityDirective,
    DurationPipe,
    FormatMediumDatetimePipe,
    FormatMediumDatePipe,
    SortByDirective,
    SortDirective,
    ItemCountComponent,
    FilterComponent,
    DragDirective,
    SplideDirective,
    GalerieComponent,
    GalerieUploadComponent,
    SafeHtmlPipe,
    closeMenuDirective,
    GalerieDisplayComponent,
  ],
})
export class SharedModule {}
