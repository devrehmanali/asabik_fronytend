import { Component, Input } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Icon } from 'src/app/shared/components/icon/icon.enum';
import { Link } from 'src/app/shared/links.const';
import { Router } from '@angular/router';
import { Location } from '@angular/common'; // Import Location

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  icon = Icon;
  link = Link;
  @Input() drawer!: MatDrawer;
  currentRoute: string = '';

  constructor(
    private router: Router,
    private location: Location // Dodaj Location do zależności
  ) {
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  goBack() {
    this.location.back(); // Użyj metody location.back() do cofania użytkownika
  }
}
