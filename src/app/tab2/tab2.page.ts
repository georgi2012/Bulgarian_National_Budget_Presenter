import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { ItemService } from '../../services/item.service';
import { NavController } from '@ionic/angular';
//import { Item } from '../../models/item.model';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  item: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private itemService: ItemService,
    private navCtrl: NavController) {
  }

  ngOnInit() {

  }

  onSwipeLeft($event) {
    this.router.navigate(['/tabs/tab1']);
    console.log("left swipe");
  }

  onSwipeRight($event) {
    this.router.navigate(['/tabs/tab3']);
    console.log("right swipe");
  }

}
