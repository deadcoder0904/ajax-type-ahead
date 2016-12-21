document.addEventListener('DOMContentLoaded',function() {
	const CITIES_URL = `https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json`;
	const box = document.getElementById('display-cities-box');
	let citiesData = [];

	fetch(CITIES_URL)
		.then(data => data.json())
		.then(res => citiesData.push(...res));

	const displayData = (input,res) => {
		box.innerHTML = res.map(d => {
					const regex = new RegExp(input, 'gi');
					const state = d.state.replace(regex, `<span class="h">${input}</span>`);
					const city = d.city.replace(regex, `<span class="h">${input}</span>`);
					return `<div class='display-cities'>
										<span>${state}, ${city}</span>
									</div>`
				}).join('');
	};

	const findMatchedCity = (pattern,citiesData) => {
		return citiesData.filter(place => {
			const p = new RegExp(pattern, 'gi');
			return place.state.match(p) || place.city.match(p)
		});
	};

	const city = document.getElementById('city');
	city.addEventListener('keyup', (e) => {
		const input = e.target.value;
		if(input.trim() === '') {
			box.innerHTML = ``;
			return;
		}
		const newData = findMatchedCity(input,citiesData);
		displayData(input,newData);
	});

});
