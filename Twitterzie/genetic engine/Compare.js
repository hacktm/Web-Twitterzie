var vowels = ['a', 'e', 'i', 'o', 'u']

var size = function(verse){
	var verseTotal = 0;
	for(c in verse){ //every char
		for(v in vowels){ //every vowel
			if( verse[c] == vowels[v] ){
				verseTotal++;
			}
		}
	}
	
	return verseTotal;
}

module.exports.compare = function(chromozome1, chromozome2, index1, index2){
	if(chromozome1.substr(chromozome1.length-4, 4) 
			== chromozome2.substr(chromozome2.length-4, 4)){
		// statisctically this is the same word
		return 0;
	}
	var fitness = 0;
	var ending1 = chromozome1.substr(chromozome1.length-3, 3);
	var ending2 = chromozome2.substr(chromozome2.length-3, 3);
	if(ending1 == ending2){
		fitness += 150;
	} else if (ending1.substr(1, 2) == ending2.substr(1, 2)){
		fitness += 125;
	} 
	else if(ending1.substr(2, 1) == ending2.substr(2, 1)){
		fitness += 50;
	}
	if(fitness > 0){
		len1 = size(chromozome1);
		len2 = size(chromozome2);
		fitness -= Math.abs(len1 - len2);
		if(index1 == index2+1 || index2 == index1+1){
			fitness+=100;
		}
	}
	return fitness;
}

