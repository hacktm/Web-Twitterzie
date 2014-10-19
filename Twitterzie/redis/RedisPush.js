var redis = require("redis");
var client = redis.createClient();

var redisSet = 'versuriTest';
var redisSetFinal = 'versuriFinal';
var pool = 'pool';
var outstanding = 'outstanding';

client.on("error", function (err) {
	console.log("Error " + err);
});

module.exports.addFinal = function(verse){
	client.sadd(redisSetFinal, verse);
}

module.exports.addVerse = function(verse){
	client.sadd(redisSet, verse);
}

module.exports.addChr = function(chr){
	client.sadd(pool, chr);
}

module.exports.addOut = function(outChr){
	client.sadd(outstanding, outChr);
}

module.exports.allVerse = function(callback){
	client.smembers(redisSet, callback);
}

module.exports.allChr = function(callback){
	client.smembers(pool, callback);
}

module.exports.allOut = function(callback){
	client.smembers(outstanding, callback);
}

module.exports.clearSet = function(callback){
	client.del(redisSet , callback);
}

module.exports.clearChr = function(callback){
	client.del(pool , callback);
}

module.exports.clearOut = function(callback){
	client.del(outstanding , callback);
}

module.exports.remOut = function(out, callback){
	client.srem(outstanding, out);
}

module.exports.save = function(callback){
	client.save(callback);
}
