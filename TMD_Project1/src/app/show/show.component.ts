import { Component, OnInit } from '@angular/core';
import APP_CONFIG from '../app.config';
import { Node, Link } from '../d3';
import * as d from '../../../../backend_getData/output/all_retweet.json';

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
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    // for (let i = 0; i < this.data.length; i++){
    //   this.nodes.push(new Node(i));
    //   console.log(i);
    // }

    // for (let i = 1; i <= N; i++) {
    //   for (let m = 2; i * m <= N; m++) {
    //     /** increasing connections toll on connecting nodes */
    //     this.nodes[getIndex(i)].linkCount++;
    //     this.nodes[getIndex(i * m)].linkCount++;

    //     /** connecting the nodes before starting the simulation */
    //     if(i*m % 3 == 0) {
    //       this.links.push(new Link(i, i * m));
    //     }
        
    //   }
    // }
    // arr: Number[] = [];
    let count = 2;
    for (let i = 1; i <= 8; i++) {
      this.nodes[getIndex(1)].linkCount++;
      this.nodes[getIndex(count++)].linkCount++;

      this.links.push(new Link(1, count - 1));
    }

    for (let i = 2; i <= 3; i++) {
      let temp = count;
      if (i === 3) {
        for (let j = temp; j < temp + 20 && j <= 50; j++) {
          this.nodes[getIndex(i)].linkCount++;
          this.nodes[getIndex(count++)].linkCount++;
          this.links.push(new Link(i, count - 1));
        }
      }else{
        for (let j = temp; j < temp + 10 && j <= 50; j++) {
          this.nodes[getIndex(i)].linkCount++;
          this.nodes[getIndex(count++)].linkCount++;
          this.links.push(new Link(i, count - 1));
        }
      }
    }

    for (let i = 1; i <= 3; i++) {
      this.nodes[getIndex(21)].linkCount++;
      this.nodes[getIndex(count++)].linkCount++;
      this.links.push(new Link(21, count - 1));
    }

    for (let j = count; count <= 50; count++) {
      this.nodes[getIndex(4)].linkCount++;
      this.nodes[getIndex(count)].linkCount++;
      this.links.push(new Link(4, count));
    }

    // for (let i = 1; i < this.data.length; i++) {
    //   this.nodes[i].linkCount++;
    //   this.nodes[i-1].linkCount++;

    //   this.links.push(new Link(i, i-1));
    // }

  }

  ngOnInit() {
    let i = 4;
    for(let node of this.nodes) {
      if(node.id == '1' || node.id == '42' || node.id == '21') {
        node.timestamp = d[i].created_at;
        node.name = d[i].user.name;
        node.text = d[i].text;
        i = Math.abs(i - 1) % 5;
      } else {
        node.timestamp = "Sat Apr 12 11:39:10 +0000 2019";
        node.name = "BowenZ";
        node.text = "Repost";
      } 
    }

    // for (let node of this.nodes) {
    //   node.timestamp = d[i].created_at;
    //   node.name = d[i].user.name;
    //   i = Math.abs(i - 1) % 5;
    // }  
  }

  search(string: String) {
    console.log(string);
    this.isClicked = true;
  }

  newSearch() {
    this.isClicked = false;
  }

}
