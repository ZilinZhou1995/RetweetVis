import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { Node, ForceDirectedGraph } from '../models';
import { D3Service } from '../d3.service';

@Directive({
    selector: '[tooltipNode]'
})
export class TooltipDirective implements OnInit {
    @Input('tooltipNode') tooltipNode: Node;
    @Input('draggableInGraph') draggableInGraph: ForceDirectedGraph;

    constructor(private d3Service: D3Service, private _element: ElementRef) { }

    ngOnInit() {
        this.d3Service.applyTooltipBehaviour(this._element.nativeElement, this.tooltipNode, this.draggableInGraph);
    }
}
