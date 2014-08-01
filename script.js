var items = [
	/* { title: '拒绝围巾', reason: ['否则你一整天都会坐过站', '拒绝之后你会长时间得到一个"围巾Buff"'] }, */
	{ title: '尝试全机种FC', reason: ['你推分将有如神助', '总感觉手感不是很好'] },
	{ title: '带妹子出勤', reason: ['两人联机不会有路人打扰', '总是会有路人阻止你们联机'] },
	{ title: '下班后出勤', reason: ['你在机厅里疯跑也不会撞到人', '你等了很久才排上队'] },
	{ title: '带iPad上厕所', reason: ['成功地在马桶盖上收歌', '你的妈妈莫名听见厕所里有人嚎哭'] },
	{ title: '大面积交配', reason: ['...?', '...?'] },
	{ title: '打灼热和Plan8', reason: ['你也许能够推分', '你可能会甩飞盘子'] },
	{ title: '收歌', reason: ['围观的妹子会向你表白', '你疯狂的样子给喜欢你的妹子留下了不好的印象'] },
	{ title: '在机厅勾搭妹子', reason: ['有机会认识新的妹触', '你会被当作变态'] },
	{ title: '课金11连', reason: ['你有很大机会抽到UR', '你只能得到一大堆R'] }
];

var games = ['jubear', 'IIDX', '小粉饼', 'DE', 'RB', 'maimai', '太鼓', 'Deemo', 'Cytus', 'O2JAM', 'DM'];

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

function createNode(title, reason) {
	/*
		<li>
			<h3>拒绝围巾</h3>
			<blockquote>不然可能你会坐过站</blockquote>
		</li>
	*/
	var li = document.createElement('li'), h3 = document.createElement('h3'), blockquote = document.createElement('blockquote');
	h3.appendChild(document.createTextNode(title));
	blockquote.appendChild(document.createTextNode(reason));
	li.appendChild(h3);
	li.appendChild(blockquote);
	return li;
}

function update(data) {
	console.log(data);
	var lgood = document.getElementById('good-items'), lbad = document.getElementById('bad-items'), i;
	data.good.splice(1, 1);
	for (i in data.good) {
		lgood.appendChild(createNode(data.good[i].title, data.good[i].reason[0]));
	}
	for (i in data.bad) {
		lbad.appendChild(createNode(data.bad[i].title, data.bad[i].reason[1]));
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

