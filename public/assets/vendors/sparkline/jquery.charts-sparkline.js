  
$(document).ready(function() {
   var sparklineLogin = function() { 
        $("#sparkline1").sparkline([5,6,2,8,9,4,7,10,11,12,10], {
        type: 'bar',
        height: '45',
        barWidth: 7,
        barSpacing: 4,
        barColor: '#13aeb0'
        
    });

        $('#sparkline2').sparkline([20, 40, 30], {
            type: 'pie',
            width: '50',
            height: '45',
            resize: true,
            sliceColors: ['#F14656', '#13aeb0', '#f1f2f7']
        });

    
        $('#sparkline3').sparkline([5, 6, 2, 9, 4, 7, 10, 12], {
            type: 'bar',
            height: '164',
            barWidth: '7',
            resize: true,
            barSpacing: '5',
            barColor: '#f62d51'
        });

		
        $("#sparkline4").sparkline([0, 23, 43, 35, 44, 45, 56, 37, 40, 45, 56, 7, 10], {
            type: 'line',
            width: '120',
            height: '45',
            lineColor: '#f62d51',
            fillColor: 'transparent',
            spotColor: '#f62d51',
            minSpotColor: undefined,
            maxSpotColor: undefined,
            highlightSpotColor: undefined,
            highlightLineColor: undefined
        });  
		
        $('#sparkline5').sparkline([15, 23, 55, 35, 54, 45, 66, 47, 30], {
            type: 'line',
            width: '100%',
            height: '160',
            chartRangeMax: 50,
            resize: true,
            lineColor: '#F14656',
            fillColor: 'rgba(19, 218, 254, 0.3)',
            highlightLineColor: 'rgba(0,0,0,.1)',
            highlightSpotColor: 'rgba(0,0,0,.2)',
        });
    
        $('#sparkline5').sparkline([0, 13, 10, 14, 15, 10, 18, 20, 0], {
            type: 'line',
            width: '100%',
            height: '160',
            chartRangeMax: 40,
            lineColor: '#6757c8',
            fillColor: 'rgba(97, 100, 193, 0.3)',
            composite: true,
            resize: true,
            highlightLineColor: 'rgba(0,0,0,.1)',
            highlightSpotColor: 'rgba(0,0,0,.2)',
        });
		$('#sparkline6').sparkline([5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10], {
            type: 'bar',
            height: '45',
            barWidth: '7',
            barSpacing: '4',
            barColor: '#F14656'
        });
        $("#sparkline7").sparkline([0,2,8,6,8,5,6,4,8,6,4,2 ], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#ffca4a',
            fillColor: '#ffca4a',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#4f4f4f'
        });
        $("#sparkline8").sparkline([2,4,4,6,8,5,6,4,8,6,6,2 ], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#13aeb0',
            fillColor: '#13aeb0',
            maxSpotColor: '#13aeb0',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#13aeb0'
        });
        $("#sparkline9").sparkline([0,2,8,6,8,5,6,4,8,6,6,2 ], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#F14656',
            fillColor: '#F14656',
            minSpotColor:'#F14656',
            maxSpotColor: '#F14656',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#F14656'
        });
        $("#sparkline10").sparkline([2,4,4,6,8,5,6,4,8,6,6,2], {
            type: 'line',
            width: '100%',
            height: '50',
            lineColor: '#6757c8',
            fillColor: '#6757c8',
            maxSpotColor: '#6757c8',
            highlightLineColor: 'rgba(0, 0, 0, 0.2)',
            highlightSpotColor: '#6757c8'
        });
        $('#sparkline11').sparkline([20, 40, 30], {
            type: 'pie',
            height: '200',
            resize: true,
            sliceColors: ['#F14656', '#13aeb0', '#f1f2f7']
        });
        
        $("#sparkline12").sparkline([5,6,2,8,9,4,7,10,11,12,10,4,7,10], {
        type: 'bar',
        height: '200',
        barWidth: 10,
        barSpacing: 7,
        barColor: '#99d683'
        });

         $('#sparkline13').sparkline([5, 6, 2, 9, 4, 7, 10, 12,4,7,10], {
            type: 'bar',
            height: '200',
            barWidth: '10',
            resize: true,
            barSpacing: '7',
            barColor: '#f96262'
        });
         $('#sparkline13').sparkline([5, 6, 2, 9, 4, 7, 10, 12,4,7,10], {
            type: 'line',
            height: '200',
            lineColor: '#f96262',
            fillColor: 'transparent',
            composite: true,
            highlightLineColor: 'rgba(0,0,0,.1)',
            highlightSpotColor: 'rgba(0,0,0,.2)'
        });
         $("#sparkline14").sparkline([0, 23, 43, 35, 44, 45, 56, 37, 40, 45, 56, 7, 10], {
            type: 'line',
            width: '100%',
            height: '200',
            lineColor: '#fff',
            fillColor: 'transparent',
            spotColor: '#fff',
            minSpotColor: undefined,
            maxSpotColor: undefined,
            highlightSpotColor: undefined,
            highlightLineColor: undefined
        }); 
         $('#sparkline15').sparkline([5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10, 9, 4, 7], {
            type: 'bar',
            height: '200',
            barWidth: '10',
            barSpacing: '10',
            barColor: '#F14656'
        });
		$('#sparkline16').sparkline([15, 23, 55, 35, 54, 45, 66, 47, 30], {
            type: 'line',
            width: '100%',
            height: '200',
            chartRangeMax: 50,
            resize: true,
            lineColor: '#F14656',
            fillColor: 'rgba(19, 218, 254, 0.3)',
            highlightLineColor: 'rgba(0,0,0,.1)',
            highlightSpotColor: 'rgba(0,0,0,.2)',
        });
    
        $('#sparkline16').sparkline([0, 13, 10, 14, 15, 10, 18, 20, 0], {
            type: 'line',
            width: '100%',
            height: '200',
            chartRangeMax: 40,
            lineColor: '#6757c8',
            fillColor: 'rgba(97, 100, 193, 0.3)',
            composite: true,
            resize: true,
            highlightLineColor: 'rgba(0,0,0,.1)',
            highlightSpotColor: 'rgba(0,0,0,.2)',
        });
       
        $('#sparklinedash').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#13aeb0'
        });
         $('#sparklinedash2').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#6757c8'
        });
          $('#sparklinedash3').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#03a9f3'
        });
           $('#sparklinedash4').sparkline([ 0, 5, 6, 10, 9, 12, 4, 9], {
            type: 'bar',
            height: '30',
            barWidth: '4',
            resize: true,
            barSpacing: '5',
            barColor: '#f62d51'
        });
        
   
   }
    var sparkResize;
 
        $(window).resize(function(e) {
            clearTimeout(sparkResize);
            sparkResize = setTimeout(sparklineLogin, 500);
        });
        sparklineLogin();

});