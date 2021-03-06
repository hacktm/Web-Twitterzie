var skeleton = require('./App_Skeleton.js');
var evolve = skeleton.evolve;
var pool = skeleton.chormozomesPool;
var testInput = require('./testInput.js');
var tweets = require('../twiter pull/tweet.js').tweets();
var compare = require('./Compare.js').compare;
var redis = require('../redis/RedisPush.js');

var counter = 99;

function trim(s) {
	return s.replace(/^\s+|\s+$/g, '');
}

module.exports.evolution = function(tweet) {

var verseSearch = function(verse, list) {
	for ( var v in list) {
		if (list[v] == verse) {
			return true;
		}
	}
	return false;
}

var neibhours = function(rand, lower, upper, chromozomesPool) {
	for (var j = rand - lower; j < chromozomesPool.length && j <= rand + upper; j++) {

		var distance = compare(verse, chromozomesPool[j], rand, j);
		var previouseDistance = 0;

		if (j != rand) {
			previouseDistance = compare(chromozomesPool[rand],
					chromozomesPool[j], rand, j);
		}

		if (distance > previouseDistance) {
			keepChromozome = true;
			break;
		}
	}
}

var chromozomeSelection = function(chromozomesPool) {
	var keepChromozome = false;
	var limit = 200;
	if (chromozomesPool.length < limit) {
		while (!verseSearch(tweet, chromozomesPool) && chromozomesPool.length < limit) {
			chromozomesPool.push(tweet);
			keepChromozome = true;
		}
	} else {
		var neibhours = function(rand, lower, upper) {
			for (var j = rand - lower; j < chromozomesPool.length
					&& j <= rand + upper; j++) {

				var distance = compare(tweet, chromozomesPool[j], rand , j);
				var previouseDistance = 0;

				if (j != rand) {
					previouseDistance = compare(chromozomesPool[rand],
							chromozomesPool[j], rand, j);
				}

				if (distance > previouseDistance) {
					keepChromozome = true;
					break;
				}
			}
		}

		if (!verseSearch(tweet, chromozomesPool)) {
			var len = chromozomesPool.length;
//			var keepChromozome = false;
			var rand = Math.round(Math.random() * (chromozomesPool.length - 1));

			switch (rand) {
			case 0:
				neibhours(rand, 0, 1);
				break;
			case 1:
				neibhours(rand, 1, 1);
				break;
			case len:
				neibhours(rand, 2, 0);
				break;
			default:
				neibhours(rand, 2, 1);
				break;
			}
			
//			switch (rand) {
//			case 0:
//				neibhours(rand, 0, 1);
//				break;
//			case 1:
//				neibhours(rand, 1, 1);
//				break;
//			case len:
//				neibhours(rand, 1, 0);
//				break;
//			default:
//				neibhours(rand, 1, 1);
//				break;
//			}

			if (keepChromozome) {
				chromozomesPool.splice(rand, 0, tweet);
			}
		}
	}
	return keepChromozome;
}

var mutation = function(chormozomesPool) {
	var ratio = Math.floor(0.3 * (chormozomesPool.length - 1));
	var neibhours = function(verse, rand, lower, upper) {
		var bestDistance = 0;
		var index = 0;
		for (var j = rand - lower; j < chormozomesPool.length
				&& j <= rand + upper; j++) {
			if (j != rand) {
				var distance = compare(verse, chormozomesPool[j], rand, j);
				if (distance > bestDistance) {
					bestDistance = distance;
				}
			}
		}
		return bestDistance;
	}

	for (var i = 0; i < ratio; i++) {
		var rand1 = Math.round(Math.random() * (chormozomesPool.length - 1));
		var rand2 = Math.round(Math.random() * (chormozomesPool.length - 1));
		var chr = chormozomesPool[rand1];
		var len = chormozomesPool.length;

		switch (rand1) {
		case 0:
			distance1 = neibhours(chr, rand1, 0, 2);
			break;
		case 1:
			distance1 = neibhours(chr, rand1, 1, 2);
			break;
		case len - 1:
			distance1 = neibhours(chr, rand1, 2, 1);
			break;
		case len:
			distance1 = neibhours(chr, rand1, 2, 0);
			break;
		default:
			distance1 = neibhours(chr, rand1, 2, 2);
			break;
		}

		switch (rand2) {
		case 0:
			distance2 = neibhours(chr, rand2, 0, 1);
			break;
		case 1:
			distance2 = neibhours(chr, rand2, 1, 1);
			break;
		case len:
			distance2 = neibhours(chr, rand2, 2, 0);
			break;
		default:
			distance2 = neibhours(chr, rand2, 2, 1);
			break;
		}
		
//		switch (rand1) {
//		case 0:
//			distance1 = neibhours(chr, rand1, 0, 1);
//			break;
//		case 1:
//			distance1 = neibhours(chr, rand1, 1, 1);
//			break;
//		case len - 1:
//			distance1 = neibhours(chr, rand1, 1, 1);
//			break;
//		case len:
//			distance1 = neibhours(chr, rand1, 1, 0);
//			break;
//		default:
//			distance1 = neibhours(chr, rand1, 1, 1);
//			break;
//		}
//
//		switch (rand2) {
//		case 0:
//			distance2 = neibhours(chr, rand2, 0, 1);
//			break;
//		case 1:
//			distance2 = neibhours(chr, rand2, 1, 1);
//			break;
//		case len:
//			distance2 = neibhours(chr, rand2, 1, 0);
//			break;
//		default:
//			distance2 = neibhours(chr, rand2, 2, 1);
//			break;
//		}

		if (distance2 > distance1) {
			// sweep
			chormozomesPool.splice(rand1, 1);
			chormozomesPool.splice(rand2, 0, chr);
		}
	}
}
	
	if(tweet){
		return evolve({
			chromozomeSelection : chromozomeSelection,
			mutation : mutation,
		});
	} else {
		return evolve({
			mutation : mutation,
		});
	}
	
};

module.exports.pool = pool;
