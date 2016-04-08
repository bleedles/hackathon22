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
            vwId:  "513989"}]},
         {name:"Connor",
         classicCoins:0,
         customerKey:"450574",
         accountBalanceData: 
            [{accountNumber:  "392316",
            accountDescription:  "Virtual Wallet Reserve Account",
            accountNickname:  "My VW Account",
            availableBalance: 921.53,
            accountBalance: 921.53,
            accountType:  "deposit",
            vwId:  "513989"}]},
         {name:"Jon",
         classicCoins:0,
         customerKey:"909913",
         accountBalanceData: 
            [{accountNumber:  "895910",
            accountDescription:  "Virtual Wallet Growth Account",
            accountNickname:  "My VW Account",
            availableBalance: 10623.31,
            accountBalance: 10623.31,
            accountType:  "savings",
            vwId:  "513989"}]},
         {name: "Afif",
         classicCoins:0,
         customerKey:"951862",
         accountBalanceData: 
            [{accountNumber:  "1906624",
            accountDescription:  "PNC Points Visa Credit Card Account",
            accountNickname:  "My Credit Card",
            availableBalance: 3298.83,
            accountBalance: 3298.83,
            accountType:  "credit card"}]}];
        $scope.activeUser = $scope.users[0];
        $scope.otherUsers = [];
        $scope.otherUsers.push($scope.users[1]);
        $scope.otherUsers.push($scope.users[2]);
        $scope.otherUsers.push($scope.users[3]);
        $scope.web3 = ethereum.web3;
        $scope.selectAccount = selectAccount;
        $scope.sendTransaction = sendTransaction;
        $scope.activePage = 'dashboard';
        $scope.transactions = [{type: 'Send Money'},{type: 'Fund Me'},{type: 'Group Fund'}];
        $scope.activeUser.transactionToExecute = {};
        $scope.setActiveUser = setActiveUser;
        $scope.setRecipient = setRecipient;
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
            if($scope.activeUser.transactionToExecute) {
                var trans = $scope.activeUser.transactionToExecute;
                trans.deadline = parseInt(trans.deadline * 60000);
                switch($scope.activeUser.transactionToExecute.type) {
                case 'Send Money':
                    //contracts.sendMoney();
                    break;
                case 'Fund Me':
                    contracts.createFundMe($scope.activeUser.transactionToExecute.title, $scope.activeUser.transactionToExecute.targetAmount, $scope.activeUser.transactionToExecute.deadline, $scope.activeUser.transactionToExecute.contributionAmount, $scope.activeUser.transactionToExecute.recipient);
                    $scope.activeUser.transactionToExecute = {};
                    break;
                case 'Group Fund':
                    contracts.createGroupFund($scope.activeUser.transactionToExecute.title, $scope.activeUser.transactionToExecute.deadline, $scope.activeUser.transactionToExecute.contributionAmount, $scope.activeUser);
                    $scope.activeUser.transactionToExecute = {};
                    break;
                }
            }
            
        }
        
        function selectTransaction() {
            $scope.activeUser.transactionToExecute = angular.copy($scope.selectedTransaction);
        }
        
        function getAccountBalance(account) {
            return ethereum.web3.fromWei(ethereum.web3.eth.getBalance(account), 'ether');
        }
        
        function setRecipient() {
            for(var i in $scope.users) {
                if($scope.users[i].name.toLowerCase() == $scope.activeUser.recipient.toLowerCase()) {
                    $scope.activeUser.transactionToExecute.recipient = $scope.users[i];
                    break;
                }
            }
        }
        
        function setActiveUser(user) {
            $scope.otherUsers = [];
            for(var i in $scope.users) {
                if($scope.users[i].name != user.name) {
                    $scope.otherUsers.push($scope.users[i]);
                }
            }
            $scope.activeUser = user;
        }
        
        function setActiveAccount(num) {
            for(var i in activeUser.accountBalanceData) {
                if(activeUser.accountBalanceData[i].accountNumber == num) {
                    $scope.selectedAccount = activeUser.accountBalanceData[i];
                }
            }
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