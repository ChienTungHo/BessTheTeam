var express = require('express');
var app = express();

app.use(express.bodyParser());  // Populate req.body

app.get('/hi/tong/:iid', function(req, res) {
    var iid = req.params.iid;
    
	var Video = Parse.Object.extend("Video");
	var v = new Video({aaa:'bbb',ccc:'eee'});
	v.save();

	var query = new Parse.Query("Video");
	query.equalTo("objectId", iid);
	query.find().then(function(result){
		res.send({success:true, result:result});
	});
});


app.listen();