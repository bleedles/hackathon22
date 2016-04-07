;(function() {
	var app = angular.module("app", ['ethereum-service']);
	
	app.controller("AppController", AppController);
	app.directive('dashboardView', dashboardView);
	app.directive('transactionsView', transactionsView);
	
	function AppController($scope, ethereum) {
		var vm = this;
	    activate();
	    
	    $scope.users = ["Blake", "Connor", "Jon", "Afif"];
		$scope.web3 = ethereum.web3;
		$scope.selectAccount = selectAccount;
		$scope.sendTransaction = sendTransaction;
		$scope.activePage = 'dashboard';
		
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
	    		balance = e.toString(10);
	    		account.balance = balance;
		    	account.selected = ethereum.web3.eth.coinbase == account.address ? true : false;
		    	if(account.selected) {
		    		$scope.transactionFrom = account.address;
		    		
		    	}
		    	if(account.address == "0xb89d174bb1326c0d91534efc0e027573d262b286") {
		    		ethereum.web3.personal.unlockAccount(account.address, 'hashtagpassword');
		    	} else if(account.address == "0xb499144ea883c5fcb1025c94d007b8aced55cd64") {
		    		ethereum.web3.personal.unlockAccount(account.address, 'resp0nd!23');
		    	}
		    	$scope.accounts.push(account);
	    	}
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
	    
	    function sendTransaction() {
	    	$scope.transactionSuccess = false;
	    	$scope.transactionSuccess = ethereum.web3.eth.sendTransaction({
	    		from:$scope.transactionFrom.trim(), 
	    		to:$scope.transactionTo.trim(), 
	    		value:ethereum.web3.toWei($scope.transactionAmount, "ether")
	    		});
	    	return $scope.transactionSuccess;
	    }
	    
	    function getAccountBalance(account) {
	        return ethereum.web3.fromWei(ethereum.web3.eth.getBalance(account), 'ether');
	    }
	}
	
	function dashboardView() {
		return {
			restrict: 'E',
			scope: false,
			templateUrl: 'html/dashboard.html'
		};
	}
	
	function transactionsView() {
		return {
			restrict: 'E',
			scope: false,
			templateUrl: 'html/transactions.html'
		};
	}
})();