import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';
import * as d3 from 'd3';
import { nodeValue } from '@angular/core/src/view';

@Component({
  selector: '[nodeVisual]',
  templateUrl: './node-visual.component.html',
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;

  tooltip = "haha";
}
