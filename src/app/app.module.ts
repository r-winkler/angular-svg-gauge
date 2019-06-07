import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SvgGaugeComponent } from './svg-gauge/svg-gauge.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SvgGaugeComponent
  ],
  imports: [
    BrowserModule,
      BrowserAnimationsModule,
    MatSliderModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
