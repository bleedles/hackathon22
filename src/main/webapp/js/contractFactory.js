;(function() {
	'use strict';
	
    var app = angular.module("contractFactory", []);
    app.factory('contracts', contracts);
    
    /* @ngInject */
    function contracts($timeout) {
    	var ai = this;
    	ai.contracts = [];
    	
    	return {
    		getUserContracts: getUserContracts,
    		getPendingContracts: getPendingContracts,
    		getActionableContracts: getActionableContracts,
    		getCompletedContracts: getCompletedContracts,
    		createFundMe: createFundMe,
    		createGroupFund: createGroupFund,
    		addMoney: addMoney,
    		vote: vote
    	}
    	
    	function getUserContracts(userName) {
    		var contracts = getUserContracts(userName);
    		var outgoingContracts = [];
    		for(var i = 0; i < contracts.length; i++) {
    			var people = contracts[i].people;
    			for(var j = 0; j < people.length; j++) {
    				if(people[j] == userName) {
    					outgoingContracts.push(contracts[i]);
    				}
    			}
    		}
    	}
    	
    	function getPendingContracts(userName) {
    		var contracts = getUserContracts(userName);
    		var outgoingContracts = [];
    		for(var i = 0; i < contracts.length; i++) {
    			var people = contracts[i].people;
    			if(contracts[i].status != "completed") {
	    			for(var j = 0; j < people.length; j++) {
	    				if(people[j] == userName) {
	    					outgoingContracts.push(contracts[i]);
	    				}
	    			}
    			}
    		}
    	}
    	
		function getActionableContracts(userName) {
			var contracts = getUserContracts(userName);
    		var outgoingContracts = [];
    		for(var i = 0; i < contracts.length; i++) {
    			var people = contracts[i].actionNeeded;
    			if(contracts[i].status != "completed") {
    				if(!contracts[i].requestedFunders || contracts[i].requestedFunders.length == 0) {
    					outgoingContracts.push(contracts[i]);
    				}else {
    					for(var j = 0; j < people.length; j++) {
            				if(people[j] == userName) {
            					outgoingContracts.push(contracts[i]);
            				}
            			}
    				}
    			}
    		}
		}
		
		function getCompletedContracts(userName) {
			var contracts = getUserContracts(userName);
    		var outgoingContracts = [];
    		for(var i = 0; i < contracts.length; i++) {
	    		if(contracts[i].status == "completed") {
	    			outgoingContracts.push(contracts[i]);
	    		}
    		}
		}
		
		function addContract(contract) {
			ai.contracts.push(contract);
		}
		
		function createFundMe(title, targetAmount, deadline, contributionAmount, recipient) {
			var timeoutPromise = $timeout(timeoutFundMe, deadline, true, ai.contracts.length);
			var contract = {
				type: "fundMe",
				id: ai.contracts.length,
				targetAmount: targetAmount,
				title: title,
				currentAmount: 0,
				recipient: recipient,
				people: [recipient],
				deadline: timeoutPromise,
				status: "pending"
			}
		}
		
		function createGroupFund(title, deadline, contributionAmount, user) {
			var timeoutPromise = $timeout(timeoutGroupFund, deadline, true, ai.contracts.length);
			var contract = {
				type: "fundMe",
				id: ai.contracts.length,
				title: title,
				currentAmount: contributionAmount,
				recipient: recipient,
				funders: [{name: user, amount: contributionAmount}],
				deadline: timeoutPromise,
				status: "pending"
			}
		}
		
		function timeoutFundMe(index) {
			var contract = ai.contracts[i];
			contract.status = "completed";
			var funders = contract.funders;
			if(funders && funders.length > 0) {
				for(var i = 0; i < funders.length; i++) {
					var funder = funders[i];
					// send money back
					// funder.name
					// funder.amount
				}
			}
		}
		
		function addMoney(index, name, amount) {
			var contract = ai.contracts[i];
			var funders = contract.funders;
			if(contract.status == "completed") {
				return false;
			}else {
				funders.push({name: name, amount: amount});
				contract.currentAmount += amount;
				if(contract.type == "fundMe") {
					if(contract.currentAmount >= contract.targetAmount) {
						contract.status = "completed";
						// send money to recipient
						// contract.recipient
						// contract.currentAmount
					}
				}
			}
		}
		
		function timeoutGroupFund(index) {
			
		}
		
		function vote(index, name, vote) {
			
		}
    }
})();