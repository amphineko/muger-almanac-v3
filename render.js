/*
	MUGer's Almanac / Dictionary Renderer
	
	Copyright (c) by Naoki Rinmous, published under MIT license.
*/

function random(dayseed, indexseed) {
	var n = dayseed % 11117;
	for (var i = 0; i < 100 + indexseed; i++) {
		n = n * n;
		n = n % 11117;
	}
	return n;
}

var today = new Date();
var iday = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

function generate(size) {
	var good = [], bad = [], flag = random(iday, 24) % 2;
	for (var i = 1; i <= size; i++) {
		var index = random(iday, i) % items.length;
		if (i % 2 == flag) {
			good.push(items[index]);
		} else {
			bad.push(items[index]);
		}
		items.splice(index, 1);
	}
	return {
		good: good,
		bad: bad
	};
}

function createNode(title, reason, imgid) {
	var
		li = document.createElement('li'),
		img = document.createElement('img'),
		h3 = document.createElement('h3'),
		blockquote = document.createElement('blockquote');
	img.setAttribute('src', 'http://static.acfun.mm111.net/dotnet/20130418/umeditor/dialogs/emotion/images/ac/' + imgid + '.gif');
	h3.appendChild(document.createTextNode(title));
	blockquote.appendChild(document.createTextNode(reason));
	li.appendChild(img);
	li.appendChild(h3);
	li.appendChild(blockquote);
	return li;
}

function getImageId(index, len) {
	return random(iday, index) % len;
}

function update(data) {
	var lgood = document.getElementById('good-items'), lbad = document.getElementById('bad-items');
	for (i in data.good) {
		lgood.appendChild(createNode(data.good[i].title, data.good[i].reason[0], getImageId(i, 50) + 1));
	}
	for (i in data.bad) {
		lbad.appendChild(createNode(data.bad[i].title, data.bad[i].reason[1], getImageId(i + 4, 40) + 1));
	}
}

update(generate(8));



function getTodayGame(size) {
	var result = [];
	for (var i = 1; i <= size; i++) {
		var index = random(iday, 64) % games.length;
		result.push(games[index]);
		games.splice(index, 1);
	}
	return result;
}

var date = document.getElementById('date-display'), pgames = getTodayGame(2);
var datestring = '今天是' + today.getFullYear() + '年' + (today.getMonth() + 1) + '月' + today.getDate() + '日';
var gamestring = '适合打' + pgames[0] + '和' + pgames[1];

while (date.firstChild) 
	date.removeChild(date.firstChild);
date.appendChild(document.createTextNode(datestring + ', ' + gamestring));

