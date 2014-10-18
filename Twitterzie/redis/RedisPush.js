var redis = require("redis");
var client = redis.createClient();

var redisSet = 'versuriTest';

client.on("error", function (err) {
	console.log("Error " + err);
});

module.exports.add = function(verse){
	client.sadd(redisSet, verse, redis.print);
}

<<<<<<< Updated upstream
module.exports.allVerse = function(callback){
	client.smembers(redisSet, callback);
//	return client.smembers(redisSet, function(err,results) {
//		for(var i in results){
//			console.log('--- ' + results[i]);
//		}
//	});
=======
module.exports.allVerse = function(){
	return client.smembers(redisSet, function(err,results) {
		for(var i in results){
			console.log('--- ' + results[i]);
		}
	});
>>>>>>> Stashed changes
}

module.exports.save = function(){
	client.save(redis.print);
}
