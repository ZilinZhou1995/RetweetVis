import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { D3TooltipModule } from 'ngx-d3-tooltip';
import {TooltipModule} from 'ng2-tooltip-directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';


import { D3Service, D3_DIRECTIVES, JsonServiceService } from './d3';

import { AppComponent } from './app.component';

import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';
import { ShowComponent } from './show/show.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { JsonparserComponent } from './jsonparser/jsonparser.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    ShowComponent,
    TopNavComponent,
    TooltipComponent,
    JsonparserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    D3TooltipModule,
    TooltipModule
  ],
  providers: [D3Service,
     JsonServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
