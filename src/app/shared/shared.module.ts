import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { AlertComponent } from './components/alert/alert.component';
import { IconComponent } from './components/icon/icon.component';
import { AlertPanelComponent } from './components/alert-panel/alert-panel.component';
import { RadioComponent } from './components/radio/radio.component';
import { MultiSelectComponent } from './components/multi-select/multi-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule, MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ImgInputComponent } from './components/img-input/img-input.component';
import { BusinessRatingComponent } from './components/business-rating/business-rating.component';
import { HttpClientModule } from '@angular/common/http';

let components = [
  ButtonComponent,
  InputComponent,
  IconComponent,
  AlertComponent,
  AlertPanelComponent,
  RadioComponent,
  MultiSelectComponent,
  ImgInputComponent,
  BusinessRatingComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatCommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatOptionModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [...components],
})
export class SharedModule {}
