webpackJsonp([1],{iyRz:function(n,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=l("WT6e"),o=function(){},e=l("bfOx"),i=l("OE0E"),r=function(){function n(n){this._title=n,this._title.setTitle("\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f")}return n.prototype.ngOnInit=function(){},n}(),s=u._0({encapsulation:2,styles:[],data:{}});function c(n){return u._24(0,[(n()(),u._2(0,16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),u._1(1,212992,null,0,e.p,[e.b,u.M,u.j,[8,null],u.h],null,null),(n()(),u._22(-1,null,["\n"]))],function(n,t){n(t,1,0)},null)}var a=u.Y("pg-login",r,function(n){return u._24(0,[(n()(),u._2(0,0,null,null,1,"pg-login",[],null,null,null,c,s)),u._1(1,114688,null,0,r,[i.i],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),h=l("ItHS"),_=function(){function n(){}return n.prototype.showPopupAuth=function(){var n=screen.width/2-360,t="width=720,height=360,top="+(screen.height/2-180)+",left="+n,l=this._getAuthUrl();return window.open(l,"OAuthVK",t)},n.prototype._getAuthUrl=function(){return"https://oauth.vk.com/authorize?"+(new h.h).set("client_id","6446573").set("display","popup").set("revoke","1").set("redirect_uri","https://oopashaoo.github.io/ng-vk-client").set("scope","friends").set("response_type","token").set("v","5.74").toString()},n}(),p=l("g9x5"),f=l("XXk8"),d=function(){function n(n,t,l,u){this._router=n,this._oauthVk=t,this._tokenParser=l,this._tokenStorage=u,this._oauthListener=(function(n){this._oauthHandler(n.detail)}).bind(this)}return n.prototype.ngOnInit=function(){window.addEventListener("PGOAuthResult",this._oauthListener)},n.prototype.ngOnDestroy=function(){window.removeEventListener("PGOAuthResult",this._oauthListener)},n.prototype.onLogin=function(){this._oauthVk.showPopupAuth()},n.prototype._oauthHandler=function(n){var t=this;this._tokenParser.parseHash(n).then(function(n){t._tokenStorage.saveToken(n),t._router.navigate(["/"])}).catch(function(n){t._showError(n,"\u041f\u0440\u043e\u0438\u0437\u043e\u0448\u043b\u0430 \u043e\u0448\u0438\u0431\u043a\u0430, \u043f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0435.")})},n.prototype._showError=function(n,t){console.log("Auth error:",n),alert(t)},n}(),g=u._0({encapsulation:0,styles:[[""]],data:{}});function v(n){return u._24(0,[(n()(),u._2(0,0,null,null,10,"div",[["class","container text-center pt-5"]],null,null,null,null,null)),(n()(),u._22(-1,null,["\n  "])),(n()(),u._2(2,0,null,null,1,"h1",[["class","h3"]],null,null,null,null,null)),(n()(),u._22(-1,null,["\u0410\u0432\u0442\u043e\u0440\u0438\u0437\u0430\u0446\u0438\u044f"])),(n()(),u._22(-1,null,["\n  "])),(n()(),u._2(5,0,null,null,1,"p",[["class","lead text-muted"]],null,null,null,null,null)),(n()(),u._22(-1,null,["\n    \u041f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044e \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e \u0440\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c \u0434\u043e\u0441\u0442\u0443\u043f \u043a \u0443\u0447\u0435\u0442\u043d\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438 \u0412\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u0435. \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044f \u0442\u043e\u043b\u044c\u043a\u043e \u0447\u0442\u0435\u043d\u0438\u0435 \u043f\u0443\u0431\u043b\u0438\u0447\u043d\u044b\u0445 \u0434\u0430\u043d\u043d\u044b\u0445.\n  "])),(n()(),u._22(-1,null,["\n  "])),(n()(),u._2(8,0,null,null,1,"button",[["class","btn btn-lg btn-primary mt-3"],["type","button"]],null,[[null,"click"]],function(n,t,l){var u=!0;return"click"===t&&(u=!1!==n.component.onLogin()&&u),u},null,null)),(n()(),u._22(-1,null,["\u0412\u043e\u0439\u0442\u0438 \u0447\u0435\u0440\u0435\u0437 \u0412\u041a"])),(n()(),u._22(-1,null,["\n"])),(n()(),u._22(-1,null,["\n"]))],null,null)}var w=u.Y("pg-auth",d,function(n){return u._24(0,[(n()(),u._2(0,0,null,null,1,"pg-auth",[],null,null,null,v,g)),u._1(1,245760,null,0,d,[e.k,_,p.a,f.a],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),k=function(){function n(n){this._router=n}return n.prototype.ngOnInit=function(){if(window.opener){var n=window.location.hash.replace("#",""),t=new CustomEvent("PGOAuthResult",{detail:n});window.opener.dispatchEvent(t),window.close()}else this._router.navigate(["/"])},n}(),y=u._0({encapsulation:2,styles:[],data:{}});function b(n){return u._24(0,[],null,null)}var m=u.Y("ng-component",k,function(n){return u._24(0,[(n()(),u._2(0,0,null,null,1,"ng-component",[],null,null,null,b,y)),u._1(1,114688,null,0,k,[e.k],null,null)],function(n,t){n(t,1,0)},null)},{},{},[]),O=l("Xjw4"),A=function(){};l.d(t,"LoginModuleNgFactory",function(){return E});var E=u.Z(o,[],function(n){return u._9([u._10(512,u.j,u.V,[[8,[a,w,m]],[3,u.j],u.v]),u._10(4608,O.l,O.k,[u.s,[2,O.p]]),u._10(4608,_,_,[]),u._10(512,O.b,O.b,[]),u._10(512,e.o,e.o,[[2,e.t],[2,e.k]]),u._10(512,A,A,[]),u._10(512,o,o,[]),u._10(1024,e.i,function(){return[[{path:"",component:r,children:[{path:"",component:d},{path:"oauth-callback",component:k}]}]]},[])])})}});