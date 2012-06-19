'use strict';

/* Controllers */


function currencyCrtl($scope,$http) {
  $scope.testing = "hello!";
  $scope.ratesURL = 'http://openexchangerates.org/latest.json?callback=JSON_CALLBACK&name=Super%20Hero';
  $scope.currencyLabelsURL = 'http:openexchangerates.org/currencies.json?callback=JSON_CALLBACK&name=Super%20Hero';
  $scope.balances =  new Array;

  $scope.addBalance = function() {
    var newEmptyBalance = {exchangeRate:'', amount:0};
    $scope.balances.push(newEmptyBalance);
  }

  $scope.removeBalance = function(index) {
    $scope.balances.splice(index,1);
  }

  $scope.getCurrencyName = function(symbol) {
    // long name is not looked up yet (but loaded from remote source as $scope.currencyLegend)
    return $scope.returnLabel(symbol);
  }

  $scope.totalBalance = function() {

    var total = 0;

    for (var m = 0; m < $scope.balances.length; m++) {
      var value = $scope.convertToNumber($scope.balances[m].amount);
      var exchangeRate = $scope.balances[m].exchangeRate;
      if (value != 0 && exchangeRate != '') {
        //total = total + value;
        total = total + $scope.convertCurrencyValueToBaseValue(value,exchangeRate);
      }
    }
    
    return total;
  }

  $scope.returnLabel = function(currencyCode) {
    return currencyCode;
  }

 
  $scope.fetch = function() {
 
    $http({method: 'JSONP', url: $scope.ratesURL}).
      success(function(data, status) {
        $scope.exchangeRates = data;
      }).
      error(function(data, status) {
        $scope.exchangeRates = data || "Request failed";
    });

    $http({method: 'JSONP', url: $scope.currencyLabelsURL}).
      success(function(data, status) {
        $scope.currencyLegend = data;
      }).
      error(function(data, status) {
        $scope.currencyLegend = data || "Request failed";
    });

  };



  $scope.convertToNumber = function(value) {
    
    var floatNumber = parseFloat(value);

    if (floatNumber) {

      return floatNumber;

    } else {

      return 0;

    }

  }

  $scope.roundDown = function(number) {
    
    return Math.round(number*100)/100;
    //return Math.round(number);

  }

  $scope.convertCurrencyValueToBaseValue = function(currencyValue,exchangeRate) {

    var baseValue = currencyValue / exchangeRate;
    return baseValue;

  }

  $scope.convertBaseValueToCurrencyValue = function(baseValue,exchangeRate) {
    // not in use yet
    var currencyValue = baseValue * exchangeRate;
    return currencyValue;
  }


  $scope.fetch();


}