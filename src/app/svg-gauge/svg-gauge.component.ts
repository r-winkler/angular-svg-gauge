import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-svg-gauge',
  templateUrl: './svg-gauge.component.svg',
  styleUrls: ['./svg-gauge.component.css']
})
export class SvgGaugeComponent implements OnInit {

  static uniqueId = 0;

  private value = 0;

  @Input() set gauge(value) {
    this.value = value;
    this.setColor(value);
  }

  private setColor(value: number) {
    if(value > 80) {
      this.color = '#fe0400';
    }
    else if (value > 60) {
      this.color = '#f2ae02';
    }
    else if (value > 40) {
      this.color = '#f7ef02';
    }
    else if (value > 20){
      this.color = '#a6f20e';
    }
    else {
      this.color = '#37f71d';
    }
  }

  color: string;

  filterId: string;
  min = 0;
  maxValue = 100;
  width = 400;
  height = 320;
  minMaxLabelsOffset = 25;
  backgroundColor = '#eee';
  minMaxLabelStyle = {
    textAnchor: 'middle',
    fill: '#999',
    stroke: 'none',
    fontStyle: 'normal',
    fontVariant: 'normal',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontSize: '20px',
    lineHeight: 'normal',
    fillOpacity: 1
  };
  pathValues: any;

  // tslint:disable-next-line:variable-name
  private _valueLabelStyle: any;

  get valueLabelStyle(): any {
    return this._valueLabelStyle;
  }

  set valueLabelStyle(style: any) {
    this._valueLabelStyle = (style.fontSize ? style : {...style, fontSize: (this.width / 8) + 'px'});
  }

  valueFormatter = (value: number) => `${value}`;

  ngOnInit() {
    this.valueLabelStyle = {
      textAnchor: 'middle',
      fill: '#111',
      stroke: 'none',
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontWeight: 'bold',
      fontStretch: 'normal',
      lineHeight: 'normal',
      fillOpacity: 1
    };
    this.pathValues = this.getPathValues(this.maxValue);
    if (!this.filterId) {
      this.filterId = 'filter_' + SvgGaugeComponent.uniqueId++;
    }
  }

  getPath(value: number): string {
    const {rO, rI, cX, cY, xO, yO, xI, yI} = this.getPathValues(value);

    let path = 'M' + (cX - rI) + ',' + cY + ' ';
    path += 'L' + (cX - rO) + ',' + cY + ' ';
    path += 'A' + rO + ',' + rO + ' 0 0 1 ' + xO + ',' + yO + ' ';
    path += 'L' + xI + ',' + yI + ' ';
    path += 'A' + rI + ',' + rI + ' 0 0 0 ' + (cX - rI) + ',' + cY + ' ';
    path += 'Z ';

    return path;
  }

  private getPathValues(value: number) {
    if (value < this.min) {
      value = this.min;
    }
    if (value > this.maxValue) {
      value = this.maxValue;
    }

    const dx = 0;
    const dy = 0;

    const alpha = (1 - (value - this.min) / (this.maxValue - this.min)) * Math.PI;
    const rO = 2 * this.width / 5;
    const rI = rO - this.width / 8;

    const cX = 0.5 * this.width + dx;
    const cY = 0.7 * this.height + dy;

    const xO = this.width / 2 + dx + rO * Math.cos(alpha);
    const yO = this.height - (this.height - cY) - rO * Math.sin(alpha);
    const xI = this.width / 2 + dx + rI * Math.cos(alpha);
    const yI = this.height - (this.height - cY) - rI * Math.sin(alpha);

    return {alpha, rO, rI, cX, cY, xO, yO, xI, yI};
  }
}
