<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
<!-- Optional theme -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css" integrity="sha384-fLW2N01lMqjakBkx3l/M9EahuwpSfeNvV63J5ezn3uZzapT0u7EYsXMjQV+0En5r" crossorigin="anonymous">
<link rel="stylesheet" href="css/dashboard.css">
<title>CLASSic</title>
</head>
<body ng-app="app">
	<div ng-controller="AppController">
		<nav class="navbar navbar-inverse navbar-fixed-top">
	    	<div class="container-fluid">
	        	<div class="navbar-header">
	          		<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
	            		<span class="sr-only">Toggle navigation</span>
	            		<span class="icon-bar"></span>
	            		<span class="icon-bar"></span>
	            		<span class="icon-bar"></span>
	          		</button>
	          		<a class="navbar-brand" href="#">EthWeb</a>
	        	</div>
	        	<div id="navbar" class="navbar-collapse collapse">
		          	<ul class="nav navbar-nav navbar-right">
		            	<li><a href="#">Dashboard</a></li>
		            	<li><a href="#">Settings</a></li>
		            	<li><a href="#">Profile</a></li>
		            	<li><a href="#">Help</a></li>
		          	</ul>
		          	<form class="navbar-form navbar-right">
		            	<input type="text" class="form-control" placeholder="Search...">
		          	</form>
				</div>
	      	</div>
	    </nav>
	
	    <div class="container-fluid">
	    	<div class="row">
	        	<div class="col-sm-3 col-md-2 sidebar">
		          	<ul class="nav nav-sidebar">
		            	<li class="active"><a href="#">Overview <span class="sr-only">(current)</span></a></li>
		            	<li><a href="#">Reports</a></li>
		            	<li><a href="#">Analytics</a></li>
		            	<li><a href="#">Export</a></li>
		          	</ul>
	        	</div>
	        	<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
	          		<h1 class="page-header">Dashboard</h1>
	
					<div class="row placeholders" ng-repeat="account in accounts">
			        	{{account}}
			        </div>
	
		          	<h2 class="sub-header">Section title</h2>
		          	<div class="table-responsive">
		          		<table></table>  
		          	</div>
	        	</div>
	      	</div>
	    </div>
	</div>
</body>
<!-- Latest compiled and minified JavaScript -->
<script src="https://code.jquery.com/jquery-1.12.0.min.js"></script>
<script src="https://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>
<script src="js/lib/angular.js"></script>
<script src="js/lib/angular-ui.js"></script>
<script src="js/lib/require.js"></script>
<script src="js/lib/web3/web3.js"></script>
<script src="js/ethereum-service.js"></script>
<script src="js/app.js"></script>
</html>
