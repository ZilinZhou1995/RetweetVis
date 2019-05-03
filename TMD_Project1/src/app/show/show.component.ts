import { Component, OnInit } from '@angular/core';
import APP_CONFIG from '../app.config';
import { Node, Link } from '../d3';
import * as d from '../../../../backend_getData/output/pop.json';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  isClicked: Boolean = false;
  nodes: Node[] = [];
  links: Link[] = [];
  // data from the json file
  data: any = d;

  constructor() {
    const N = APP_CONFIG.N,
          getIndex = number => number - 1;

    /** constructing the nodes array */
    // for (let i = 1; i <= N; i++) {
    //   this.nodes.push(new Node(i));
    // }

    for (let i = 0; i < this.data.length; i++){
      this.nodes.push(new Node(i));
      console.log(i);
    }

    // for (let i = 1; i <= N; i++) {
    //   for (let m = 2; i * m <= N; m++) {
    //     /** increasing connections toll on connecting nodes */
    //     this.nodes[getIndex(i)].linkCount++;
    //     this.nodes[getIndex(i * m)].linkCount++;

    //     /** connecting the nodes before starting the simulation */
    //     this.links.push(new Link(i, i * m));
    //   }
    // }

    for (let i = 1; i < this.data.length; i++) {
      this.nodes[i].linkCount++;
      this.nodes[i-1].linkCount++;

      this.links.push(new Link(i, i-1));
    }

  }

  ngOnInit() {
    let i = 4;
    // for(let node of this.nodes) {
    //   if(node.id == '1' || node.id == '16' || node.id == '71' || node.id == '84' || node.id == '21' || node.id == '89') {
    //     node.timestamp = d[i].created_at;
    //     node.name = d[i].user.name;
    //     i = Math.abs(i - 1) % 5;
    //   } else {
    //     node.timestamp = "Sat Apr 13 18:39:10 +0000 2019";
    //     node.name = "Juan Guido";
    //   } 
    // }

    for (let node of this.nodes) {
      node.timestamp = d[i].created_at;
      node.name = d[i].user.name;
      i = Math.abs(i - 1) % 5;
    }
    
  }

  search(string: String) {
    console.log(string);
    this.isClicked = true;
  }

  newSearch() {
    this.isClicked = false;
  }

}
