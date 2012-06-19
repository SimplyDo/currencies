'use strict';

/* Services */


//This Service provides game objects
var servicesModule = angular.module('myApp.services', ['ngResource']);



servicesModule.factory('openExchangeRates', function($resource){
  return $resource('http://openexchangerates.org/:path', {callback:'JSON_CALLBACK'}, {
    getRates: {method:'JSONP', params:{path:'latest.json'}},
    getLegend: {method:'JSONP', params:{path:'currencies.json'}}
  });
});











