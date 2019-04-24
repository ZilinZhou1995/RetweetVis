import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { D3TooltipModule } from 'ngx-d3-tooltip';
import {TooltipModule} from 'ng2-tooltip-directive';

import { D3Service, D3_DIRECTIVES } from './d3';

import { AppComponent } from './app.component';

import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';
import { ShowComponent } from './show/show.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TooltipComponent } from './tooltip/tooltip.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    ShowComponent,
    TopNavComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    D3TooltipModule,
    TooltipModule
  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
