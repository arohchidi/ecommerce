/*
Template Name: Hyrax UX Admin
Author: SRGIT

File: js
*/
$(function () {
    "use strict";
    // ============================================================== 
    // Our Visitor
    // ============================================================== 
    
    var chart = c3.generate({
        bindto: '#visitor',
        data: {
            columns: [
                ['Other', 30],
                ['Desktop', 10],
                ['Tablet', 40],
                ['Mobile', 50],
            ],
            
            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
              },
            title:"Visits",
            width:20,
            
        },
        
        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        color: {
              pattern: ['#eceff1', '#13aeb0', '#115e8c', '#f14656']
        }
    });
    // ============================================================== 
    // Our Income
    // ==============================================================
    var chart = c3.generate({
        bindto: '#income',
        data: {
            columns: [
                ['Growth Income', 100, 200, 100, 300],
                ['Net Income', 130, 100, 140, 200]
            ],
            type: 'bar'
        },
         bar: {
            space: 0.2,
            // or
            width: 15 // this makes bar width 100px
        },
        axis: {
            y: {
            tick: {
                count : 4,
                
                outer: false
                }
            }
        },
        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        grid: {
        x: {
            show: false
        },
        y: {
            show: true
        }
    },
        size: {
            height: 290
        },
        color: {
              pattern: [ '#13aeb0', '#f14656']
        }
    });
    
    // ============================================================== 
    // Sales Different
    // ============================================================== 
    
    var chart = c3.generate({
        bindto: '#sales',
        data: {
            columns: [
                ['One+', 50],
                ['T', 60],
                ['Samsung', 20],
                
            ],
            
            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
              },
            title:"",
            width:18,
            
        },
        size: {
            height: 150
        },
        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        color: {
              pattern: ['#F14656', '#716ACA', '#115e8c', '#f14656']
        }
    });
	
	
	// ============================================================== 
    // Sales Different
    // ============================================================== 
    
    var chart = c3.generate({
        bindto: '#sales-2',
        data: {
            columns: [
                ['One+', 80],
                ['T', 30],
                ['Samsung', 60],
                
            ],
            
            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
              },
            title:"",
            width:18,
            
        },
        size: {
            height: 150
        },
        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        color: {
              pattern: ['#F14656', '#716ACA', '#115e8c', '#f14656']
        }
    });
	
	
	
    // ============================================================== 
    // Sales Prediction
    // ============================================================== 
    
     var chart = c3.generate({
        bindto: '#prediction',
        data: {
            columns: [
                ['One+', 50],
                ['T', 30],
                ['Samsung', 50],
                
            ],
            
            type : 'donut',
            onclick: function (d, i) { console.log("onclick", d, i); },
            onmouseover: function (d, i) { console.log("onmouseover", d, i); },
            onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        donut: {
            label: {
                show: false
              },
            title:"",
            width:18,
            
        },
        size: {
            height: 150
        },
        legend: {
          hide: true
          //or hide: 'data1'
          //or hide: ['data1', 'data2']
        },
        color: {
               pattern: ['#115e8c', '#716ACA', '#F14656', '#f14656']
        }
    });
	
	
    
   
	
	// Extra chart
 Morris.Area({
        element: 'extra-area-chart',
        data: [{
                    period: '2010',
                    iphone: 100,
                    ipad: 0,
                    itouch: 0
                }, {
                    period: '2011',
                    iphone: 50,
                    ipad: 15,
                    itouch: 5
                }, {
                    period: '2012',
                    iphone: 20,
                    ipad: 50,
                    itouch: 95
                }, {
                    period: '2013',
                    iphone: 60,
                    ipad: 12,
                    itouch: 7
                }, {
                    period: '2014',
                    iphone: 30,
                    ipad: 20,
                    itouch: 120
                }, {
                    period: '2015',
                    iphone: 25,
                    ipad: 80,
                    itouch: 40
                }, {
                    period: '2016',
                    iphone: 10,
                    ipad: 10,
                    itouch: 10
                }


                ],
                lineColors: ['#00326f', '#13AEB0', '#da0d20'],
                xkey: 'period',
                ykeys: ['iphone', 'ipad', 'itouch'],
                labels: ['Site A', 'Site B', 'Site C'],
                pointSize: 0,
                lineWidth: 0,
                resize:true,
                fillOpacity: 1,
                behaveLikeLine: true,
                gridLineColor: '#e0e0e0',
                hideHover: 'auto'
        
    });

$(document).ready(function() {
  $("#sparkline12").sparkline([8,6,9,8,9,8,7,10], {
        type: 'bar',
        height: '50',
        barWidth: 5,
        barSpacing: 3,
        barColor: '#6772e5'
        });

$("#sparkline8").sparkline([2,4,4,6,8,5,6,4,8,6,6,2 ], {
            type: 'line',
            width: '100',
            height: '50',
            lineColor: '#2BB9C3',
            fillColor: '#2BB9C3',
            maxSpotColor: '#2BB9C3',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#2BB9C3'
        });
  $('#sparkline11').sparkline([20, 40, 30], {
            type: 'pie',
            height: '50',
            resize: true,
            sliceColors: ['#F14656', '#115E8C', '#13AEB0']
        });
  
           $("#sparkline14").sparkline([0, 23, 43, 35, 44, 45, 56, 37, 40, 45, 56, 7, 10], {
            type: 'line',
            width: '100',
            height: '50',
            lineColor: '#F4516C',
            fillColor: 'transparent',
            spotColor: '#F4516C',
            minSpotColor: undefined,
            maxSpotColor: undefined,
            highlightSpotColor: undefined,
            highlightLineColor: undefined
        }); 

});
// ============================================================== 
    // This is for the popup message while page load
    // ============================================================== 
        $.toast({
            heading: 'Welcome to HyraxUX',
            text: 'The most complete user interface framework to create stunning admin dashboard.',
            position: 'top-right',
            loaderBg: '#144789',
            icon: 'info',
            hideAfter: 6000,
            stack: 6
        })
});
