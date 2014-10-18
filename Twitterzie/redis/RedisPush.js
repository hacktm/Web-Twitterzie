var redis = require("redis");
var client = redis.createClient();

var redisSet = 'versuriTest';

client.on("error", function (err) {
	console.log("Error " + err);
});

module.exports.add = function(verse){
	client.sadd(redisSet, verse);
}

module.exports.allVerse = function(){
	return client.smembers(redisSet, redis.print);
}


