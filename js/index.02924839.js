(function(e){function n(n){for(var r,u,a=n[0],i=n[1],s=n[2],l=0,p=[];l<a.length;l++)u=a[l],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&p.push(o[u][0]),o[u]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);f&&f(n);while(p.length)p.shift()();return c.push.apply(c,s||[]),t()}function t(){for(var e,n=0;n<c.length;n++){for(var t=c[n],r=!0,a=1;a<t.length;a++){var i=t[a];0!==o[i]&&(r=!1)}r&&(c.splice(n--,1),e=u(u.s=t[0]))}return e}var r={},o={index:0},c=[];function u(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.m=e,u.c=r,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)u.d(t,r,function(n){return e[n]}.bind(null,r));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],i=a.push.bind(a);a.push=n,a=a.slice();for(var s=0;s<a.length;s++)n(a[s]);var f=i;c.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";t("85ec")},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("button",{on:{click:e.scan}},[e._v("扫一扫")]),t("div",[e._v("result: "+e._s(e.result))])])},c=[],u=t("18a0"),a=t.n(u),i={name:"App",components:{},data:function(){return{result:""}},created:function(){a.a.config({debug:!0,appId:"wxd8c2f7f1955ab6ba",timestamp:1634865805,nonceStr:"0a9f3543034144578a14349de1451741",signature:"c753b6e1cdea9a8794b8e7bcf568be1e100eca05",jsApiList:["checkJsApi","scanQRCode"]}),a.a.error((function(e){alert("出错了："+e.errMsg)}))},methods:{scan:function(){a.a.scanQRCode({needResult:1,scanType:["qrCode"],success:function(e){this.result=e.resultStr}})}}},s=i,f=(t("034f"),t("2877")),l=Object(f["a"])(s,o,c,!1,null,null,null),p=l.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(p)}}).$mount("#app")},"85ec":function(e,n,t){}});
//# sourceMappingURL=index.02924839.js.map