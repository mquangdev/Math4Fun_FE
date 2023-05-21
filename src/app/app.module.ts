import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzListModule } from 'ng-zorro-antd/list';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { AuthModule } from './components/auth/auth.module';
registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    NzInputModule,
    NzCardModule,
    NzListModule,
    SharedModule,
    ComponentsModule,
    AuthModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
