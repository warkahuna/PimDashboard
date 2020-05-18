import * as d3 from 'd3';
import * as nv from 'nvd3';

import { Component, ElementRef, HostBinding, OnInit } from '@angular/core';

import { PieChartComponent as BasePieChartComponent } from 'theme/components/pie-chart';
import { TablesService } from 'app/services/manage/tables.service';

@Component({
  selector: 'app-browser-statistics-chart',
  styleUrls: ['../../../theme/components/pie-chart/pie-chart.component.scss'],
  template: ``,
})
export class StatisticsComponent extends BasePieChartComponent implements OnInit {
  
  private info = [];
  private info2 = [];
  private active = 0;
  private canceled = 0;
  private trialing = 0;

  @HostBinding('class.mdl-grid') private readonly mdlGrid = true;
  @HostBinding('class.charts') private readonly charts = true;
  
  constructor(
    private el: ElementRef,
    private browserStatisticsChartService: TablesService,
  ) {
    super();
  }

  public ngOnInit() {

    this.getdata()


   
   
  }


  public getdata()
  {
    this.browserStatisticsChartService.listSubscription()
    .subscribe(
      data=>this.fillData(data),
      error=>console.log(error)
    )
  }

  public fillData(data){
  
const that= this;
    data.forEach(element => {
      //console.log(element)
      this.info.push(element.status);
    });
    //console.log(this.info)
    this.info.forEach(element => {
      if(element == "canceled")
      {
        that.canceled++;
      }
      if(element == "trialing")
      {
        that.trialing++;
      }
      if(element == "active")
      {
        that.active++;
      }
    });
  
    this.info2.push({key:"active"  ,y:this.active*100/this.info.length});
    this.info2.push({key:"trialing",y:this.trialing*100/this.info.length});
    this.info2.push({key:"canceled",y:this.canceled*100/this.info.length});
    
    //console.log(this.info2)
    //console.log(this.tablesService.getBorderedTable())
    //this.borderedTable = this.info2;
    this.setChart(this.info2)
  }

setChart(info)
{
  const COLORS = {
    red: '#f44336',
    lightBlue: '#03a9f4',
    orange: '#ffc107',
    amber: '#ff9800',
    teal: '#00bcd4',
    purple: '#7726d3',
    green: '#00d45a',
    rowBgColor: '#4a4a4a',
  };

  const container1 = d3.select(this.el.nativeElement);
  if (container1[0][0]) {
    const colors = [
      COLORS.purple,
      COLORS.red,
      COLORS.orange,
      COLORS.teal,
      COLORS.lightBlue,
    ];
    
    //const data = this.browserStatisticsChartService.getBrowserStatistics();
    
    const data =[
      info[0],
      info[1],
      info[2],
    ]
    
    nv.addGraph(() => {
      const innerRadius = 0.03;
      let outerRadius = 0.02;

      const pieChart = nv.models.pieChart()
        .x(d => d.key)
        .y(d => d.y)
        .showLabels(false)
        .donut(true)
        .growOnHover(true)
        .padAngle(.03)
        .margin({ left: 0, right: 0, top: 0, bottom: 0 })
        .color(colors)
        .arcsRadius([{ inner: innerRadius, outer: outerRadius },
          { inner: innerRadius, outer: outerRadius },
          { inner: innerRadius, outer: outerRadius },
          { inner: innerRadius, outer: outerRadius },
          { inner: innerRadius, outer: outerRadius },
        ])
        .showLegend(false)
        .titleOffset(10);

      pieChart.tooltip.enabled(false);

      container1.append('div')
        .append('svg')
        .datum(data)
        .transition().duration(1200)
        .call(pieChart);

      const h = 0;
      let i = 0.35;
      const timer = setInterval(animatePie, 70);

      function animatePie() {
        if (outerRadius < 1.02) {
          pieChart.arcsRadius([{ inner: innerRadius, outer: outerRadius },
            { inner: innerRadius, outer: outerRadius },
            { inner: innerRadius, outer: outerRadius },
            { inner: innerRadius, outer: outerRadius },
            { inner: innerRadius, outer: outerRadius },
          ]).update();
          outerRadius += i;
          if (i > 0.2) {
            i -= 0.05;
          }
        } else {
          outerRadius = 1.02;
          pieChart.arcsRadius([{ inner: innerRadius, outer: outerRadius },
            { inner: innerRadius, outer: outerRadius },
            { inner: innerRadius, outer: outerRadius },
            { inner: innerRadius, outer: outerRadius },
            { inner: innerRadius, outer: outerRadius },
          ])
            .showLabels(true)
            .labelType('percent')
            .update();
          clearInterval(timer);
        }
      }

      const color = d3.scale.ordinal().range(colors);

      const legend = container1.append('div')
        .attr('class', 'legend')
        .selectAll('.legend__item')
        .data(data)
        .enter()
        .append('div')
        .attr('class', 'legend__item');

      legend.append('div')
        .attr('class', 'legend__mark pull-left')
        .style('background-color', (d => color(d.key)) as any);

      legend.append('div')
        .attr('class', 'legend__text')
        .text(d => d.key);

      return pieChart;
    });
  }

}



}
