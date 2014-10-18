var evolve = require('./GeNODE.js').evolve;
var tweets = require('../Tweeter/tweet.js').tweets();

var counter = 3;

var testText = function(){
	var chromozome = new Chromozome();
	chromozome.genes = 'zero';
	outstanding.push(chromozome);
	
	var chromozome = new Chromozome();
	chromozome.genes = 'unu';
	outstanding.push(chromozome);
	
	var chromozome = new Chromozome();
	chromozome.genes = 'doi';
	outstanding.push(chromozome);
	
	var chromozome = new Chromozome();
	chromozome.genes = 'trei';
	outstanding.push(chromozome);
	
	var chromozome = new Chromozome();
	chromozome.genes = 'patru';
	outstanding.push(chromozome);
}

//tweets.then(function(tweets){
	
	var Chromozome = function(){
		this.fitness = 0;
		this.genes = null;
//		this.matches = [];
//		this.index = null;
	};
	
	var init = function(chormozomesPool){
		outstanding = [];
//		chormozomesPool.specie = '';
		
//		for(var tweet in tweets){
//			// TO DO : Scoatem tweeturile ce contin lincuri
//			var chromozome = new Chromozome();
//			chromozome.genes = tweet.text;
//			chormozomesPool.push(chromozome);
//		}
	};
	
	var mating = function(chromozomesPool){
		testText();
//		for(var tweet in tweets){
//			// TO DO : Scoatem tweeturile ce contin lincuri
//			var chromozome = new Chromozome();
//			chromozome.genes = tweet.text;
//			outstanding.push(chromozome);
//		}
	}
	
	var compare = function(chromozome1, chromozome2){
		var fitness = 0;
		var ending1 = chromozome1.genes.substr(chromozome1.genes.length-3, 3);
		var ending2 = chromozome2.genes.substr(chromozome2.genes.length-3, 3);
		if(ending1 == ending2){
			fitness += 150;
		} else if (ending1.substr(1, 2) == ending2.substr(1, 2)){
			fitness += 125;
		} else if(ending1.substr(2, 1) == ending2.substr(2, 1)){
			fitness += 100;
		}
		if(fitness > 0){
			len1 = chromozome1.genes.length;
			len2 = chromozome2.genes.length;
			fitness -= Math.abs(len1 - len2);
			
			if(chromozome1.fitness < fitness){
				chromozome1.fitness = fitness;
			}
			if(chromozome2.fitness < fitness){
				chromozome2.fitness = fitness;
			}
//			chromozome1.matches.push(chromozome2);
//			chromozome2.matches.push(chromozome1);
		}
		return fitness;
	}
	
	var verseSearch= function(verse, list){
		for (var v in list){
			if(list[v].genes == verse.genes){
				return true;
			}
		}
		return false;
	}
	
	var chromozomeSelection = function(chromozomesPool){
		
		var limit = 2;
		if(chromozomesPool.length < limit){
			for(var i=0 ; i<limit && outstanding.length; i++){
				chormozomesPool.push(outstanding.pop());
			}
		}else{
			for(var i = 0; i<outstanding.length; i++){			
				var verse = outstanding.pop();
				
				if(!verseSearch(verse, chromozomesPool)){
					var len = chromozomesPool.length;
					var keepChromozome = false; 
					var rand = Math.round(Math.random() * chromozomesPool.length);
					
					var neibhours = function(lower, upper){
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
					
					switch (rand) {
						case 0 : neibhours(0, 1); break;
						case 1 : neibhours(1, 1); break;
						case len : neibhours(2, 0); break;		
						default: neibhours(2, 1); break;
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

		console.log(chromozomesPool);
	}
	
	var mutation = function(chormozomesPool){
		
	}
	
	var stopCriteria = function(chromozomesPool){
		console.log(counter);
		return --counter;
	}
	
	var evolvedChromozomes = evolve({
		Chromozome : Chromozome,
		init : init,
		mating : mating,
		chromozomeSelection : chromozomeSelection,	
		mutation : mutation,				
		stopCriteria : stopCriteria	
	});
	
//	console.log(evolvedChromozomes.outstanding);
//});
	






