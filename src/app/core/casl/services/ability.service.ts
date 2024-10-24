import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';
import { Injectable } from '@angular/core';
import { AppAction } from '../models/app-actions.enum';
import { AppSubject } from '../models/app-subjects.enum';

export type AppAbility = Ability<[AppAction, AppSubject]>;
export const AppAbility = Ability as AbilityClass<AppAbility>;

@Injectable({ providedIn: 'root' })
export class Session {
  constructor(private ability: Ability) {}

  private defineAbilitiesForUser(user: any) {
    const { can, rules } = new AbilityBuilder(Ability);

    can('manage', 'all');

    this.ability.update(rules);
  }
}
