;(function() {
	'use strict';
	
    var app = angular.module("ethereum-service", []);
    app.service('ethereum', ethereum);

    /* @ngInject */
    function ethereum() {
      var service = {
        web3: new Web3(),
        isConnected: isConnected
      };

      activate();

      return service;

      ///////////////////

      function activate() {
//    	  if(typeof service.web3 !== 'undefined') {
//    		  service.web3 = new Web3(service.web3.currentProvider);
//    	  } else {
    		  // set the provider you want from Web3.providers
    		  service.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//    	  }
      }

      function isConnected() {
        return service.web3.isConnected();
      }
    }
})();