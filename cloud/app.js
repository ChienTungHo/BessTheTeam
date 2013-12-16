
var express = require('express');
var app = express();

app.use(express.bodyParser());  // Populate req.body

// Record the user click record
app.get('/click/add/:item_id/:sell_id/:user', function(req, res) {
    var item_id = req.params.item_id;
	var sell_id = req.params.sell_id;
	var username = req.params.user;
    
	var click_log = Parse.Object.extend('click_log');
	var click = new click_log({item_id: item_id,
	                           sell_id: sell_id,
	                           user: username});
	click.save();
	
	res.send({success: true});
});

// Display the counter of each item from history data
app.get('/click/show/total', function(req, res){
	var click_log = Parse.Object.extend('click_log');
	var query = new Parse.Query(click_log);

	query.find({
		success: function(results){
			var count_list = {};
			var name_list = {};
			for(var i = 0; i < results.length; i++){
				var obj = results[i].get("item_id");
				console.log(obj);
				if(obj in count_list){
					count_list[obj] += 1;
				}
				else{
					count_list[obj] = 1;
					name_list[obj] = results[i].get("sell_id");	
				}
			}
			res.send({"count_list": count_list, "name_list": name_list});			
		}
	});
});

// Add new user to database
app.get('/user/add/:user', function(req, res) {
	var client = Parse.Object.extend('client');
	var query = new Parse.Query(client);
	var username = req.params.user;

	query.equalTo("username", username);

	query.first({
		success: function(results){
			console.log(results);
			if(results){
				results.save();
				res.send(results);
			}
			else{
				var client = Parse.Object.extend('client');
				var username = req.params.user;
				var addclient = new client({username: username});
				addclient.save();
				res.send(addclient);	
			}
		}
	});
});

// Get the user list from database
app.get('/user/list', function(req, res) {
	var client = Parse.Object.extend('client');
	var query = new Parse.Query(client);

	query.find({
		success: function(results){
			var user_list = [];
			for(var i = 0 ; i < results.length ; i++){
				user_list.push(results[i].get('username'));
			}
			res.send(user_list);
		}
	})

});

// Get click record from the database
app.get('/user/show-click/:user', function(req, res){
	var click_log = Parse.Object.extend('click_log');
	var query = new Parse.Query(click_log);
	var user = req.params.user;
	query.equalTo("user", user);
	query.descending("updatedAt");

	query.find({
		success: function(results){
			res.send(results);			
		}
	}); 

});

app.listen();