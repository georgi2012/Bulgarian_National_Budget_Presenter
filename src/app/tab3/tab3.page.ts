import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private itemService: ItemService,
    private navCtrl: NavController) {
  }

  ngOnInit() {

  }

  onSwipeLeft($event) {
    this.router.navigate(['/tabs/tab2']);
    console.log("left swipe");
  }

  onSwipeRight($event) {
    // this.router.navigate(['/tabs/tab3']);
    console.log("right swipe");
  }


}
