var redis = require("redis");
var client = redis.createClient();

var redisSet = 'versuriTest';

client.on("error", function (err) {
	console.log("Error " + err);
});

module.exports.add = function(verse){
	client.sadd(redisSet, verse, redis.print);
}

module.exports.allVerse = function(callback){
	callback();
//	return client.smembers(redisSet, function(err,results) {
//		for(var i in results){
//			console.log('--- ' + results[i]);
//		}
//	});
}

module.exports.save = function(){
	client.save(redis.print);
}
