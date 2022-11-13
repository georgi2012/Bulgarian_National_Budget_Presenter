import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonAccordion, IonAccordionGroup, NavController } from '@ionic/angular';
import jsontest from '../../assets/BNBtest.json';
import { DataMapper, MainMapper, SubtypeMapper, TypeMapper } from 'src/helpers/interfaces';
import { BarChartPage } from '../bar-chart/bar-chart.page';
import { DoughnutChartPage } from '../doughnut-chart/doughnut-chart.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  item: any;
  jsonfile: DataMapper[] = [];
  yearMap: Map<number, Map<string, SubtypeMapper[]>>;
  page = 1;
  @ViewChild(BarChartPage) barPage: BarChartPage;
  @ViewChild('d1') doughnutPage1: DoughnutChartPage;
  @ViewChild('d2') doughnutPage2: DoughnutChartPage;

  @ViewChild('accordionGroup', { static: false }) accordionGroup: IonAccordionGroup;

  //titleMap: Map<string, SubtypeMapper[]>
  //bar
  values: number[] = [];
  labels: string[] = [];
  //dough
  dValues_in: number[] = [];
  subVals_in: number[] = [];
  subLebels_in: string[] = [];
  dLabels_in: string[] = [];
  dValues_out: number[] = [];
  subVals_out: number[] = [];
  subLebels_out: string[] = [];
  dLabels_out: string[] = [];
  //list
  curTitle: string;
  //other
  year: number;

  constructor( //meow
    private router: Router) {
    //
    this.loadDataFromFile();
    //
    this.yearMap = new Map<number, Map<string, SubtypeMapper[]>>();
    //
    this.loadHashMaps();
    //
    this.loadDataForTheYear();
    //
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.updateData();
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
    this.curTitle = this.jsonfile[0].data[0].title;
  }

  private nullify() {
    this.labels = [];
    this.values = [];
    this.dValues_in = [];
    this.subVals_in = [];
    this.subLebels_in = [];
    this.dValues_out = [];
    this.subVals_out = [];
    this.subLebels_out = [];
  }

  private loadTypeFor(data: TypeMapper[], labels: string[], values: number[], subVals: number[], subLebels: string[]) {
    data.forEach(el => {
      labels.push(el.type);
      values.push(el.value);
      el.subdata.forEach(subd => {
        subVals.push(subd.value);
        subLebels.push(subd.name);
      });
    });
  }

  private loadDataForTheYear() {
    this.nullify();
    this.yearMap.get(this.year).get(this.curTitle).forEach(element => { //prizohi & razhodi
      this.labels.push(element.type);
      if (element.type == "Приходи") {
        this.loadTypeFor(element.subtype, this.dLabels_in, this.dValues_in, this.subVals_in, this.subLebels_in);
      } else {
        this.loadTypeFor(element.subtype, this.dLabels_out, this.dValues_out, this.subVals_out, this.subLebels_out);
      }
      //calculate value
      let sum = 0;
      element.subtype.forEach(el => {
        sum += el.value;
      });
      this.values.push(sum);
      //console.log("using map for year " + this.year + " for " + title, element, sum);
    });
  }

  updateData() {
    this.barPage.updateData(this.values, this.labels);
    this.doughnutPage1.updateData(this.dValues_in, this.dLabels_in, this.subLebels_in, this.subVals_in);
    this.doughnutPage2.updateData(this.dValues_out, this.dLabels_out, this.subLebels_out, this.subVals_out);
  }

  onTypeChange = (type: string) => {
    console.log(type);
    const natEl = this.accordionGroup;
    natEl.value = undefined;
    this.curTitle = type;
    //update bar
    this.loadDataForTheYear();
    this.updateData();
  }

  onYearChange(modifier: number) {
    console.log("year changing with " + modifier)
    if (this.yearMap.has(this.year + modifier)) {
      this.year = this.year + modifier;
      this.loadDataForTheYear();
      //update bar
      this.updateData();
    }
    console.log("types", this.getTypes());
  }

  private getTypes(): string[] {
    return Array.from(this.yearMap.get(this.year).keys());
  }

  onSwipeLeft($event) {
    //this.router.navigate(['/tabs/tab1']);
    if (this.page > 0) {
      this.page--;
    }
    console.log("left swipe");
  }

  onSwipeRight($event) {
    //this.router.navigate(['/tabs/tab3']);
    if (this.page < 2) {
      this.page++;
    }
    console.log("right swipe");
  }

}
