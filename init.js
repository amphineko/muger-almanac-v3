/*
	MUGer's Almanac / Script Loader
	
	Copyright (c) by Naoki Rinmous, published under MIT license.
*/

function __loadScript(url) {
	var script = document.createElement('script');
	script.setAttribute('src', url + '?r=' + Math.random());
	document.body.appendChild(script);
}

console.log('~ View-source is a feature ~');

__loadScript('dict.js');
