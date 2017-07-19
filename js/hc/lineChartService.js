app.service('LineChartService',function(){
  this.createChart = function(totalPrincipal, totalInterest, year){

    Highcharts.setOptions({lang: {
            thousandsSep: ','
        }});

    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'column',
             options3d: {
               enabled: true,
                 alpha: 7,
                  beta: 18,
                  depth: 47,
                  viewDistance: 25
   }
        },
        title: {
            text: 'Loan Repayment'
        },
        //colors: ['#989898', '#0d2f47', '#195c8d', '#1a74b7', '#2599f0'],
      colors: ['#195c8d', '#0d2f47',   '#1a74b7', '#2599f0'],
        exporting:{
            enabled:false
        },

        xAxis: {
            categories: ["Loan 1","Loan 2"]
        },
        yAxis: {
          allowDecimals: true,
          min: 0.00,
          title: {
             text: 'Amount ($)'
          },

        },
        legend: {
            enabled: false
        },
        gridLineColor: 'transparent',

        tooltip: {
            headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
            // pointFormat: '<b>$ {point.y:.2f}</b><br/>'
            pointFormatter: function(){
                return '<b>'+'Amount : $' + Highcharts.numberFormat((((this.y)).toFixed(2)),2,'.')+'</b>';

            }
        },
        tooltip: {
          formatter: function () {
              return '<b> Loan: ' + this.x + '</b><br/>' +
              '<b>' + this.series.name + ': ' + Highcharts.numberFormat((((this.y)).toFixed(2)),2,'.') + '</b>';
          }
        },
        credits: {
            enabled: false
        },

        plotOptions: {
        column: {
            stacking: 'normal'
        }
        },

        series: [  {  //totalPrincipal, totalInterest
            name: 'Total Principal',
            data: totalPrincipal,
            stack: 'female'
        }, {
            name: 'Total Interest',
            data:  totalInterest,
            stack: 'female'
        }]

    });

}});
