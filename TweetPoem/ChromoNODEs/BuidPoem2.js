var evolve = require('./GeNODE.js').evolve;
var tweets = require('../Tweeter/tweet.js').tweets();

var counter = 3;

var testText = function(){
	var chromozome = new Chromozome();
	chromozome.genes = 'Ana are mere';
	chormozomesPool.outstanding.push(chromozome);
	
	var chromozome = new Chromozome();
	chromozome.genes = 'Ana are pere';
	chormozomesPool.outstanding.push(chromozome);
	
	var chromozome = new Chromozome();
	chromozome.genes = 'Tine minte trei cuvint';
	chormozomesPool.outstanding.push(chromozome);
	
	var chromozome = new Chromozome();
	chromozome.genes = 'Vadim Tudor presedinte';
	chormozomesPool.outstanding.push(chromozome);
}

//tweets.then(function(tweets){
	
	var Chromozome = function(){
		this.fitness = 0;
		this.genes = null;
//		this.matches = [];
//		this.index = null;
	};
	
	var init = function(chormozomesPool){
		chormozomesPool.outstanding = [];
		chormozomesPool.specie = '';
		
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
//			chormozomesPool.outstanding.push(chromozome);
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
	
	var chromozomeSelection = function(chromozomesPool){
		
		var limit = 2;
		if(chromozomesPool.length < limit){
			for(var i=0 ; i<limit && chromozomesPool.outstanding.length; i++){
				chormozomesPool.push(chromozomesPool.outstanding.pop());
			}
		}else{
			
			var outstanding = chromozomesPool.outstanding;
			for(var i = 0; i<outstanding.length; i++){
				var chromozome = outstanding[i];
				if(chromozomesPool.indexOf(chromozome) == -1){
					var len = chromozomesPool.length;
					var keepChromozome = false; 
					var rand = Math.round(Math.random() * chromozomesPool.length);
					
					var neibhours = function(lower, upper){
						for(var j = rand-lower; j<=rand+upper; j++){
							var distance = compare(chromozome, chromozomesPool[j]);	
							var previouseDistance = compare(chromozomesPool[j+1], chromozomesPool[j]);
							if(distance > previouseDistance){
								keepChromozome = true;
								break;
							}
						}
					}
					
					switch (rand) {
						case 0 : neibhours(0, 2); break;
						case 1 : neibhours(1, 2); break;
						case len : neibhours(2, 0); break;	
						case len-1 : neibhours(2, 1); break;	
						default: neibhours(2, 2); break;
					}
					
					if(keepChromozome){
						chormozomesPool.splice(rand, 0, chromozome);
						chormozomesPool.outstanding.splice(i, 1);
						i--;
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
	






