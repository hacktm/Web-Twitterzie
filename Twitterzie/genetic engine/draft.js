var q = require('q');

//var promise = q.fcall(function(){ return 'vlad' });
//
//promise.then(function(data, err){
//	console.log(data);
//});

var promise = q.fcall(function(){ return 'vlad' });
var i = 6;
while(i--){
	var p1 = promise.then(function(data){
		console.log(data);
		return data+'1';
	});
	var p2 = p1.then(function(data){
		console.log(data);
		return data+'2';
	});
	var promise = p2.then(function(data){
		console.log(data);
		return data+'3';
	});
}


function(v){
	
	
	tweet()
	
}



//var v = [11,22,33,44]
//
//v.splice(2,1)
//console.log(v);
//
//
//
//function trim(s){
//	return s.replace(/^\s+|\s+$/g, '');
//}
//
//console.log(trim('  vdsv  '));