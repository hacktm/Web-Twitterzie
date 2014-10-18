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
	
//	var promise = q.fcall(function(){ return 'vlad' });
//	do{
//		var p1 = promise.then(function(data){
//			console.log(data);
//			return data+'1';
//		});
//		var p2 = p1.then(function(data){
//			console.log(data);
//			return data+'2';
//		});
//		var promise = p2.then(function(data){
//			console.log(data);
//			return data+'3';
//		});
//	}while(stopCriteria(chormozomesPool));
	
	return chormozomesPool;
}
