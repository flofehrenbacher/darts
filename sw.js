if(!self.define){let e,t={};const s=(s,i)=>(s=new URL(s+".js",i).href,t[s]||new Promise((t=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=t,document.head.appendChild(e)}else e=s,importScripts(s),t()})).then((()=>{let e=t[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(t[c])return;let o={};const a=e=>s(e,c),r={module:{uri:c},exports:o,require:a};t[c]=Promise.all(i.map((e=>r[e]||a(e)))).then((e=>(n(...e),o)))}}define(["./workbox-22294e6b"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/server/middleware-manifest.json",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/147-3956530612fe754b.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/511-41c80caf1dc3367d.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/651.e7ad805f32a091cd.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/670-fb7d92393327c01b.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/942-17e9b015bbaaceab.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/950-eabf7d549cc5a505.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/963-4d65053ab3ccf30c.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/983-09e97b281062acdc.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/bee240a3-c45f1f5c3fb7005f.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/framework-91d7f78b5b4003c8.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/main-dc0809b3288ce384.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/pages/301-b912082e08621ec6.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/pages/_app-97741ba18f928003.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/pages/_error-9734db4c9fd59614.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/pages/cricket-b7857641d3c4c90a.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/pages/edit-player/%5Bid%5D-d622f80f62fdb1a4.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/pages/half-it-fdf0424175d1c4b6.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/pages/hunter-b374d09dbee39019.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/pages/index-aa58ef9970d186c4.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/chunks/webpack-893a8e91b4d17cd0.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/css/7ca48e219cf234b9.css",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/hgoUfQmtc9fCoMxeiwWqt/_buildManifest.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/hgoUfQmtc9fCoMxeiwWqt/_middlewareManifest.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/hgoUfQmtc9fCoMxeiwWqt/_ssgManifest.js",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/media/revicons.652e7269.eot",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/media/revicons.b96bdb22.ttf",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/_next/static/media/revicons.ff59b316.woff",revision:"hgoUfQmtc9fCoMxeiwWqt"},{url:"/logo.ico",revision:"315799a9f830c24d589073e2b489f478"},{url:"/logo192.png",revision:"9dabc7166f18a1bf46dc106f9d239242"},{url:"/logo512.png",revision:"7c7557265a0dd5371930b8b9a68dd1a9"},{url:"/manifest.json",revision:"869d545f897a85d59143ff111642d077"},{url:"/robots.txt",revision:"fa1ded1ed7c11438a9b0385b1e112850"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:t,event:s,state:i})=>t&&"opaqueredirect"===t.type?new Response(t.body,{status:200,statusText:"OK",headers:t.headers}):t}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const t=e.pathname;return!t.startsWith("/api/auth/")&&!!t.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
