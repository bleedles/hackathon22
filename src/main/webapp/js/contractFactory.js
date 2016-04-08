;(function() {
	'use strict';
	
    var app = angular.module("contractFactory", []);
    app.factory('contracts', contracts);
    
    /* @ngInject */
    function contracts($timeout, $rootScope) {
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
    		vote: vote,
    		sendMoney: sendMoney
    	}
    	
    	function getUserContracts(userName) {
    		var contracts = ai.contracts;
    		var outgoingContracts = [];
    		for(var i = 0; i < contracts.length; i++) {
    			var people = contracts[i].people;
    			for(var j = 0; j < people.length; j++) {
    				if(people[j] == userName) {
    					outgoingContracts.push(contracts[i]);
    				}
    			}
    		}
    		return outgoingContracts;
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
    		return outgoingContracts;
    	}
    	
		function getActionableContracts(userName) {
			var contracts = ai.contracts;
    		var outgoingContracts = [];
    		for(var i = 0; i < contracts.length; i++) {
    			var people = contracts[i].actionRequired;
    			if(contracts[i].status != "completed") {
    				if(contracts[i].type == "Group Fund") {
    					if(contracts[i].status == "voting") {
        					people = contracts[i].voters;
        					for(var j = 0; j < people.length; j++) {
        						if(people[j] == userName) {
        							outgoingContracts.push(contracts[i]);
        						}
        					}
    					} else {
    						var alreadyFunded = false;
    						var funders = contracts[i].funders;
    						for(var j = 0; j < funders.length; j++) {
    							if(funders[j].name == userName) {
    								alreadyFunded = true;
    							}
    						}
    						if(!alreadyFunded) {
    							outgoingContracts.push(contracts[i]);
    						}
    					}    					
    				}else {
            			outgoingContracts.push(contracts[i]);
    				}
    			}
    		}
    		return outgoingContracts;
		}
		
		function getCompletedContracts(userName) {
			var contracts = getUserContracts(userName);
    		var outgoingContracts = [];
    		for(var i = 0; i < contracts.length; i++) {
	    		if(contracts[i].status == "completed") {
	    			outgoingContracts.push(contracts[i]);
	    		}
    		}
    		return outgoingContracts;
		}
		
		function addContract(contract) {
			ai.contracts.push(contract);
		}
		
		function createFundMe(title, targetAmount, deadline, contributionAmount, recipient) {
			var timeoutPromise = $timeout(timeoutFundMe, deadline, true, ai.contracts.length);
			var contract = {
				type: "Fund Me",
				id: ai.contracts.length,
				targetAmount: targetAmount,
				title: title,
				currentAmount: 0,
				contributionAmount: contributionAmount,
				recipient: recipient,
				people: [recipient],
				deadline: timeoutPromise,
				status: "pending"
			}
			ai.contracts.push(contract);
			return true;
		}
		
		function createGroupFund(title, deadline, contributionAmount, user) {
			var users = $rootScope.users;
			for(var i = 0; i < users.length; i++) {
				if(users[i].name == user) {
					var userObj = users[i];
					var account = userObj.accountBalanceData[0];
					if(account.availableBalance < contributionAmount) {
						return false;
					}else {
						account.availableBalance -= contributionAmount;
					}
				}
			}
			var timeoutPromise = $timeout(timeoutGroupFund, deadline, true, ai.contracts.length);
			var contract = {
				type: "Group Fund",
				id: ai.contracts.length,
				title: title,
				currentAmount: contributionAmount,
				contributionAmount: contributionAmount,
				funders: [{name: user, amount: contributionAmount}],
				voters: [user],
				people: [user],
				deadline: timeoutPromise,
				status: "pending"
			};
			ai.contracts.push(contract);
			return true;
		}
		
		function timeoutFundMe(index) {
			var contract = ai.contracts[index];
			contract.status = "completed";
			var funders = contract.funders;
			if(funders && funders.length > 0) {
				for(var i = 0; i < funders.length; i++) {
					var funder = funders[i];
					// send money back
					// funder.name
					// funder.amount
					sendMoney(funder.name, funder.amount);
				}
			}
		}
		
		function addMoney(index, name, amount) {
			var contract = ai.contracts[index];
			if(!contract.funders) {
				contract.funders = [];
			}
			if(!contract.people) {
				contract.people = [];
			}
			var people = contract.people;
			var funders = contract.funders;
			var users = $rootScope.users;
			for(var i = 0; i < users.length; i++) {
				if(users[i].name == name) {
					var user = users[i];
					var account = user.accountBalanceData[0];
					if(account.availableBalance < amount) {
						return false;
					}else {
						account.availableBalance -= amount;
					}
				}
			}
			if(contract.status == "completed") {
				return false;
			}else {
				if(contract.type == "Fund Me") {
					var alreadyPaid = false;
					for(var i = 0; i < funders.length; i++) {
						if(funders[i].name == name) {
							alreadyPaid = true;
							funders[i].amount += amount;
						}
					}
					
					if(!alreadyPaid) {
						funders.push({name: name, amount: amount});
						var inPeople = false;
						for(var i = 0; i < people.length; i++) {
							if(people[i] == name) {
								inPeople = true;
							}
						}
						if(!inPeople) {
							contract.people.push(name);
						}
					}
					contract.currentAmount += amount;
					if(contract.currentAmount >= contract.targetAmount) {
						contract.status = "completed";
						// send money to recipient
						// contract.recipient
						// contract.currentAmount
						sendMoney(contract.recipient, contract.currentAmount);
					}
					return true;
				}else {
					var alreadyPaid = false;
					for(var i = 0; i < funders.length; i++) {
						if(funders[i].name == name) {
							alreadyPaid = true;
						}
					}
					if(alreadyPaid) {
						return false;
					}else {
						contract.voters.push(name);
						funders.push({name: name, amount: amount});
						contract.people.push(name);
						contract.currentAmount += amount;
						return true;
					}
				}
			}
		}
		
		function sendMoney(name, amount, from) {
			if(from) {
				var users = $rootScope.users;
				for(var i = 0; i < users.length; i++) {
					if(users[i].name == from) {
						var user = users[i];
						var account = user.accountBalanceData[0];
						if(account.availableBalance < amount) {
							return false;
						}else {
							account.availableBalance -= amount;
						}
					}
				}
			}
			var users = $rootScope.users;
			for(var i = 0; i < users.length; i++) {
				if(users[i].name == name) {
					var user = users[i];
					var account = user.accountBalanceData[0];
					account.availableBalance += amount;
				}
			}
		}
		
		function timeoutGroupFund(index) {
			var contract = ai.contracts[index];
			contract.status = "voting";
			contract.actionRequired = [];
			var voters = contract.voters;
			for(var i = 0; i < voters.length; i++) {
				contract.actionRequired.push(voters[i]);
			}
		}
		
		function vote(index, name, vote) {
			var contract = ai.contracts[index];
			var complete = false;
			var alreadyVoted = false;
			if(!contract.votes) {
				contract.votes = [];
			}
			var votes = contract.votes;
			var voters = contract.voters;
			if(contract.status != "completed") {
				if(votes) {
					for(var i = 0; i < votes.length; i++) {
						if(votes[i].name == name) {
							votes[i].vote = vote;
							alreadyVoted = true;
						}
					}
				}
				if(!alreadyVoted) {
					votes.push({name: name, vote: vote});
				}
				if(votes.length == voters.length) {
					var votedPerson = votes[0].vote;
					var agreed = true;
					for(var i = 0; i < votes.length; i++) {
						if(votedPerson != votes[i].vote) {
							agreed = false;
						}
					}
					if(agreed) {
						contract.status = "completed";
						sendMoney(votedPerson, contract.currentAmount);
					}
				}
			}
		}
    }
})();