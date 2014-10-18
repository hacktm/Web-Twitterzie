Twit = require('twit');

var T = new Twit({
    consumer_key:         'zLzozcD797pm3A4pQf09DhwrI'
  , consumer_secret:      '45uPRGtGTMDwAMADF7oXVuCZgp00zGg2Z09VhqoG5VEsZaaIwE'
  , access_token:         '23079109-aA3ZzSvf1lr0Mem1ocvvHEvcWTme4qHncFVbZe7tb'
  , access_token_secret:  'PgkW7SvWVJlLfjUA3OcImhgZTdJj8Rw2f7k3nMqlLKckZ'
});


var tags = ['pe', 'sa', 'de', 'a'];
var streams = [];
var language = 'ro';

//Create streams
for(i in tags){
	var stream = T.stream('statuses/filter',
			{
				track: tags[i],
				language: language
			});
	stream.on('tweet', function (tweet) {
		  console.log(tweet.text)
		});
		
	streams.push(stream);	
}