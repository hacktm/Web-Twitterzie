var redis = require('./RedisPush.js');
var fs = require('fs');

redis.allFinal(function(err, results){
	console.log(results);
	console.log(results.length);
	
	//write in file
	for(i in results){
		fs.appendFile("/twitter/output.txt", results[i] + "\r\n", function(err) {
		    if(err) {
		        console.log(err);
		    } else {
		        console.log("The file was saved!");
		    }
		});
	}
});




//redis.clearOut();
//
//redis.addOut('a');
//
//redis.allOut(function(err, results){
//	console.log(results);
//});
//
//redis.remOut('a');
//
//redis.allOut(function(err, results){
//	console.log(results);
//});