;(function() {
	var app = angular.module("app", ['ethereum-service']);
	
	app.controller("AppController", AppController);
	
	function AppController($scope, ethereum) {
		$scope.users = ["Blake", "Connor", "Jon", "Afif"];
		$scope.web3 = ethereum.web3;
	    var vm = this;
	    activate();

	    ///////////////////

	    function activate() {
	    	vm.isConnected = ethereum.isConnected(); // Not using 2-way binding because for some reason it was DESTROYING performance. I'd like to look into this more later.
	    	if(!vm.isConnected) { 
	    		return; 
	    	}

	    	$scope.accounts = ethereum.web3.eth.accounts;
	    	$scope.selectedAccount = ethereum.web3.eth.defaultAccount;
	    	if(!$scope.selectedAccount) {
	    		$scope.selectedAccount = ethereum.web3.eth.coinbase;
	    	}
	    	onAccountChanged();
	    }
	    
	    function getAccountBalance(account) {
	        return ethereum.web3.fromWei(ethereum.web3.eth.getBalance(account), 'ether');
	    }

	    function onAccountChanged() {
	    	return;
	    }
	}
})();