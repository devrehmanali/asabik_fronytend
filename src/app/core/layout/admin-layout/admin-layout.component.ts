import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss'],
})
export class AdminLayoutComponent implements OnInit {
  subs: Subscription = new Subscription();
  fluidContainer: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.subs.add(
      this.router.events.subscribe((event: any) => {
        this.fluidContainer =
          this.activatedRoute.children[0].snapshot.data['fluidContainer'] ??
          false;
      })
    );
  }
}
