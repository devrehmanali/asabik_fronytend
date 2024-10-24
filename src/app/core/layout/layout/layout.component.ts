import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  showLogo: boolean = true;
  isOnPlaidPage: boolean = false; // Dodana flaga

  subs: Subscription = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.add(
      this.router.events.subscribe((event) => {
        this.showLogo =
          this.activatedRoute.snapshot.firstChild?.data['showLogo'] ?? true;
        this.isOnPlaidPage = this.router.url.includes('/plaid'); // Sprawdzenie czy jesteśmy na stronie Plaid
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
