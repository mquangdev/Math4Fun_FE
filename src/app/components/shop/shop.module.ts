import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { ShopRoutes } from './shop.routing';

@NgModule({
  declarations: [ShopComponent],
  imports: [CommonModule, ShopRoutes],
})
export class ShopModule {}
