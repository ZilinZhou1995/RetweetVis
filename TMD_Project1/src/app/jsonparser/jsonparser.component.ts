import { Component, OnInit } from '@angular/core';
import * as d from '../../../../backend_getData/output/pop.json';
import APP_CONFIG from '../app.config';
import { Node, Link } from '../d3';

@Component({
  selector: 'app-jsonparser',
  template: `
    <p>
      jsonparser works!
      {{ d | json }}
    </p>
  `,
  styleUrls: ['./jsonparser.component.css']
})
export class JsonparserComponent implements OnInit {
  data: any = d;
  constructor() {
  }

  ngOnInit() {
    // for(let i = 0; i < data.length; i++){
    //   console.log(data[i]);
    // }
    console.log(this.data[1]);
    
  }

}
