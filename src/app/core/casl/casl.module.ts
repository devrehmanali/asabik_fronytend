import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbilityModule } from '@casl/angular';
import { AppAbility } from './services/ability.service';
import { Ability, PureAbility } from '@casl/ability';

@NgModule({
  declarations: [],
  imports: [CommonModule, AbilityModule],
  exports: [AbilityModule],
  providers: [
    { provide: Ability, useValue: new AppAbility() },
    { provide: PureAbility, useExisting: AppAbility },
  ],
})
export class CaslModule {}
