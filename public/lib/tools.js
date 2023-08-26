//This file contains code that is useful across multiple pages


//Variables

var masterSpeed = 1;

var swapSpeed = 20;
var updateSpeed = 1000 / 45; //time between updates - 45 times per second
var delaySpeed1 = 1000;


function ArrayElement(value){
	this.value = value;
	this.x = 0;
	this.y = 0;
}


function assignPositionsInGrid(a, sw, ew, eh, m){
	//each row should have (sw - (2 * m)) / (ew * 1.5) elements
	let rowCount = Math.floor((sw - (2 * m)) / (ew * 1.5));
	var row = 0;
	for(let i = 0; i < a.length; i++){
		row = Math.floor(i / rowCount);
		var currentEl = a[i];
		var horizontalPosition = i - (row * rowCount);
		currentEl.x = m + (horizontalPosition * ew * 1.5);
		currentEl.y = m + (row * eh * 1.5);
	}			
}

function randomArrayPopulation(a, number, lowerLimit, upperLimit){
	for(let i = 0; i < number; i++){
		let n = Math.floor(Math.random() * (upperLimit - lowerLimit)) + lowerLimit;
		a.push(new ArrayElement(n));
	}
}

//For swapping array elements
function swapElements(el1, el2, next){ 
	let dist = Math.sqrt(Math.pow(el1.x - el2.x, 2) + Math.pow(el1.y - el2.y, 2));
	let time = (dist / (swapSpeed * masterSpeed)) * (updateSpeed);
	time *= 1.5;
	if(time < (delaySpeed1 / masterSpeed)){
		time = (delaySpeed1 / masterSpeed); 
	}		
	let x1 = el1.x;
	let x2 = el2.x;
	let y1 = el1.y;
	let y2 = el2.y;
	moveElement(el1, x2, y2);
	moveElement(el2, x1, y1);
	setTimeout(() => {next()}, time*1.5);
}

//For moving an element to a particular position
function moveElement(el, targetX, targetY){
	let s = swapSpeed * masterSpeed;
			
	let xDiff = targetX - el.x;
			let yDiff = targetY - el.y;
			
			
			if(xDiff == 0 && yDiff == 0){
				return;
			}else{
				let hypo = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
			
				if (hypo < s){
					s = hypo;
				}
			
				let theta = Math.atan(yDiff/xDiff);
				
				if(el.y < targetY){
					el.y += s * Math.abs(Math.sin(theta));
				}else{
					el.y -= s * Math.abs(Math.sin(theta));
				}
				if(el.x < targetX){
					el.x += s * Math.abs(Math.cos(theta));
				}else{
					el.x -= s * Math.abs(Math.cos(theta));
				}
				setTimeout(() => {moveElement(el, targetX, targetY)}, updateSpeed);
			}
			
			
		}
		
		
//Code for graphs

function swap(a, i, j){
	let temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}

function partition(a, low, high, comparator){
	let i = low - 1;
	
	for(let j = low; j < high; j++){
		if(comparator(a, j, high)){
			i++;
			swap(a, i, j);
		}
	}
	swap(a, i + 1, high);
	return i + 1;

}

function quickSort(a, low, high, comparator){
	if(low < high){
		let pi = partition(a, low, high, comparator);
		quickSort(a, low, pi - 1, comparator);
		quickSort(a, pi + 1, high, comparator);
	}
}

function Node(value) {
	this.value = value;
	this.x = 0;
	this.y = 0;
}

function Edge(src, dest, weight){ //Edge is stored 
	this.src = src;
	this.dest = dest;
	this.weight = weight;
}

class Graph {
	constructor(){
		this.nodes = [];
		this.edges = [];
	}
	addNode(val){
		let n = new Node(val);
		this.nodes.push(n);
	}
	addEdge(index1, index2, weight){
		let e = new Edge(index1, index2, weight);
		this.edges.push(e);
	}
}



