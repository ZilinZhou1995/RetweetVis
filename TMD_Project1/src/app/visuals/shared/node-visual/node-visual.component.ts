import { Component, Input } from '@angular/core';
import { Node } from '../../../d3';
import * as d3 from 'd3';

@Component({
  selector: '[nodeVisual]',
  template: `
    <svg:g [attr.transform]="'translate(' + node.x + ',' + node.y + ')'">
      <svg:circle
          tooltip="{{tooltip}}"
          placement="top"
          class="node"
          [attr.fill]="node.color"
          cx="0"
          cy="0"
          [attr.r]="node.r">
      </svg:circle>
      <svg:text
          class="node-name"
          [attr.font-size]="node.fontSize">
          {{node.id}}
      </svg:text>
    </svg:g>
  `,
  styleUrls: ['./node-visual.component.css']
})
export class NodeVisualComponent {
  @Input('nodeVisual') node: Node;

  tooltip = 'Test Popup'
}
