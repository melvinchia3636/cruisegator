// ==UserScript==
// @name        New script - logitravel.co.uk
// @namespace   Violentmonkey Scripts
// @match       https://www.logitravel.co.uk/cruises/cruise-lines/msc-cruises/ships/*
// @grant       none
// @version     1.0
// @author      -
// @description 6/12/2021, 9:59:19 PM
// ==/UserScript==

navigator.clipboard.writeText(JSON.stringify(Object.fromEntries([[document.querySelector('.info-media__title strong').innerText, {service_info: Object.fromEntries(Array.from(document.querySelectorAll('.js-content-tabs:nth-child(2) .ship-details__detail')).map(e => Array.from(e.querySelectorAll('span'))).map(([k, v]) => [k.innerText, ((v.innerText!=='-') &&  !v.innerHTML.includes('cancel')) ? (v.innerText ? parseInt(v.innerText) : true) : false])), interesting_fact: Object.fromEntries(Array.from(document.querySelectorAll('.js-content-tabs:nth-child(3) .ship-details__details-multiple-group')).map(e => [e.querySelector('.ship-details__title').innerHTML, Object.fromEntries(Array.from(e.querySelectorAll('.ship-details__detail-multiple')).map(e => Array.from(e.querySelectorAll('span'))).map(([k, v]) => [k.innerText, ((v.innerText!=='-') &&  !v.innerHTML.includes('cancel')) ? (v.innerText ? parseInt(v.innerText) : true) : false]))]))}]])).match(/\{(.+)\}/)[1]+',');