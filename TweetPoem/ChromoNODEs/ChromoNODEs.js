module.exports.evolve = function(options){
	var Chromozome = options.Chromozome;
	var init = options.init;
	var fitness = options.fitness;
	var fitnessAllowedForMating = options.fitnessAllowedForMating;
	var chromozomeFiltering = options.chromozomeFiltering;
	
	var mating = options.mating;
	var defaultMating = options.defaultMating;
	
	if(defaultMating){
		var chromozomeCombination = options.defaultMating.chromozomeCombination;
		var filterBreed = options.defaultMating.filterBreed;
	}
	
	var mutation = options.mutation;
	var stopCriteria = options.stopCriteria;
	this.chormozomesPool = [];
	var chormozomesPool = this.chormozomesPool;
	
	init(chormozomesPool);
	
	do{
		
		// Calculate fiteness and remove the unfit chromozomes
		if(fitness){
			for(var i =0; i<chormozomesPool.length; i++){
				var fitnessLevel = fitness(chormozomesPool[i], chormozomesPool);
				if(fitnessAllowedForMating > fitnessLevel){
					chormozomesPool.splice(i, 1);
					i--;
				}else{
					chormozomesPool[i].fitness = fitnessLevel;
				}
			}
		}
		
		
		// Custom created filtering for the chromozomes 
		if(chromozomeFiltering){
			chromozomeFiltering(chormozomesPool);
		}
		
		// Mating / Chromozomes combination
		// If specified apply it else leave default
		if(mating){
			mating(chormozomesPool);
		}else if(defaultMating){
			defMating(chormozomesPool);
		}
		 
		var defMating = function(chormozomesPool){
			 
			// Mating / Chromozomes combination
			for(var i=0; i<chormozomesPool.length; i++){
				for(var j=0; j<chormozomesPool.length; j++){
					
					if(chormozomesPool[i] != chormozomesPool[j]){
						var breed = chromozomeCombination(chormozomesPool[i], chormozomesPool[j]);
						if(filterBreed){
							filterBreed(breed);
						}
						
						if(breed instanceof Array){
							if(breed[0].constructor == Chromozome){
								for(var k=0; k<chormozomesPool.length; k++){
									chormozomesPool.push(breed[k]);
								}
							}else{
								throw new Error('Breed type is not Chromozome');	
							}
						}else{
							if(breed.constructor == Chromozome){
								chormozomesPool.push(breed);
							}else{
								throw new Error('Breed type is not Chromozome');
							}
						}
								
					}
				}
			}
		}
		
		// Mutation
		mutation(chormozomesPool);
	
	}while(!stopCriteria(chormozomesPool));
	
	return chormozomesPool;
}
