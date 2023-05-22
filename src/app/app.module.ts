import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './components/auth/auth.module';
import { ComponentsModule } from './components/components.module';
import { SharedModule } from './shared/shared.module';
import { checkLoginGuard } from './guard/checkLoginGuard';
import { NzMessageService } from 'ng-zorro-antd/message';
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
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    checkLoginGuard,
    NzMessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
