var redis = require("redis");
var client = redis.createClient();

client.on("error", function (err) {
	console.log("Error " + err);
});

client.sadd("versuriTest", "test1", redis.print);
client.sadd("versuriTest", "test2", redis.print);
var versuri = client.smembers("versuriTest", redis.print);
console.log(versuri);
