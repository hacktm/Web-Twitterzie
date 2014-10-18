var redis = require('./RedisPush.js');

<<<<<<< Updated upstream
redis.allVerse(function(err, results){
	console.log(results);
});



=======
redis.add('vlad');
redis.add('danaila');
var all = redis.allVerse();
console.log(all);

//client.on("error", function (err) {
//	console.log("Error " + err);
//});
//
//client.sadd("versuriTest", "test1", redis.print);
//client.sadd("versuriTest", "test2", redis.print);
//var versuri = client.smembers("versuriTest", redis.print);
//console.log(versuri);
//client.save();
>>>>>>> Stashed changes
