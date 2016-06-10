// $(function(){
//     function initRickshaw(){
//         "use strict";

//         var seriesData = [ [], [],[] ];
//         var random = new Rickshaw.Fixtures.RandomData(30);

//         for (var i = 0; i < 30; i++) {
//             random.addData(seriesData);
//         }

//         var graph = new Rickshaw.Graph( {
//             element: document.getElementById("rickshaw"),
//             height: 130,
//             renderer: 'area',
//             series: [
//                 {
//                     color: '#96E593',
//                     data: seriesData[0],
//                     name: '온도'
//                 }, {
//                     color: '#60B756',
//                     data: seriesData[1],
//                     name: '황화수소 농도'
//                 },{
//                     color: '#ecfaec',
//                     data: seriesData[2],
//                     name: '산소 농도'
//                 }
//             ]
//         } );

//         function onResize(){
//             var $chart = $('#rickshaw');
//             graph.configure({
//                 width: $chart.width(),
//                 height: 130
//             });
//             graph.render();

//             $chart.find('svg').css({height: '130px'});
//         }

//         SingApp.onResize(onResize);
//         onResize();


//         var hoverDetail = new Rickshaw.Graph.HoverDetail( {
//             graph: graph,
//             xFormatter: function(x) {
//                 return new Date(x * 1000).toString();
//             }
//         } );

//         // setInterval( function() {
//         //     random.removeData(seriesData);
//         //     random.addData(seriesData);
//         //     graph.update();

//         // }, 1000 );
//     }
//     function pageLoad(){
//         $('.widget').widgster();
//         $('.sparkline').each(function(){
//             $(this).sparkline('html', $(this).data());
//         });

    
//         initRickshaw();
//     }
//     pageLoad();
//     SingApp.onPageLoad(pageLoad);
// });