import{a as w,S as v,i as l}from"./assets/vendor-lDhL-8I6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();async function b(e,r){const s="49525829-4ad651e5c3f704318c87db2e9",i="https://pixabay.com/api/";try{return(await w.get(i,{params:{key:s,q:e,image_type:"photo",orientation:"horizontal",page:r,per_page:15,safesearch:!0}})).data}catch(t){throw t}}const f=document.querySelector(".gallery"),p=document.querySelector(".loader");function S(e){const r=new v(".gallery a",{captionsData:"alt",captionDelay:250});f.innerHTML=x(e),r.refresh(),r.on("closed.simplelightbox",()=>{m()})}function q(){f.innerHTML=""}function P(){p.classList.add("is-active")}function $(){p.classList.remove("is-active")}function H(){c.classList.add("is-active")}function M(){c.classList.remove("is-active")}function x(e){return e.map(({webformatURL:r,largeImageURL:s,tags:i,likes:t,views:o,comments:n,downloads:L})=>`<li class="gallery-item">
            <a class="gallery-link" href="${s}">
              <img class="gallery-image" src="${r}"
              alt="${i.split(", ").slice(0,3).join(", ")}"/></a>
            <table class="gallery-stats"><tr><th>Likes</th><th>Views</th><th>Comments</th><th>Downloads</th></tr><tr>
              <td>${t}</td><td>${o}</td><td>${n}</td><td>${L}</td></tr></table>
           </li>`).join("")}const u=document.querySelector(".form"),h=u.elements["search-text"],c=document.querySelector(".load-more"),E=1,O=15;let d;function m(){h.focus()}function g(e){if(h.value=e,q(),!e){a.remove(),l.warning({message:"Sorry, the request cannot be empty. Please try again!",position:"topRight",timeout:2e3});return}M(),P(),b(e,E).then(r=>{d=r.totalHits,y.handle(),d?(a.set(e),S(r.hits)):(a.remove(),l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3}))}).catch(r=>{l.error({message:`Sorry, there was an "${r}" with your query. Please try again later!`,position:"topRight",timeout:2e3})}).finally($)}function B(){u.addEventListener("submit",e=>{e.target===u&&(e.preventDefault(),g(h.value.trim()))})}const a={init:function(){this.url=new URL(window.location.href),this.params=new URLSearchParams(this.url.search)},update:function(){this.url.search=this.params.toString(),window.history.pushState({},"",`${this.url}`)},get:function(){return this.params.get("q")},set:function(e){this.params.set("q",e),this.update()},remove:function(){this.params.delete("q"),this.update()}},y={init:()=>{c.addEventListener("click",e=>{e.target})},handle:()=>{d>O&&H()}};window.addEventListener("load",m);["click","keydown"].forEach(e=>document.body.addEventListener(e,m));y.init();a.init();a.get()&&g(a.get());B();
//# sourceMappingURL=index.js.map
