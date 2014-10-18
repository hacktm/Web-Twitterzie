var http = require('http');
var Twit = require('twit');

var T = new Twit({
    consumer_key:         'zLzozcD797pm3A4pQf09DhwrI'
  , consumer_secret:      '45uPRGtGTMDwAMADF7oXVuCZgp00zGg2Z09VhqoG5VEsZaaIwE'
  , access_token:         '23079109-aA3ZzSvf1lr0Mem1ocvvHEvcWTme4qHncFVbZe7tb'
  , access_token_secret:  'PgkW7SvWVJlLfjUA3OcImhgZTdJj8Rw2f7k3nMqlLKckZ'
});

// var stream = T.stream('statuses/filter', { track:'apple' })

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    //res.end('Hello World!!!\n');
  	T.get('search/tweets', { q: 'banana since:2014-01-01', count: 1000, lang:'ro' }, function(err, data, response) {
  		
		res.write('<meta charset="UTF-8">');
  		if(data != undefined){
	  		for(i=0; i < data.statuses.length; i++){
	  			console.log(data.statuses[i].text);
	  			res.write(data.statuses[i].text + '<br/><br/>', 'utf-8');
	  		}
  		}
		res.end('Hello World!!!\n');

  		// stream.on('tweet', function (tweet) {
		//   res.write(tweet.text + '<br/><br/>', 'utf-8');
		//   console.log(tweet)
		// })
	})
}).listen(81, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');


