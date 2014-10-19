module.exports.chormozomesPool = [];

module.exports.evolve = function(options){
	var init = options.init;
	var chromozomeSelection = options.chromozomeSelection;	
	var mutation = options.mutation;
	var keepChromozome = false;
		
	if(chromozomeSelection){
		keepChromozome = chromozomeSelection(module.exports.chormozomesPool);
	}
		
	if(mutation){
		mutation(module.exports.chormozomesPool);
	}
	
//	console.log(module.exports.chormozomesPool);	
		
	return keepChromozome;
}
