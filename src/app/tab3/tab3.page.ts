import { Component } from '@angular/core';
import * as exampleData from '../../assets/jsonTest.json';
//import { readFileSync } from 'fs';
//import * as fs from 'fs';

interface other {
  guz: string,
  далиможетака: string
}

interface data {
  hello: number,
  world: string,
  lqnka: other[]
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})


export class Tab3Page {

  constructor() {
    const example = exampleData as data[];
    // var fs = require('fs');
    // const file = fs.readFileSync('/assets/jsonTest.json', "utf8");
    console.log(example);
    const data2 = example[1].lqnka;
    console.log(data2);
  }

}
