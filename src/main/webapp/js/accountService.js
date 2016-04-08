;(function() {
	'use strict';
	
    var app = angular.module("accountService", []);
    app.factory('accountInfo', accountInfo);

    /* @ngInject */
    function accountInfo($http) {
      return {
    	  getAccountInfo: getAccountInfo
      }

      function getAccountInfo(customerKey) {
    	  var req = {
    			  method: 'GET',
    			  url: 'http://apilink-qa.pnc.com//hackathon/qa/retail/accountBalances/v1/getAccountBalances?customerKey=' + customerKey
    	  };
    	  return $http(req);
      }
    }
})();