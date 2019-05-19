global.jQuery = global.$ = require('jquery');
require('material-design-lite/material');
// Using boostrap for modals and tabs only
require('bootstrap-sass/assets/javascripts/bootstrap/modal');
require('bootstrap-sass/assets/javascripts/bootstrap/tab');

var angular = require('angular');
var Snap = require('snapsvg');
var moment = require('moment');
require('browsernizr/test/touchevents');
var Modernizr = require('browsernizr');
require('moment/locale/fr.js');
require('moment/locale/de.js');

angular.module('windmobile', [require('angular-sanitize'), require('angular-ui-router'), require('angular-translate'), require('oclazyload'),
    'windmobile.services', 'windmobile.controllers'])
    .constant('appConfig', {
        url_absolute: 'https://winds.mobi'
    })
    .config(['$ocLazyLoadProvider', '$translateProvider', '$locationProvider', '$stateProvider', '$urlRouterProvider',
        function ($ocLazyLoadProvider, $translateProvider, $locationProvider, $stateProvider, $urlRouterProvider) {
            $ocLazyLoadProvider.config({
                events: true
            });

            $translateProvider
                .useSanitizeValueStrategy('escape')
                .translations('en', require('../locale/en.js'))
                .translations('fr', require('../locale/fr.js'))
                .translations('de', require('../locale/de.js'))
                .registerAvailableLanguageKeys(['en', 'fr', 'de'], {
                    'en_*': 'en',
                    'fr_*': 'fr',
                    'de_*': 'de'
                })
                .fallbackLanguage('en')
                .determinePreferredLanguage();
            moment.locale($translateProvider.preferredLanguage());

            $locationProvider.html5Mode(true);
            $stateProvider
                .state('app', {
                    controller: 'AppController as $app',
                    templateUrl: '/static/web/templates/app.html'
                })
                .state('map', {
                    parent: 'app',
                    url: '/map',
                    params: {
                        lat: null,
                        lon: null,
                        zoom: null
                    },
                    resolve: {
                        lat: ['$stateParams', function ($stateParams) {
                            return $stateParams.lat;
                        }],
                        lon: ['$stateParams', function ($stateParams) {
                            return $stateParams.lon;
                        }],
                        zoom: ['$stateParams', function ($stateParams) {
                            return $stateParams.zoom;
                        }]
                    },
                    templateUrl: '/static/web/templates/map.html',
                    controller: 'MapController as main'
                })
                .state('map.detail', {
                    url: '/:stationId',
                    views: {
                        'detailView': {
                            templateUrl: '/static/web/templates/detail.html',
                            controller: 'DetailController as detail'
                        }
                    },
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('/static/web/lib/highstock.js');
                        }]
                    }
                })
                .state('list', {
                    parent: 'app',
                    url: '/list',
                    params: {
                        lat: null,
                        lon: null
                    },
                    resolve: {
                        lat: ['$stateParams', function ($stateParams) {
                            return $stateParams.lat;
                        }],
                        lon: ['$stateParams', function ($stateParams) {
                            return $stateParams.lon;
                        }]
                    },
                    templateUrl: '/static/web/templates/list.html',
                    controller: 'ListController as main'
                })
                .state('list.detail', {
                    url: '/:stationId',
                    views: {
                        'detailView': {
                            templateUrl: '/static/web/templates/detail.html',
                            controller: 'DetailController as detail'
                        }
                    },
                    resolve: {
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load('/static/web/lib/highstock.js');
                        }]
                    }
                })
                .state('social-login', {
                    url: '/social-login',
                    templateUrl: '/static/web/templates/social-login.html',
                    controller: 'SocialLoginController as $ctrl'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: '/static/web/templates/login.html',
                    controller: 'LoginController as $ctrl'
                })
                .state('help', {
                    parent: 'app',
                    url: '/help',
                    templateUrl: '/static/web/templates/help.html',
                    controller: 'HelpController as $ctrl'
                });
            if (Modernizr.touchevents) {
                $urlRouterProvider.otherwise('/list');
            } else {
                $urlRouterProvider.otherwise('/list');
            }
        }])
    .run(['$rootScope', '$state', '$location', '$window', '$interval', '$timeout', '$translate', 'utils', 'visibilityBroadcaster',
        function ($rootScope, $state, $location, $window, $interval, $timeout, $translate, utils) {
        var self = this;

        $rootScope.$on('ocLazyLoad.fileLoaded', function (event, file) {
            var lang;
            switch ($translate.use()) {
                case 'fr':
                    lang = {
                        weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
                        shortMonths: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jui', 'Aoû', 'Sep', 'Oct', 'Nov',
                            'Déc'],
                        resetZoom: 'Réinitialiser'
                    };
                    break;
                case 'de':
                    lang = {
                        weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                        shortMonths: ['Jan ', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
                            'Dez'],
                        resetZoom: 'Zurücksetzen'
                    };
                    break;
                default:
                    lang = {
                        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                        shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov',
                            'Dec'],
                        resetZoom: 'Reset'
                    };
            }
            Highcharts.setOptions({
                lang: lang,
                global: {
                    useUTC: false
                },
                chart: {
                    backgroundColor: null,
                    resetZoomButton: {
                        position: {
                            x: -7,
                            y: 7
                        },
                        relativeTo: 'chart',
                        theme: {
                            fill: 'transparent',
                            style: {color: '#8d8d8d'},
                            stroke: '#8d8d8d',
                            states: {
                                hover: {
                                    fill: 'transparent',
                                    style: {color: '#ddd'},
                                    stroke: '#ddd'
                                }
                            }
                        }
                    }
                },
                plotOptions: {
                    series: {
                        animation: false,
                        states: {
                            hover: {
                                enabled: false
                            }
                        }
                    }
                },
                legend: {
                    enabled: false
                },
                navigator: {
                    enabled: false
                },
                scrollbar: {
                    enabled: false
                },
                rangeSelector: {
                    inputEnabled: false,
                    buttons: [
                        {type: 'day', count: 5, text: '5d'},
                        {type: 'day', count: 2, text: '2d'},
                        {type: 'day', count: 1, text: '1d'},
                        {type: 'hour', count: 12, text: '12h'},
                        {type: 'hour', count: 6, text: '6h'}
                    ],
                    selected: 4,
                    buttonTheme: {
                        width: 28,
                        fill: 'transparent',
                        style: {color: '#8d8d8d'},
                        states: {
                            hover: {
                                fill: 'transparent',
                                style: {color: '#ddd'}
                            },
                            select: {
                                fill: 'transparent',
                                style: {color: '#ddd'}
                            },
                            disabled: {
                                fill: 'transparent',
                                style: {color: '#666'}
                            }
                        }
                    }
                },
                loading: {
                    labelStyle: {color: 'white'},
                    style: {backgroundColor: 'transparent'}
                }
            });
        });
        $rootScope.$on('visibilityChange', function(event, isHidden) {
            self.isHidden = isHidden;
        });
        $interval(function () {
            if (!self.isHidden) {
                $rootScope.$broadcast('onFromNowInterval');
            }
        }, 30000);
        $interval(function () {
            if (!self.isHidden) {
                $rootScope.$broadcast('onRefreshInterval');
            }
        }, 120000);
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
            if (utils.inIframe()) {
                // Custom behavior in iframe to decrease the number of google map displays
                if (toState.name === 'map' && !fromState.parent) {
                    console.log('You are in a iframe: refusing to load /map on page load');
                    event.preventDefault();
                    $state.go('list', toParams);
                }
            }
        });
        $rootScope.$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                if ($window.ga) {
                    $window.ga('send', 'pageview', {page: $location.path()});
                }
                $rootScope.controller = toState.name.split('.')[0];
            });
        // https://stackoverflow.com/questions/31278781/material-design-lite-integration-with-angularjs
        // https://getmdl.io/started/#dynamic
        $rootScope.$on('$viewContentLoaded', function () {
            componentHandler.upgradeAllRegistered();
            // $timeout(function () {
            //     componentHandler.upgradeAllRegistered();
            // }, 0);
        });
        $rootScope.$on('$includeContentLoaded', function () {
            $timeout(function () {
                componentHandler.upgradeAllRegistered();
            }, 0);
        });
    }])
    .directive('wdmWindMiniChart', function () {
        return {
            restrict: "C",
            link: function (scope, element, attrs) {
                var width = 100;
                var height = 40;
                var paper = Snap(element[0]);

                scope.$watch(element.attr('data-scope-watch'), function (newValue, oldValue) {
                    element.find(".wdm-minichart").remove();
                    if (newValue && newValue.data) {
                        var values = newValue.data;

                        var windKeys = [],
                            windValues = [];
                        for (var i = values.length - 1; i >= 0; i--) {
                            windKeys.push(values[i]['_id']);
                            windValues.push(values[i]['w-avg']);
                        }
                        var minX = Math.min.apply(null, windKeys),
                            maxX = Math.max.apply(null, windKeys),
                            minY = Math.min.apply(null, windValues),
                            maxY = Math.max.apply(null, windValues);
                        if (!minX || !maxX) {
                            return;
                        }
                        var scaleX = width / (maxX - minX);
                        var offsetY;
                        if (minY === 0) {
                            offsetY = 0;
                        } else {
                            offsetY = 10;
                        }
                        var scaleY = (height - offsetY) / (maxY - minY);
                        if (!isFinite(scaleY)) {
                            scaleY = 1;
                        }

                        var points = [0, height];
                        for (var i = 0; i < windKeys.length - 1; i++) {
                            var x1 = (windKeys[i] - minX) * scaleX,
                                y1 = height - offsetY - (windValues[i] - minY) * scaleY,
                                x2 = (windKeys[i + 1] - minX) * scaleX,
                                y2 = height - offsetY - (windValues[i + 1] - minY) * scaleY;

                            points.push(x1, y1, x2, y2);
                        }
                        points.push(width, height);

                        var polygon = paper.polygon(points);
                        polygon.attr({
                            class: 'wdm-minichart',
                            fill: '#333'
                        });

                        // Remove first and last point
                        points.splice(0, 2);
                        points.splice(-2, 2);

                        var polyline = paper.polyline(points);
                        polyline.attr({
                            class: 'wdm-minichart wdm-minichart-line',
                            fill: 'none'
                        });
                    }
                });
            }
        };
    })
    .directive('wdmWindDirChart', ['$translate', function ($translate) {
        return {
            restrict: "C",
            link: function (scope, element, attrs) {
                var width = 100;
                var height = 100;
                var radius = Math.min(width, height) / 2;
                var fontSize = 9;


                var paper = Snap(element[0]);
                var circleRadius = radius - 1;
                var circle = paper.circle(width / 2, height / 2, circleRadius);
                circle.attr({
                    stroke: "#8D8D8D",
                    strokeWidth: 1
                });

                var labels = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
                var labelRadius = radius - fontSize / 2 - 6;
                var angle = 0;
                for (var i = 0; i < labels.length; i++) {
                    var angleRadian = (angle + 90) * (Math.PI / 180);
                    var x = width / 2 - Math.cos(angleRadian) * labelRadius;
                    var y = height / 2 - Math.sin(angleRadian) * labelRadius;

                    var text = paper.text(x, y, $translate.instant(labels[i]));
                    text = text.attr({
                        fill: "#8D8D8D",
                        'font-size': fontSize,
                        'alignment-baseline': 'inherit'

                    });
                    angle += 45;
                }

                scope.$watch(element.attr('data-scope-watch'), function (newValue, oldValue) {
                    element.find(".wdm-direction").remove();
                    if (newValue && newValue.data) {
                        var values = newValue.data;

                        // The center
                        var lastX = width / 2;
                        var lastY = width / 2;

                        var currentRadius = 0.0;
                        for (var i = values.length - 1; i >= 0; i--) {
                            var direction = values[i]['w-dir'];

                            currentRadius += circleRadius / values.length;
                            var directionRadian = (direction + 90) * (Math.PI / 180);

                            var x = width / 2 - Math.cos(directionRadian) * currentRadius;
                            var y = height / 2 - Math.sin(directionRadian) * currentRadius;

                            var line = paper.line(lastX, lastY, x, y);
                            line.attr({
                                class: 'wdm-direction-line'
                            });

                            lastX = x;
                            lastY = y;
                        }
                    }
                });
            }
        }
    }])
    .directive('wdmWindChart', ['$translate', 'utils', function ($translate, utils) {
        return {
            restrict: "C",
            link: function (scope, element, attrs) {
                var windAvgSerie = {
                    id: 'windAvgSerie',
                    type: 'areaspline',
                    lineColor: '#b4b400',
                    lineWidth: 1.5,
                    color: '#333',
                    marker: {
                        enabled: false
                    }
                };
                var windDir = {};
                var windMaxSerie = {
                    id: 'windMaxSerie',
                    type: 'spline',
                    color: '#b4b400',
                    lineWidth: 1.5,
                    marker: {
                        enabled: false
                    },
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            // Display a label only if this current point is the highest value of its neighbors
                            for (var i = 0; i < this.series.xData.length; i++) {
                                if (this.series.xData[i] === this.x) {
                                    var index = i;
                                    break;
                                }
                            }
                            if (!index) {
                                return null;
                            }

                            var isPeak = function (values) {
                                try {
                                    var middleIndex = Math.floor(values.length / 2);
                                    var middleValue = values[middleIndex];
                                    var maxIndex = 0, maxValue = 0;

                                    for (var i = 0; i < values.length; i++) {
                                        var currentValue = values[i];
                                        if (currentValue > middleValue) {
                                            return false;
                                        }

                                        // Mark the 1st value only if the vector contains a "flat"
                                        if (currentValue > maxValue) {
                                            maxValue = currentValue;
                                            maxIndex = i;
                                        }
                                    }
                                    return (maxIndex === middleIndex);
                                }
                                catch (e) {
                                    return false;
                                }
                            };

                            var peakVectorSize = Math.max(
                                // Round to the near odd number
                                Math.round((this.series.xData.length / 100 /* max labels */) / 2) * 2 - 1,
                                3);
                            var begin = index - ((peakVectorSize - 1) / 2);
                            var end = index + ((peakVectorSize - 1) / 2) + 1;
                            if (!isPeak(this.series.yData.slice(begin, end))) {
                                return null;
                            }

                            return utils.getWindDirectionLabel(
                                ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
                                windDir[this.x]
                            );
                        },
                        style: {
                            color: '#888',
                            textOutline: null
                        }
                    }
                };
                var windUnit = $translate.instant('km/h');
                var chart = Highcharts.stockChart(element[0], {
                    tooltip: {
                        followTouchMove: false,
                        shared: true,
                        backgroundColor: 'rgba(21,21,21,0.9)',
                        borderColor: '#888',
                        borderRadius: 10,
                        borderWidth: 1.5,
                        style: {
                            fontSize: '13px',
                            color: '#999'
                        },
                        formatter: function () {
                            var content = Highcharts.dateFormat('%e %b %H:%M', this.x) + '<br/>';
                            var dir = windDir[this.x];
                            if (dir != null) {
                                var directionLabel = utils.getWindDirectionLabel(
                                    ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'],
                                    windDir[this.x]
                                );
                                content += directionLabel + ' (' + windDir[this.x] + '°)<br/>';
                            }
                            content += Highcharts.format('{y:.1f} ', {y: this.points[0].y}) + windUnit + '<br/>';
                            content += Highcharts.format('{y:.1f} ', {y: this.points[1].y}) + windUnit + '<br/>';
                            return content;
                        },
                        hideDelay: 0
                    },
                    xAxis: {
                        type: 'datetime',
                        lineColor: '#666',
                        tickColor: '#666',
                        gridLineWidth: 0.5,
                        gridLineColor: '#666',
                        dateTimeLabelFormats: {
                            minute: '%H:%M<br\>%a',
                            hour: '%H:%M<br\>%a',
                            day: '%e %b'
                        },
                        crosshair: {
                            color: '#888',
                            zIndex: 3
                        },
                        events: {
                            setExtremes: function (e) {
                                if (typeof(e.trigger) == 'undefined') {
                                    // setExtremes() event
                                    return;
                                }
                                if (e.trigger === 'zoom' && typeof(e.min) == 'undefined' && typeof(e.max) == 'undefined') {
                                    var min = this.dataMax - 6 * 60 * 60 * 1000;
                                    var max = this.dataMax;
                                    setTimeout(function () {
                                        chart.xAxis[0].setExtremes(min, max);
                                    }, 1);
                                } else if (e.trigger != 'rangeSelectorButton') {
                                    if (!chart.resetZoomButton) {
                                        chart.showResetZoom();
                                    } else {
                                        chart.resetZoomButton.show();
                                    }
                                } else {
                                    if (chart.resetZoomButton) {
                                        chart.resetZoomButton.hide();
                                    }
                                }
                            }
                        }
                    },
                    yAxis: {
                        opposite: false,
                        gridLineWidth: 0.5,
                        gridLineColor: '#555',
                        labels: {
                            format: '{value} km/h',
                            style: {color: "#7d7d00", fontSize: '9px'}
                        },
                        minRange: 10,
                        floor: 0
                    },
                    series: [windMaxSerie, windAvgSerie]
                });
                chart.showLoading();

                scope.$watch(element.attr('data-scope-watch'), function (value) {
                    if (value) {
                        chart.hideLoading();
                        var windAvgData = [], windMaxData = [];
                        for (var i = value.length - 1; i >= 0; i--) {
                            var date = value[i]['_id'] * 1000;

                            windAvgData.push([date, value[i]['w-avg']]);
                            windMaxData.push([date, value[i]['w-max']]);
                            windDir[date] = value[i]['w-dir'];
                        }
                        chart.get('windAvgSerie').setData(windAvgData, false);
                        chart.get('windMaxSerie').setData(windMaxData, false);
                        chart.redraw(false);
                    }
                });
            }
        }
    }])
    .directive('wdmAirChart', ['$translate', function ($translate) {
        return {
            restrict: "C",
            link: function (scope, element, attrs) {
                var rainSerie = {
                    id: 'rainSerie',
                    type: 'column',
                    borderColor: '#444',
                    borderWidth: 0.5,
                    color: '#333',
                    marker: {
                        enabled: false
                    },
                    zIndex: 0
                };
                var temperatureSerie = {
                    id: 'temperatureSerie',
                    type: 'spline',
                    color: '#cd1717',
                    lineWidth: 1.5,
                    marker: {
                        enabled: false
                    },
                    yAxis: 'temperatureY',
                    zIndex: 2
                };
                var humiditySerie = {
                    id: 'humiditySerie',
                    type: 'spline',
                    color: '#1989c6',
                    lineWidth: 1.5,
                    marker: {
                        enabled: false
                    },
                    yAxis: 'humidityY',
                    zIndex: 1
                };
                var temperatureUnit = $translate.instant('°C');
                var humidityUnit = $translate.instant('% rel');
                var rainUnit = $translate.instant('l/m²');
                var chart = Highcharts.stockChart(element[0], {
                    tooltip: {
                        followTouchMove: false,
                        shared: true,
                        backgroundColor: 'rgba(21,21,21,0.9)',
                        borderColor: '#888',
                        borderRadius: 10,
                        borderWidth: 1.5,
                        style: {
                            fontSize: '13px',
                            color: '#999'
                        },
                        formatter: function () {
                            var content = Highcharts.dateFormat('%e %b %H:%M', this.x) + '<br/>';
                            if (this.points[0] != null) {
                                content += Highcharts.format('{y:.1f} ', {y: this.points[0].y}) + temperatureUnit + '<br/>';
                            }
                            if (this.points[1] != null) {
                                content += Highcharts.format('{y:.1f} ', {y: this.points[1].y}) + humidityUnit + '<br/>';
                            }
                            if (this.points[2] != null) {
                                content += Highcharts.format('{y:.1f} ', {y: this.points[2].y}) + rainUnit + '<br/>';
                            }
                            return content;
                        },
                        hideDelay: 0
                    },
                    xAxis: {
                        type: 'datetime',
                        lineColor: '#666',
                        tickColor: '#666',
                        gridLineWidth: 0.5,
                        gridLineColor: '#666',
                        dateTimeLabelFormats: {
                            minute: '%H:%M<br\>%a',
                            hour: '%H:%M<br\>%a',
                            day: '%e %b'
                        },
                        crosshair: {
                            color: '#888',
                            zIndex: 3
                        },
                        events: {
                            setExtremes: function (e) {
                                if (typeof(e.trigger) == 'undefined') {
                                    // setExtremes() event
                                    return;
                                }
                                if (e.trigger === 'zoom' && typeof(e.min) == 'undefined' && typeof(e.max) == 'undefined') {
                                    var min = this.dataMax - 6 * 60 * 60 * 1000;
                                    var max = this.dataMax;
                                    setTimeout(function () {
                                        chart.xAxis[0].setExtremes(min, max);
                                    }, 1);
                                } else if (e.trigger != 'rangeSelectorButton') {
                                    if (!chart.resetZoomButton) {
                                        chart.showResetZoom();
                                    } else {
                                        chart.resetZoomButton.show();
                                    }
                                } else {
                                    if (chart.resetZoomButton) {
                                        chart.resetZoomButton.hide();
                                    }
                                }
                            }
                        }
                    },
                    yAxis: [{
                        id: 'temperatureY',
                        opposite: false,
                        gridLineWidth: 0.5,
                        gridLineColor: "#555",
                        labels: {
                            format: '{value} °C',
                            style: {color: "#c72d46", fontSize: '9px'}
                        }
                    }, {
                        id: 'humidityY',
                        gridLineWidth: 0,
                        labels: {
                            format: '{value} %',
                            style: {color: "#3b71a0", fontSize: '9px'}
                        }
                    }],
                    series: [temperatureSerie, humiditySerie, rainSerie]
                });
                chart.showLoading();

                scope.$watch(element.attr('data-scope-watch'), function (value) {
                    if (value) {
                        chart.hideLoading();
                        var rainData = [], temperatureData = [], humidityData = [];
                        for (var i = value.length - 1; i >= 0; i--) {
                            var date = value[i]['_id'] * 1000;

                            rainData.push([date, value[i]['rain']]);
                            temperatureData.push([date, value[i]['temp']]);
                            humidityData.push([date, value[i]['hum']]);
                        }
                        chart.get('rainSerie').setData(rainData, false);
                        chart.get('temperatureSerie').setData(temperatureData, false);
                        chart.get('humiditySerie').setData(humidityData, false);
                        chart.redraw(false);
                    }
                });
            }
        }
    }]);
