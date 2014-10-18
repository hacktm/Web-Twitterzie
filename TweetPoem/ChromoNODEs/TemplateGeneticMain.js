var evolve = require('./ChromoNODEs.js').evolve;
var evolveSpecie = function(){
	
	// Other context data,
	// evolve runs in a closure
	
	evolve(
			{
				Chromozome : function(){ },
				
				fitness : function(chromozome, chormozomesPool){ },
				
				fitnessAllowedForMating : 0.5,
				
				chromozomeFiltering : function(chormozomesPool){ },
				
				mating : function(chormozomesPool){ },
				
				defaultMating : {
					chromozomeCombination : function(chromozome1, chromozome2){ },
					filterBreed : function(breed){ }
				},
			
				mutation : function(chormozomesPool){ },
				
				init : function(chormozomesPool){ },
				
				stopCriteria : function(chromozomesPool){ }
				
			}
	);
};

evolveSpecie();

