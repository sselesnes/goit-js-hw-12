import{a as b,S,i as d}from"./assets/vendor-lDhL-8I6.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function n(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=n(t);fetch(t.href,o)}})();async function q(e,r){const n="49525829-4ad651e5c3f704318c87db2e9",i="https://pixabay.com/api/";try{return(await b.get(i,{params:{key:n,q:e,image_type:"photo",orientation:"horizontal",page:r,per_page:g,safesearch:!0}})).data}catch(t){throw t}}const p=document.querySelector(".gallery"),f=document.querySelector(".loader");function P(e){const r=new S(".gallery a",{captionsData:"alt",captionDelay:250});p.insertAdjacentHTML("beforeend",B(e)),r.refresh(),r.on("closed.simplelightbox",()=>{l.focus()})}function $(){p.innerHTML=""}function H(){f.classList.add("is-active")}function M(){f.classList.remove("is-active")}function x(){u.classList.add("is-active")}function R(){u.classList.remove("is-active")}function B(e){return e.map(({webformatURL:r,largeImageURL:n,tags:i,likes:t,views:o,comments:c,downloads:v})=>`<li class="gallery-item">
            <a class="gallery-link" href="${n}">
              <img class="gallery-image" src="${r}"
              alt="${i.split(", ").slice(0,3).join(", ")}"/></a>
            <table class="gallery-stats"><tr><th>Likes</th><th>Views</th><th>Comments</th><th>Downloads</th></tr><tr>
              <td>${t}</td><td>${o}</td><td>${c}</td><td>${v}</td></tr></table>
           </li>`).join("")}let h,s=1;const m=document.querySelector(".form"),g=15,l=m.elements["search-text"],u=document.querySelector(".load-more"),C=()=>{const r=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollTo({top:window.scrollY+2*r,behavior:"smooth"})},y=e=>{if(l.value=e,$(),!e){a.remove(),d.warning({message:"Sorry, the request cannot be empty. Please try again!",position:"topRight",timeout:2e3});return}w(e)},w=e=>{R(),H(),q(e,s).then(r=>{h=r.totalHits,L.handle(),h?(a.set(e),P(r.hits),s>1&&C()):(a.remove(),d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",timeout:2e3}))}).catch(r=>{d.error({message:`Sorry, there was an "${r}" with your query. Please try again later!`,position:"topRight",timeout:2e3})}).finally(M)},E=()=>{m.addEventListener("submit",e=>{e.target===m&&(e.preventDefault(),a.remove(),s=1,y(l.value.trim()))})},a={init:function(){this.url=new URL(window.location.href),this.params=new URLSearchParams(this.url.search)},update:function(){this.url.search=this.params.toString(),window.history.pushState({},"",`${this.url}`)},get:function(){return s=this.params.get("p")??s,this.params.get("q")},set:function(e){this.params.set("q",e),s!==1&&this.params.set("p",s),this.update()},remove:function(){this.params.delete("q"),this.params.delete("p"),this.update()}},L={init:()=>{u.addEventListener("click",e=>{e.target===u&&(s++,w(l.value))})},handle:()=>{h>g*s&&x()}};["load","keydown"].forEach(e=>window.addEventListener(e,()=>l.focus()));a.init();L.init();a.get()&&y(a.get());E();
//# sourceMappingURL=index.js.map
