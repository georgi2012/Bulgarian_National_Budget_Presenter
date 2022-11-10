import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import jsontest from '../../assets/BNBtest.json';
import { DataMapper, MainMapper, SubtypeMapper } from 'src/helpers/interfaces';
import { BarChartPage } from '../bar-chart/bar-chart.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  item: any;
  jsonfile: DataMapper[] = [];
  yearMap: Map<number, Map<string, SubtypeMapper[]>>;
  @ViewChild(BarChartPage) barPage: BarChartPage;

  //titleMap: Map<string, SubtypeMapper[]>
  //bar
  values: number[] = [];
  labels: string[] = [];
  //list

  //other
  year: number;

  constructor(
    private router: Router) {
    //
    this.loadDataFromFile();
    //
    this.yearMap = new Map<number, Map<string, SubtypeMapper[]>>();
    //
    this.loadHashMaps();
    //
    this.loadDataForTheYear("Национален бюджет");
  }

  ngOnInit() {

  }

  private loadHashMaps() {
    this.jsonfile.forEach(element => {
      let titleMap: Map<string, SubtypeMapper[]> = new Map<string, SubtypeMapper[]>();
      element.data.forEach(data => {
        titleMap.set(data.title, data.data);
      });
      this.yearMap.set(element.year, titleMap);
    });

  }

  private loadDataFromFile() {
    this.jsonfile = jsontest as DataMapper[];
    console.log(this.jsonfile);
    if (this.jsonfile === null || this.jsonfile.length == 0) {
      console.log("no data loeaded");
      alert("No data loaded");
      return;
    }
    this.year = this.jsonfile[0].year;
  }

  private loadDataForTheYear(title: string) {
    this.yearMap.get(this.year).get(title).forEach(element => { //prizohi & razhodi
      this.labels.push(element.type);
      //calculate value
      let sum = 0;
      element.subtype.forEach(el => {
        sum += el.value;
      });
      this.values.push(sum);
      //console.log("using map for year " + this.year + " for " + title, element, sum);
    });


  }

  onYearChange(modifier: number) {
    console.log("year changing with " + modifier)
    if (this.yearMap.has(this.year + modifier)) {
      this.year = this.year + modifier;
      this.labels = [];
      this.values = [];
      this.loadDataForTheYear("Национален бюджет");
      //update bar
      this.barPage.updateData(this.values, this.labels);
    }
    console.log("types", this.getTypes());
  }

  private getTypes(): string[] {
    return Array.from(this.yearMap.get(this.year).keys());
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
