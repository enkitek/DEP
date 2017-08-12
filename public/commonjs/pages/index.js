/**
 * Created by 19705 on 2017/7/21.
 */

// ---------------------------------
// 1. Total leads
// ---------------------------------
$(function () {
    Highcharts.chart('leads', {
        chart: {
            type: 'spline',
            width: null,
            height: 60,
            spacingBottom: -1,
            spacingTop: -10,
            spacingLeft: 0,
            spacingRight: 0,
            backgroundColor: chart_bg,
        },
        plotOptions: {
            spline: {
                lineWidth: 2,
                states: {
                    hover: {
                        lineWidth: 3
                    }
                },
                marker: {
                    enabled: false
                },
                pointInterval: 1
            }
        },
        title: {
            text: null
        },
        subtitle: {
            text: null
        },
        xAxis: {
            labels: {enabled:false},
            lineWidth: 1,
            tickLength: 1,
            gridLineWidth: 0,
            categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {enabled:false},
            gridLineWidth: 0
        },
        legend: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
            enabled:true
        },
        series: [{
            name: 'PUE',
            showSymbol: false,
            color: chart_data_color_option1,
            data: [1.61,1.60,1.59,1.59,1.60,1.61,1.62,1.59,1.59,1.60,1.60,1.61]
        }]
    });
});

var chart = new Highcharts.Chart('containerPUE', {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'PUE',
        x: -20
    },

    xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis: {

        gridLineColor: 'rgba(255, 255, 255, 0.1)',
        title: {
            text: ''
        },
        plotLines:[{
            color:'yellow',           //线的颜色，定义为红色
            dashStyle:'solid',     //默认值，这里定义为实线
            value:1.60,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
            width:1 ,               //标示线的宽度，2px

        }],
        lineColor: '#0fe00c'
    },
    tooltip: {
        valueSuffix: ''
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: 'PUE',
        data: [1.61,1.60,1.59,1.59,1.60,1.61,1.62,1.59,1.59,1.60,1.60,1.61

        ],
        zones: [{
            value: 1.601,
            color: '#0fe00c'
        }, {
            value: 2,
            color: 'red'
        }, {
            color: 'blue'
        }],
        showInLegend: false // 设置为 false 即为不显示在图例中
    }],
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            }
        }
    },
    credits: {
        // enabled:true,                    // 默认值，如果想去掉版权信息，设置为false即可
        text: 'www.kangneng.cn',             // 显示的文字chart.polar
        href: 'http://www.kangneng.cn',     // 链接地址

    }
});
$('#containerRL').highcharts({
    chart: {
        polar: true,
        type: 'line'
    },
    title: {
        text: '容量',
        x: 100
    },
    pane: {
        size: '90%'
    },
    xAxis: {
        categories: ['空间', '制冷量', '电力'],
        tickmarkPlacement: 'on',
        lineWidth: 0
    },
    yAxis: {

        lineWidth: 0,
        min: 0,
        max: 50000
    },
    tooltip: {
        backgroundColor: '#fff635',   // 背景颜色
        shared: true,
        pointFormatter: function() {
            return '<span style="color:'+this.series.color+'"></span> {'+
                this.series.name+'}: <b>'+this.y+'</b><br/>'
        }
    },

    series: [{
        name: '总计',
        data: [43000, 49000, 40000],
        pointPlacement: 'on'
        ,
        showInLegend: false // 设置为 false 即为不显示在图例中
    }, {
        name: '实际使用',
        data: [23000, 12000, 32000],
        pointPlacement: 'on'
        ,
        showInLegend: false // 设置为 false 即为不显示在图例中
    }],
    plotOptions: {
        line: {
            dataLabels: {
                enabled: false
            }
        }
    },
    credits: {
        // enabled:true,                    // 默认值，如果想去掉版权信息，设置为false即可
        text: 'www.kangneng.cn',             // 显示的文字chart.polar
        href: 'http://www.kangneng.cn',     // 链接地址

    }
});

var chartRLDetail = new Highcharts.Chart('containerRLDetail', {
    title: {
        text: '容量统计',
        x: -20
    },
    xAxis: {
        categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    },
    yAxis: {
        title: {
            text: '百分比(%)'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        valueSuffix: '%'
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        borderWidth: 0
    },
    series: [{
        name: '空间',
        data: [4, 8, 12, 14.5, 18.2, 21.5, 25.2, 26.5, 35.5, 42.5, 50.9, 56],
        color:"#25aca1",
        zones: [{
            value: 50,
            color: '#25aca1'
        }, {
            value: 70,
            color: '#fff635'
        }, {
            color: 'red'
        }],
    }, {
        name: '电量',
        data: [82, 36, 33, 43, 55, 56, 67, 56, 35, 66, 84, 87] ,
        color:"#6248ac",
        zones: [{
            value: 50,
            color: '#6248ac'
        }, {
            value: 70,
            color: '#fff635'
        }, {
            color: 'red'
        }]
    }, {
        name: '冷量',
        data: [46, 48, 49, 43, 49, 66, 76, 66, 56,46, 46, 54],
        color:"#ac942f",
        zones: [{
            value: 50,
            color: '#ac942f'
        }, {
            value: 70,
            color: '#fff635'
        }, {
            color: 'red'
        }]
    }],
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            }
        }
    },
    credits: {
        // enabled:true,                    // 默认值，如果想去掉版权信息，设置为false即可
        text: 'www.kangneng.cn',             // 显示的文字chart.polar
        href: 'http://www.kangneng.cn',     // 链接地址

    }
});

// ---------------------------------
// 6. Quick stats
// ---------------------------------
$('.monthly').easyPieChart({
    easing: 'easeOutBounce',
    animate: 3500,
    size:100,
    lineWidth:8,
    lineCap:'square',
    trackColor:chart_gridlines_color,
    barColor:'#c2ee97',
    onStep: function(from, to, percent) {
        $(this.el).find('.per_monthly').text(Math.round(percent));
    }
});
var chart = window.chart = $('.monthly').data('easyPieChart');

$('.yearly').easyPieChart({
    easing: 'easeOutBounce',
    animate: 3500,
    size:100,
    lineWidth:8,
    lineCap:'square',
    trackColor:chart_gridlines_color,
    barColor:'#e72020',
    onStep: function(from, to, percent) {
        $(this.el).find('.per_yearly').text(Math.round(percent));
    }
});
var chart = window.chart = $('.yearly').data('easyPieChart');

$('.total').easyPieChart({
    easing: 'easeOutBounce',
    animate: 3500,
    size:100,
    lineWidth:8,
    lineCap:'square',
    trackColor:chart_gridlines_color,
    barColor:'#c2ee97',
    onStep: function(from, to, percent) {
        $(this.el).find('.per_total').text(Math.round(percent));
    }
});
var chart = window.chart = $('.total').data('easyPieChart');





