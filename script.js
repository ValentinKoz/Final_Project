"use strict";

var form = document.getElementById('tab');
var elems = form.querySelectorAll("div[class^='card']");
var elemsList = Array.prototype.slice.call(elems);
var frontElems = form.querySelectorAll('.front');
var PlayAgain = document.querySelector('button');
var setTimer = 0;

PlayAgain.addEventListener('click', function(){
	replay();
})

function replay(){

	document.getElementById('minute').innerHTML = '01';
	document.getElementById('second').innerHTML = '00';
	var mod = document.getElementById('modalWin');
	mod.style.display = "none";
	setTimer = 0;

	elemsList = elemsList.map(function(elementOfMap){

		elementOfMap.classList.remove('noneActive');
		elementOfMap.classList.remove('equally');
		elementOfMap.classList.remove('notEqually');
		elementOfMap.classList.remove('flip');
		return elementOfMap;
	});
	clearRandom();
}

function clickToFlip(){
	
	for(let i = 0; i < elemsList.length; i++){
		elemsList[i].addEventListener('click', function (){
			elemsList[i].classList.toggle('flip');
		})
	}
}

function twoEqual(one){

	var frontCurrent0 = one.querySelector('.front');
	frontCurrent0.style.background = '#5AD66F';
	one.classList.remove('notEqually');
	one.classList.remove('flip');
	one.classList.add('noneActive');
	one.classList.add('equally');
}

function twoNotEqual(one){

	one.classList.add('notEqually');
	one.classList.add('noneActive');
	var frontCurrent1 = one.querySelector('.front');
	frontCurrent1.style.background = '#f44336';
}

function threeNotEqual(one){

	one.classList.remove('notEqually');
	one.classList.remove('noneActive');
	one.classList.remove('flip');
}

function Win(){

	var equalNum = form.querySelectorAll('.equally');
	equalNum = Array.prototype.slice.call(equalNum);

		if(equalNum.length === 12){
			clearInterval(intervalID);
			var mod = document.getElementById('modalWin');
			var result = mod.querySelectorAll('span');
		    result = Array.prototype.slice.call(result);
		    result[0].innerHTML = 'W';
		    result[1].innerHTML = 'i';
		    result[2].innerHTML = 'n';
		    result[3].innerHTML = '';
            mod.style.display = "block";
		}
}

function clearRandom(){

	for(var i = 0; i < elemsList.length; i++){
		frontElems[i].innerHTML = '';
		elemsList[i].classList.remove(elemsList[i].classList[1]);
	}
	random();
}

function random(){

	var massiv = [['🐸',0],['🐻',0],['🐹',0],['🐶',0],['🐷',0],['🐺',0]];

	for(var i = 0; i < elemsList.length; i++){
		while(elemsList[i].classList.length < 2){

			var randVar = Math.floor(Math.random()*6);

			if(massiv[randVar][1] != 2){

				frontElems[i].innerHTML = massiv[randVar][0];
				elemsList[i].classList.add(massiv[randVar][0]);
				massiv[randVar][1]++;
		    }
		}
	}

}


form.addEventListener('click',function(){

	var current = form.querySelectorAll('.flip');
	var current = Array.prototype.slice.call(current);

	switch(current.length){
		case 3:

		    var redCard = form.querySelectorAll('.notEqually');
		    threeNotEqual(redCard[0]);
			threeNotEqual(redCard[1]);
		    current[0] = current[0].querySelector('.front');
		    current[1] = current[1].querySelector('.front');
		    current[2] = current[2].querySelector('.front');
		    current[0].style.background = "white";
		    current[1].style.background = "white";
		    current[2].style.background = "white";
		    break;
	
	    case 2:
		    if(current[0].classList[1] == current[1].classList[1]){
			    twoEqual(current[0]);
			    twoEqual(current[1]);
			    Win();
		    }
		    else{
			    twoNotEqual(current[0]);
			    twoNotEqual(current[1]);
		    }
		    break;
	
	    case 1:
		    if(setTimer===0){
			    window.intervalID = window.setInterval(time,1000);
			    setTimer++;
	        }
		    current[0] = current[0].querySelector('.front');
		    current[0].style.background = "white";
	        break;
	}
})

function time(){

	var minute = document.getElementById('minute').innerHTML;
	var second = document.getElementById('second').innerHTML;
	var theEnd = false;

	if(second > 0) second--;
	else {
		second = 59;
		if(minute > 0) minute--;
		else theEnd = true;
	}
	
	if(theEnd){
		clearInterval(intervalID);
		var mod = document.getElementById('modalWin');
		var result = mod.querySelectorAll('span');
		result = Array.prototype.slice.call(result);
		result[0].innerHTML = 'L';
		result[1].innerHTML = 'o';
		result[2].innerHTML = 's';
		result[3].innerHTML = 'e';
		mod.style.display = "block";
	}
	else{
		if(String(minute).length == 1 && minute < 10)
			document.getElementById('minute').innerHTML = '0'+minute;
		else
			document.getElementById('minute').innerHTML = minute;
		
		if(String(second).length == 1 && second < 10)
			document.getElementById('second').innerHTML = '0' +second;
		else
			document.getElementById('second').innerHTML = second;
	}
}

