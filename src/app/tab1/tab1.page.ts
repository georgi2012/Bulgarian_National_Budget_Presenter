import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private router: Router) {
  }

  ngOnInit() {

  }

  onSwipeLeft($event) {
    //this.router.navigate(['/tabs/tab1']);
    console.log("left swipe");
  }

  onSwipeRight($event) {
    this.router.navigate(['/tabs/tab2']);
    console.log("right swipe");
  }


}
