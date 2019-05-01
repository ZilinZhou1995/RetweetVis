import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `
    <p>
      tooltip works!
    </p>
  `,
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnInit {
  @Input()
  myDatum: any;

  @Output()
  update: EventEmitter<any>;

  constructor() { }

  ngOnInit() {
  }


}
