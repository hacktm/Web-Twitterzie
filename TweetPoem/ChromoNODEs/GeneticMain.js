var evolve = require('./ChromoNODEs.js').evolve;
var tweets = require('../Tweeter/tweet.js').tweets();

tweets.then(function(tweets){
	
	var Chromozome = function(){
		this.fitness = 0;
		this.genes = null;
		this.matches = [];
	};
	
	var init = function(chormozomesPool){
		for(var i=0; i<tweets.length; i++){
			var chromozome = new Chromozome();
			chromozome.genes = tweets[i].text;
			chormozomesPool.push(chromozome);
		}
		/*
		var chromozome = new Chromozome();
		chromozome.genes = 'Ana are mere';
		chormozomesPool.push(chromozome);
		
		var chromozome = new Chromozome();
		chromozome.genes = 'Ana are pere';
		chormozomesPool.push(chromozome);
		
		var chromozome = new Chromozome();
		chromozome.genes = 'Tine minte trei cuvint';
		chormozomesPool.push(chromozome);
		
		var chromozome = new Chromozome();
		chromozome.genes = 'Vadim Tudor presedinte';
		chormozomesPool.push(chromozome);
		*/
	};
	
	var chromozomeFiltering = function(chromozomesPool){
		var compareChromozomes = function(chromozome1, chromozome2){
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
				fitness -= len1 >= len2 ? len1 - len2 : len2 - len1 ;
				
				if(chromozome1.fitness < fitness){
					chromozome1.fitness = fitness;
				}
				if(chromozome2.fitness < fitness){
					chromozome2.fitness = fitness;
				}
				chromozome1.matches.push(chromozome2);
				chromozome2.matches.push(chromozome1);
			}
			return fitness;
		}
		
		var len = 1;
		for(var i in chromozomesPool){
			for(var j=len; j<chromozomesPool.length; j++){
				compareChromozomes(chromozomesPool[i], chromozomesPool[j]);
			}
			len++;
		}
		
		for(var i=0; i<chromozomesPool.length; i++){
			if(chromozomesPool[i].fitness == 0){
				chromozomesPool.splice(i, 1);
				i--;
			}
		}
		
//		console.log(chormozomesPool);
	};
	
	var mutation = function(chormozomesPool){
		
	}
	
	var stopCriteria = function(chromozomesPool){
		return true;
	}
	
	var evolvedChromozomes = evolve({
		Chromozome : Chromozome,
		init : init,
		chromozomeFiltering : chromozomeFiltering,			
		mutation : mutation,				
		stopCriteria : stopCriteria	
	});
	
	console.log(evolvedChromozomes);
});
	






