module.exports.evolve = function(options){
	var Chromozome = options.Chromozome;
	var init = options.init;
	var chromozomeSelection = options.chromozomeSelection;	
	var mating = options.mating;
	var mutation = options.mutation;
	var stopCriteria = options.stopCriteria;
	this.chormozomesPool = [];
	var chormozomesPool = this.chormozomesPool;

	if(init){
		init(chormozomesPool);
	}

	do{
		if(mating){
			mating(chormozomesPool);
		}
		
		if(chromozomeSelection){
			chromozomeSelection(chormozomesPool);
		}
		
		if(mutation){
			mutation(chormozomesPool);
		}
	}while(stopCriteria(chormozomesPool));
	
	return chormozomesPool;
}
