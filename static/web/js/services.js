var angular = require('angular');
var moment = require('moment');
var tinycolor = require('tinycolor2');

angular.module('windmobile.services', [])
    .factory('utils', ['$translate', function ($translate) {
        return {
            getStationStatus: function (station) {
                // status: 0=red, 1=orange, 2=green
                var stationValue;
                if (station.status === 'green') {
                    stationValue = 2;
                } else {
                    if (station.status === 'orange') {
                        stationValue = 1;
                    } else {
                        stationValue = 0;
                    }
                }

                var lastValue;
                if (station.last) {
                    var last = moment.unix(station.last._id);
                    if (last.isBefore(moment().subtract(2, 'hours'))) {
                        lastValue = 0;
                    } else if (last.isBefore(moment().subtract(1, 'hours'))) {
                        lastValue = 1;
                    } else if (last.isAfter(moment().add(5, 'minutes'))) {
                        lastValue = 0;
                    } else {
                        lastValue = 2;
                    }
                } else {
                    lastValue = 0;
                }
                return Math.min(stationValue, lastValue);
            },

            getStatusClass: function (status) {
                // status: 0=red, 1=orange, 2=green
                if (status === 0) {
                    return 'wdm-status-red';
                }
                if (status === 1) {
                    return 'wdm-status-orange';
                }
            },

            getColorInRange: function (value, max) {
                if (value == -1) {
                    return '#808080';
                }
                var hueStart = 90;

                var hue = hueStart + (value / max) * (360 - hueStart);
                if (hue > 360) {
                    hue = 360;
                }
                return tinycolor.fromRatio({h: hue, s: 1, v: 0.7}).toHexString();
            },

            getWindDirectionLabel: function (labels, direction) {
                var sectors = 360 / labels.length;
                var angle = 0;
                for (var i = 0; i < labels.length; i++) {
                    var min = angle - sectors / 2;
                    var max = angle + sectors / 2;

                    if (i == 0) {
                        // Looking for the north "half sector" from 337.5 to 360
                        if ((direction >= 360 + min) && (direction <= 360)) {
                            return $translate.instant(labels[0]);
                        }
                    }
                    if ((direction >= min) && (direction < max)) {
                        return  $translate.instant(labels[i]);
                    }
                    angle += sectors;
                }
            },

            getTenant: function (hostname) {
                var domains = hostname.split('.');
                if (domains.length === 3) {
                    return domains[0];
                }
                // Special case for localhost
                if ((domains.length === 2) && (domains[1] === "localhost" )) {
                    return domains[0];
                }
            },

            inIframe: function () {
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return true;
                }
            },

            roundTo3Digits: function (num) {
                return +(Math.round(num + "e+3") + "e-3");
            },

            apiUrl: "https://winds.mobi/api/2.1",
            apiUserUrl: "https://winds.mobi/user"
        }
    }])
    .factory('visibilityBroadcaster', ['$rootScope', '$document', function ($rootScope, $document) {
        var document = $document[0];
        var detectedFeature;

        var features = {
            standard: {
                eventName: 'visibilitychange',
                propertyName: 'hidden'
            },
            moz: {
                eventName: 'mozvisibilitychange',
                propertyName: 'mozHidden'
            },
            ms: {
                eventName: 'msvisibilitychange',
                propertyName: 'msHidden'
            },
            webkit: {
                eventName: 'webkitvisibilitychange',
                propertyName: 'webkitHidden'
            }
        };

        isBoolean = function (obj) {
            return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
        };

        Object.keys(features).some(function (feature) {
            if (isBoolean(document[features[feature].propertyName])) {
                detectedFeature = features[feature];
                return true;
            }
        });

        if (detectedFeature) {
            $document.on(detectedFeature.eventName, function () {
                $rootScope.$broadcast('visibilityChange',
                    document[detectedFeature.propertyName]);
            });
        }

        return {
            supported: !!detectedFeature
        }
    }]);
