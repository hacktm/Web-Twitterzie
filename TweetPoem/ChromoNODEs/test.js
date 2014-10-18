var v = [11,22,33,44]

v.splice(2,1)
console.log(v);



function trim(s){
	return s.replace(/^\s+|\s+$/g, '');
}

console.log(trim('  vdsv  '));