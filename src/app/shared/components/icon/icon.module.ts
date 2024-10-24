import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './icon.component';
import { UniqueIDService } from '../../services/unique-id.service.ts';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule],
  providers: [UniqueIDService],
  exports: [IconComponent],
})
export class IconModule {}
