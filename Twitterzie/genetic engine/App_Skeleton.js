chormozomesPool = [];

module.exports.evolve = function(options){
	var Chromozome = options.Chromozome;
	var init = options.init;
	var chromozomeSelection = options.chromozomeSelection;	
	var mating = options.mating;
	var mutation = options.mutation;
	var stopCriteria = options.stopCriteria;
		
	if(chromozomeSelection){
		chromozomeSelection(chormozomesPool);
	}
		
	if(mutation){
		mutation(chormozomesPool);
	}
	
	console.log(chormozomesPool);	
		
	return chormozomesPool;
}
