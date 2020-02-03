import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  mobileView: boolean;
  cartCount: number;

  constructor() { }

  ngOnInit() {
    if (window.innerWidth < 600) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
    this.cartCount = 0;
  }

  onResize(event) {
    // Since we are watching the window size from the HTML, event.target.innerWidth will be the window width.
    // This could also be done with CSS, but in this instance we want more control.
    if (event.target.innerWidth < 600) {
      this.mobileView = true;
    } else {
      this.mobileView = false;
    }
  }
}
