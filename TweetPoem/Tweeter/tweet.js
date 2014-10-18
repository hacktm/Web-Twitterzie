Twit = require('twit');
Q = require('Q');

module.exports.tweets = function(word, date, count, lang){
	var T = new Twit({
		consumer_key : 'zLzozcD797pm3A4pQf09DhwrI',
		consumer_secret : '45uPRGtGTMDwAMADF7oXVuCZgp00zGg2Z09VhqoG5VEsZaaIwE',
		access_token : '23079109-aA3ZzSvf1lr0Mem1ocvvHEvcWTme4qHncFVbZe7tb',
		access_token_secret : 'PgkW7SvWVJlLfjUA3OcImhgZTdJj8Rw2f7k3nMqlLKckZ'
	});
	
	def = Q.defer();
	
	T.get('search/tweets', {
//		q : 'java since:2013-02-05 language:en',
		q : 'language:en',
		count : 100,
	}, function(err, data, response) {
		if (data != undefined) {
			console.log(data.statuses.length)
			def.resolve(data.statuses);
		}
	});
	
	return def.promise;
} 




