import{a as S,S as q,i as l}from"./assets/vendor-lDhL-8I6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();async function P(e,r){const n="49525829-4ad651e5c3f704318c87db2e9",i="https://pixabay.com/api/";try{return(await S.get(i,{params:{key:n,q:e,image_type:"photo",orientation:"horizontal",page:r,per_page:y,safesearch:!0}})).data}catch(t){throw t}}const p=document.querySelector(".gallery"),g=document.querySelector(".loader"),$=new q(".gallery a",{captionsData:"alt",captionDelay:250});function H(e){p.insertAdjacentHTML("beforeend",C(e)),a>1&&E(),$.refresh()}function M(){p.innerHTML=""}function R(){g.classList.add("is-active")}function x(){g.classList.remove("is-active")}function B(){u.classList.add("is-active")}function f(){u.classList.remove("is-active")}function C(e){return e.map(({webformatURL:r,largeImageURL:n,tags:i,likes:t,views:o,comments:c,downloads:b})=>`<li class="gallery-item">
            <a class="gallery-link" href="${n}">
              <img class="gallery-image" src="${r}"
              alt="${i.split(", ").slice(0,3).join(", ")}"/></a>
            <table class="gallery-stats"><tr><th>Likes</th><th>Views</th><th>Comments</th><th>Downloads</th></tr><tr>
              <td>${t}</td><td>${o}</td><td>${c}</td><td>${b}</td></tr></table>
           </li>`).join("")}function E(){const r=p.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollTo({top:window.scrollY+2*r,behavior:"smooth"})}const m=document.querySelector(".form"),h=m.elements["search-text"],u=document.querySelector(".load-more"),y=15;let a=1,d;const w=e=>{if(h.value=e,M(),!e){s.remove(),l.warning({message:"Sorry, the request cannot be empty. Please try again!",position:"topRight",timeout:2e3});return}L(e)},L=e=>{f(),R(),P(e,a).then(r=>{d=r.totalHits,v.handle(),d?(s.set(e),H(r.hits)):(s.remove(),l.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3}))}).catch(r=>{l.error({message:`Sorry, there was an "${r}" with your query. Please try again later!`,position:"topRight",timeout:2e3})}).finally(x)},O=()=>{m.addEventListener("submit",e=>{e.target===m&&(e.preventDefault(),s.remove(),a=1,w(h.value.trim()))})},s={init:function(){this.url=new URL(window.location.href),this.params=new URLSearchParams(this.url.search)},update:function(){this.url.search=this.params.toString(),window.history.pushState({},"",`${this.url}`)},get:function(){return a=this.params.get("p")??a,this.params.get("q")},set:function(e){this.params.set("q",e),a!==1&&this.params.set("p",a),this.update()},remove:function(){this.params.delete("q"),this.params.delete("p"),this.update()}},v={init:()=>{u.addEventListener("click",e=>{e.target===u&&(a++,L(h.value))})},handle:()=>{d>y*a?B():(f(),d&&l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:2e3}))}};["load","keydown"].forEach(e=>window.addEventListener(e,()=>h.focus()));s.init();v.init();s.get()&&w(s.get());O();
//# sourceMappingURL=index.js.map
