(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[489],{7942:function(e,n,t){"use strict";var r=t(3848);n.default=void 0;var o,a=(o=t(7294))&&o.__esModule?o:{default:o},u=t(4957),i=t(9898),c=t(639);var f={};function l(e,n,t,r){if(e&&u.isLocalURL(n)){e.prefetch(n,t,r).catch((function(e){0}));var o=r&&"undefined"!==typeof r.locale?r.locale:e&&e.locale;f[n+"%"+t+(o?"%"+o:"")]=!0}}var s=function(e){var n,t=!1!==e.prefetch,o=i.useRouter(),s=a.default.useMemo((function(){var n=u.resolveHref(o,e.href,!0),t=r(n,2),a=t[0],i=t[1];return{href:a,as:e.as?u.resolveHref(o,e.as):i||a}}),[o,e.href,e.as]),d=s.href,v=s.as,p=e.children,h=e.replace,y=e.shallow,b=e.scroll,m=e.locale;"string"===typeof p&&(p=a.default.createElement("a",null,p));var _=(n=a.default.Children.only(p))&&"object"===typeof n&&n.ref,w=c.useIntersection({rootMargin:"200px"}),E=r(w,2),g=E[0],L=E[1],M=a.default.useCallback((function(e){g(e),_&&("function"===typeof _?_(e):"object"===typeof _&&(_.current=e))}),[_,g]);a.default.useEffect((function(){var e=L&&t&&u.isLocalURL(d),n="undefined"!==typeof m?m:o&&o.locale,r=f[d+"%"+v+(n?"%"+n:"")];e&&!r&&l(o,d,v,{locale:n})}),[v,d,L,m,t,o]);var k={ref:M,onClick:function(e){n.props&&"function"===typeof n.props.onClick&&n.props.onClick(e),e.defaultPrevented||function(e,n,t,r,o,a,i,c){("A"!==e.currentTarget.nodeName||!function(e){var n=e.currentTarget.target;return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)&&u.isLocalURL(t))&&(e.preventDefault(),null==i&&r.indexOf("#")>=0&&(i=!1),n[o?"replace":"push"](t,r,{shallow:a,locale:c,scroll:i}))}(e,o,d,v,h,y,b,m)},onMouseEnter:function(e){u.isLocalURL(d)&&(n.props&&"function"===typeof n.props.onMouseEnter&&n.props.onMouseEnter(e),l(o,d,v,{priority:!0}))}};if(e.passHref||"a"===n.type&&!("href"in n.props)){var C="undefined"!==typeof m?m:o&&o.locale,I=o&&o.isLocaleDomain&&u.getDomainLocale(v,C,o&&o.locales,o&&o.domainLocales);k.href=I||u.addBasePath(u.addLocale(v,C,o&&o.defaultLocale))}return a.default.cloneElement(n,k)};n.default=s},639:function(e,n,t){"use strict";var r=t(3848);Object.defineProperty(n,"__esModule",{value:!0}),n.useIntersection=function(e){var n=e.rootMargin,t=e.disabled||!u,c=o.useRef(),f=o.useState(!1),l=r(f,2),s=l[0],d=l[1],v=o.useCallback((function(e){c.current&&(c.current(),c.current=void 0),t||s||e&&e.tagName&&(c.current=function(e,n,t){var r=function(e){var n=e.rootMargin||"",t=i.get(n);if(t)return t;var r=new Map,o=new IntersectionObserver((function(e){e.forEach((function(e){var n=r.get(e.target),t=e.isIntersecting||e.intersectionRatio>0;n&&t&&n(t)}))}),e);return i.set(n,t={id:n,observer:o,elements:r}),t}(t),o=r.id,a=r.observer,u=r.elements;return u.set(e,n),a.observe(e),function(){u.delete(e),a.unobserve(e),0===u.size&&(a.disconnect(),i.delete(o))}}(e,(function(e){return e&&d(e)}),{rootMargin:n}))}),[t,n,s]);return o.useEffect((function(){if(!u&&!s){var e=a.requestIdleCallback((function(){return d(!0)}));return function(){return a.cancelIdleCallback(e)}}}),[s]),[v,s]};var o=t(7294),a=t(6286),u="undefined"!==typeof IntersectionObserver;var i=new Map},3249:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/hunter",function(){return t(3670)}])},1664:function(e,n,t){e.exports=t(7942)},266:function(e,n,t){"use strict";function r(e,n,t,r,o,a,u){try{var i=e[a](u),c=i.value}catch(f){return void t(f)}i.done?n(c):Promise.resolve(c).then(r,o)}function o(e){return function(){var n=this,t=arguments;return new Promise((function(o,a){var u=e.apply(n,t);function i(e){r(u,o,a,i,c,"next",e)}function c(e){r(u,o,a,i,c,"throw",e)}i(void 0)}))}}t.d(n,{Z:function(){return o}})},37:function(e,n,t){"use strict";t.d(n,{Z:function(){return a}});var r=t(6586);var o=t(6988);function a(e){return function(e){if(Array.isArray(e))return(0,r.Z)(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||(0,o.Z)(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}}},function(e){e.O(0,[942,670,774,888,179],(function(){return n=3249,e(e.s=n);var n}));var n=e.O();_N_E=n}]);