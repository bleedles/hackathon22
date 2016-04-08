;(function() {
	var app = angular.module("app", ['ethereum-service', 'accountService', 'contractFactory', 'ui.bootstrap']);

	app.controller("AppController", AppController);
	app.directive('dashboardView', dashboardView);
	app.directive('transactionsView', transactionsView);
	
	function AppController($scope, ethereum, accountInfo, contracts) {
		var vm = this;
	    activate();
	    $scope.contracts = contracts;
	    $scope.users = 
	    [{name:"Blake",
	    classicCoins:0,
	    customerKey: "518603",
    	accountBalanceData: 
    		[{accountNumber:  "511698",
	    	accountDescription:  "Virtual Wallet Spend Account",
	    	accountNickname:  "My VW Account",
    		availableBalance: 2123.29,
    		accountBalance: 2123.29,
    		accountType:  "deposit",
    		vwId:  "513989"},
    		{accountNumber:  "392316",
    		accountDescription:  "Virtual Wallet Reserve Account",
    		accountNickname:  "My VW Account",
    		availableBalance: 921.53,
    		accountBalance: 921.53,
    		accountType:  "deposit",
    		vwId:  "513989"},
    		{accountNumber:  "895910",
    		accountDescription:  "Virtual Wallet Growth Account",
    		accountNickname:  "My VW Account",
    		availableBalance: 10623.31,
    		accountBalance: 10623.31,
    		accountType:  "savings",
    		vwId:  "513989"},
    		{accountNumber:  "1906624",
    		accountDescription:  "PNC Points Visa Credit Card Account",
    		accountNickname:  "My Credit Card",
    		availableBalance: 3298.83,
    		accountBalance: 3298.83,
    		accountType:  "credit card"},
    		{accountNumber:  "1807628",
    		accountDescription:  "PNC Visa Signature Credit Card Account",
    		accountNickname:  "My 2nd Credit Card",
    		availableBalance: 5194.21,
    		accountBalance: 5194.21,
    		accountType:  "credit card"}]},
	     {name:"Connor",
    	 classicCoins:0,
    	 customerKey:"450574",
    	 accountBalanceData: 
     		[{accountNumber:  "511698",
 	    	accountDescription:  "Virtual Wallet Spend Account",
 	    	accountNickname:  "My VW Account",
     		availableBalance: 2123.29,
     		accountBalance: 2123.29,
     		accountType:  "deposit",
     		vwId:  "513989"},
     		{accountNumber:  "392316",
     		accountDescription:  "Virtual Wallet Reserve Account",
     		accountNickname:  "My VW Account",
     		availableBalance: 921.53,
     		accountBalance: 921.53,
     		accountType:  "deposit",
     		vwId:  "513989"},
     		{accountNumber:  "895910",
     		accountDescription:  "Virtual Wallet Growth Account",
     		accountNickname:  "My VW Account",
     		availableBalance: 10623.31,
     		accountBalance: 10623.31,
     		accountType:  "savings",
     		vwId:  "513989"},
     		{accountNumber:  "1906624",
     		accountDescription:  "PNC Points Visa Credit Card Account",
     		accountNickname:  "My Credit Card",
     		availableBalance: 3298.83,
     		accountBalance: 3298.83,
     		accountType:  "credit card"},
     		{accountNumber:  "1807628",
     		accountDescription:  "PNC Visa Signature Credit Card Account",
     		accountNickname:  "My 2nd Credit Card",
     		availableBalance: 5194.21,
     		accountBalance: 5194.21,
     		accountType:  "credit card"}]},
	     {name:"Jon",
     	 classicCoins:0,
    	 customerKey:"909913",
    	 accountBalanceData: 
     		[{accountNumber:  "511698",
 	    	accountDescription:  "Virtual Wallet Spend Account",
 	    	accountNickname:  "My VW Account",
     		availableBalance: 2123.29,
     		accountBalance: 2123.29,
     		accountType:  "deposit",
     		vwId:  "513989"},
     		{accountNumber:  "392316",
     		accountDescription:  "Virtual Wallet Reserve Account",
     		accountNickname:  "My VW Account",
     		availableBalance: 921.53,
     		accountBalance: 921.53,
     		accountType:  "deposit",
     		vwId:  "513989"},
     		{accountNumber:  "895910",
     		accountDescription:  "Virtual Wallet Growth Account",
     		accountNickname:  "My VW Account",
     		availableBalance: 10623.31,
     		accountBalance: 10623.31,
     		accountType:  "savings",
     		vwId:  "513989"},
     		{accountNumber:  "1906624",
     		accountDescription:  "PNC Points Visa Credit Card Account",
     		accountNickname:  "My Credit Card",
     		availableBalance: 3298.83,
     		accountBalance: 3298.83,
     		accountType:  "credit card"},
     		{accountNumber:  "1807628",
     		accountDescription:  "PNC Visa Signature Credit Card Account",
     		accountNickname:  "My 2nd Credit Card",
     		availableBalance: 5194.21,
     		accountBalance: 5194.21,
     		accountType:  "credit card"}]},
	     {name: "Afif",
     	 classicCoins:0,
    	 customerKey:"951862",
    	 accountBalanceData: 
     		[{accountNumber:  "511698",
 	    	accountDescription:  "Virtual Wallet Spend Account",
 	    	accountNickname:  "My VW Account",
     		availableBalance: 2123.29,
     		accountBalance: 2123.29,
     		accountType:  "deposit",
     		vwId:  "513989"},
     		{accountNumber:  "392316",
     		accountDescription:  "Virtual Wallet Reserve Account",
     		accountNickname:  "My VW Account",
     		availableBalance: 921.53,
     		accountBalance: 921.53,
     		accountType:  "deposit",
     		vwId:  "513989"},
     		{accountNumber:  "895910",
     		accountDescription:  "Virtual Wallet Growth Account",
     		accountNickname:  "My VW Account",
     		availableBalance: 10623.31,
     		accountBalance: 10623.31,
     		accountType:  "savings",
     		vwId:  "513989"},
     		{accountNumber:  "1906624",
     		accountDescription:  "PNC Points Visa Credit Card Account",
     		accountNickname:  "My Credit Card",
     		availableBalance: 3298.83,
     		accountBalance: 3298.83,
     		accountType:  "credit card"},
     		{accountNumber:  "1807628",
     		accountDescription:  "PNC Visa Signature Credit Card Account",
     		accountNickname:  "My 2nd Credit Card",
     		availableBalance: 5194.21,
     		accountBalance: 5194.21,
     		accountType:  "credit card"}]}];
		$scope.web3 = ethereum.web3;
		$scope.selectAccount = selectAccount;
		$scope.sendTransaction = sendTransaction;
		$scope.activePage = 'dashboard';
		$scope.transactions = [{title: 'Send Money'},{title: 'Fund Me'},{title: 'Group Fund'}];
		$scope.transactionToExecute = {};
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
	    		gas:0.25,
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