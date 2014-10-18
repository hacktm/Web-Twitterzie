var evolve = require('./App_Skeleton.js').evolve;
var testInput = require('./testInput.js');
var tweets = require('../twiter pull/tweet.js').tweets();

var counter = 9999;

function trim(s){
	return s.replace(/^\s+|\s+$/g, '');
}

var testText = function(){
//	for(var i in testInput){
//		if(!verseSearch(testInput[i], outstanding)){
//			outstanding.push(trim(testInput[i]));
//		}
//	}

	outstanding.push('zero');
	outstanding.push('unu');
	outstanding.push('doi');
	outstanding.push('trei');
	outstanding.push('patru');
	outstanding.push('cinci');
	outstanding.push('sase');
	outstanding.push('sapte');
	outstanding.push('opt');
	outstanding.push('noua');
}

//tweets.then(function(tweets){
	
//	var Chromozome = function(){
//		this.fitness = 0;
//		this.genes = null;
//	};
	
	var init = function(chormozomesPool){
		outstanding = [];
		testText();
	};
	
	var mating = function(chromozomesPool){
		
//		for(var tweet in tweets){
//			// TO DO : Scoatem tweeturile ce contin lincuri
//			var chromozome = new Chromozome();
//			chromozome.genes = tweet.text;
//			outstanding.push(chromozome);
//		}
	}
	
	var compare = function(chromozome1, chromozome2){
		var fitness = 0;
		var ending1 = chromozome1.substr(chromozome1.length-3, 3);
		var ending2 = chromozome2.substr(chromozome2.length-3, 3);
		if(ending1 == ending2){
			fitness += 150;
		} else if (ending1.substr(1, 2) == ending2.substr(1, 2)){
			fitness += 125;
		} else if(ending1.substr(2, 1) == ending2.substr(2, 1)){
			fitness += 100;
		}
		if(fitness > 0){
			len1 = chromozome1.length;
			len2 = chromozome2.length;
			fitness -= Math.abs(len1 - len2);
		}
		return fitness;
	}
	
	var verseSearch= function(verse, list){
		for (var v in list){
			if(list[v] == verse){
				return true;
			}
		}
		return false;
	}
	
	var neibhours = function(rand, lower, upper, chromozomesPool){
		for(var j = rand-lower; j<chromozomesPool.length && j<=rand+upper; j++){
			
			var distance = compare(verse, chromozomesPool[j]);							
			var previouseDistance = 0;
			
			if(j!=rand){
				previouseDistance = compare(chromozomesPool[rand], chromozomesPool[j]);
			}							
			
			if(distance > previouseDistance){
				keepChromozome = true;
				break;
			}
		}
	}
	
	var chromozomeSelection = function(chromozomesPool){
		var limit = 200;
		if(chromozomesPool.length < limit){
			for(var i=0 ; i<limit && outstanding.length; i++){
				chormozomesPool.push(outstanding.pop());
			}
		}else{
			
			var neibhours = function(rand, lower, upper){
				for(var j = rand-lower; j<chromozomesPool.length && j<=rand+upper; j++){
					
					var distance = compare(verse, chromozomesPool[j]);							
					var previouseDistance = 0;
					
					if(j!=rand){
						previouseDistance = compare(chromozomesPool[rand], chromozomesPool[j]);
					}							
					
					if(distance > previouseDistance){
						keepChromozome = true;
						break;
					}
				}
			}
			
			for(var i = 0; i<outstanding.length; i++){
				var verse = outstanding.pop();
				
				if(!verseSearch(verse, chromozomesPool)){
					var len = chromozomesPool.length;
					var keepChromozome = false; 
					var rand = Math.round(Math.random() * (chromozomesPool.length-1));
					
					switch (rand) {
						case 0 : neibhours(rand, 0, 1); break;
						case 1 : neibhours(rand, 1, 1); break;
						case len : neibhours(rand, 2, 0 ); break;		
						default: neibhours(rand, 2, 1 ); break;
					}
					
					if(keepChromozome){
						chormozomesPool.splice(rand, 0, verse);
					}else{
						//add back
						outstanding.splice(0, 0, verse);
					}
				}
			}		
		}
	}
	
	var mutation = function(chormozomesPool){
		var ratio = Math.floor(0.25 * (chormozomesPool.length-1));
		var neibhours = function(verse, rand, lower, upper){
			var bestDistance = 0;
			var index = 0;
			for(var j = rand-lower; j<chormozomesPool.length && j<=rand+upper; j++){
				if(j != rand){
					var distance = compare(verse, chormozomesPool[j]);													
					if(distance > bestDistance){
						bestDistance = distance;
					}
				}
			}
			return bestDistance;
		}
		
		for(var i=0; i<ratio; i++){
			var rand1 = Math.round(Math.random() * (chormozomesPool.length-1));
			var rand2 = Math.round(Math.random() * (chormozomesPool.length-1));
			var chr = chormozomesPool[rand1];
			var len = chormozomesPool.length;
			
			switch (rand1) {
				case 0 : distance1 = neibhours(chr, rand1, 0, 2); break;
				case 1 : distance1 = neibhours(chr, rand1, 1, 2); break;
				case len-1 : distance1 = neibhours(chr, rand1, 2, 1 ); break;		
				case len : distance1 = neibhours(chr, rand1, 2, 0 ); break;		
				default: distance1 = neibhours(chr, rand1, 2, 2 ); break;
			}		

			switch (rand2) {
				case 0 : distance2 = neibhours(chr, rand2, 0, 1); break;
				case 1 : distance2 = neibhours(chr, rand2, 1, 1); break;
				case len : distance2 = neibhours(chr, rand2, 2, 0 ); break;		
				default: distance2 = neibhours(chr, rand2, 2, 1 ); break;
			}
			
			if(distance2 > distance1){
				//sweep
				chormozomesPool.splice(rand1, 1);
				chormozomesPool.splice(rand2, 0, chr);
			}
		
		}
	}
	
	var stopCriteria = function(chromozomesPool){
		console.log(chromozomesPool);
		console.log(counter);
		return --counter;
	}
	
	var evolvedChromozomes = evolve({
		init : init,
		mating : mating,
		chromozomeSelection : chromozomeSelection,	
		mutation : mutation,				
		stopCriteria : stopCriteria	
	});
	
//	console.log(evolvedChromozomes.outstanding);
//});