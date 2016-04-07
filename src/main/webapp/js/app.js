;(function() {
	var app = angular.module("app", ['ethereum-service', 'accountService']);
	
	app.controller("AppController", AppController);
	
	function AppController($scope, ethereum, accountInfo) {
		$scope.users = ["Blake", "Connor", "Jon", "Afif"];
		$scope.web3 = ethereum.web3;
		$scope.selectAccount = selectAccount;
	    var vm = this;
	    activate();

	    ///////////////////

	    function activate() {
	    	vm.isConnected = ethereum.isConnected(); // Not using 2-way binding because for some reason it was DESTROYING performance. I'd like to look into this more later.
	    	if(!vm.isConnected) { 
	    		return; 
	    	}

	    	$scope.addresses = ethereum.web3.eth.accounts;
	    	$scope.accounts = [];
	    	for(var i = 0; i < $scope.addresses.length; i++) {
	    		var account = {};
	    		account.address = $scope.addresses[i];
	    		var balance = "";
	    		var e = getAccountBalance(account.address);
	    		if(e.c) {
	    			for(var j = 0; j < e.c.length; j++) {
	    				balance += e.c[j];
	    				if(j == 0 && e.c.length > 1) {
	    					balance += ".";
	    				}
	    			}
	    		}
	    		account.balance = balance;
		    	account.selected = ethereum.web3.eth.coinbase == account.address ? true : false;
		    	if(account.selected) {
		    		$scope.transactionFrom = account.address;
		    	}
		    	$scope.accounts.push(account);
	    	}
	    	onAccountChanged();
	    }
	    
	    function selectAccount(account) {
	    	for(var acc in $scope.accounts) {
	    		if($scope.accounts[acc].selected && $scope.accounts[acc].address != account.address) {
	    			$scope.accounts[acc].selected = false;
	    		} else if($scope.accounts[acc].address == account.address) {
	    			$scope.accounts[acc].selected = true;
	    			$scope.transactionFrom = account.address;
	    		}
	    		
	    	}
	    }
	    
	    function sendTransaction(from, to, amount) {
	    	return web3.eth.sendTransaction({from:web3.eth.coinbase, to:web3.eth.accounts[1], value:web3.toWei(0.05, "ether")});
	    }
	    
	    function getAccountBalance(account) {
	        return ethereum.web3.fromWei(ethereum.web3.eth.getBalance(account), 'ether');
	    }

	    function onAccountChanged() {
	    	return;
	    }
	}
})();