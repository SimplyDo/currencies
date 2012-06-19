'use strict';

/* Controllers */


function currencyCrtl($scope,$http) {
  $scope.testing = "hello!";
  $scope.ratesURL = 'http://openexchangerates.org/latest.json?callback=JSON_CALLBACK&name=rates&rand='+Math.random()*1000;
  $scope.currencyLabelsURL = 'http://openexchangerates.org/currencies.json?callback=JSON_CALLBACK&name=legend';
  $scope.balances =  new Array;
  $scope.currentTimeStamp = new Date().getTime();

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

  $scope.addBalance = function() {
    var newEmptyBalance = {exchangeRate:'', amount:''};
    $scope.balances.push(newEmptyBalance);
  }

  $scope.removeBalance = function(index) {
    $scope.balances.splice(index,1);
  }

  $scope.getCurrencyName = function(symbol) {
    return $scope.currencyLegend[symbol];
  }

  $scope.getCurrencyNameFull= function(symbol) {
    return $scope.currencyLegend[symbol]+' ('+symbol+')';
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

  $scope.ageOfExchangeRate = function() {

    var currentTimeStamp = new Date().getTime();

    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    var ageOfExchangeRate =  currentTimeStamp - $scope.exchangeRates.timestamp*1000;

    var minutes = Math.round(ageOfExchangeRate / 1000 / 60);

    // will display time in 10:30:23 format
    var formattedTime = minutes + ' minutes';

    return formattedTime;
    
  }


  $scope.fetch();

  $scope.addBalance();
  $scope.addBalance();


}