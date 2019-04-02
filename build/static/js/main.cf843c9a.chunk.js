(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{213:function(e,t,a){e.exports=a(377)},377:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(18),o=a.n(l),i=a(56),s=a(16),c=Object(s.createMuiTheme)({props:{MuiInputLabel:{shrink:!0}},palette:{primary:{main:"#05324b"},secondary:{main:"#ee4035"}},shape:{borderRadius:2},typography:{useNextVariants:!0}}),u=a(37),m=a(38),d=a(51),p=a(140),h=a(141),g=a(142),f=a(144),E=a(143),w=a(145),v=a(23),b=a.n(v),x=a(5),y=a(30),C=function(e){var t=e.email,a=e.password,n=e.password2,l=e.onChange,o=e.helperText,i=e.signupMode,s=e.toggleMode,c=e.register,u=e.login;return r.a.createElement(x.c,null,r.a.createElement(x.a,{position:"static",elevation:0},r.a.createElement(x.p,{value:Number(i),onChange:s,centered:!0},r.a.createElement(x.j,{label:"Log in"}),r.a.createElement(x.j,{label:"Sign up"}))),r.a.createElement(x.d,null,r.a.createElement("form",{id:"login",onSubmit:i?function(e){return c(e)}:function(e){return u(e)}},r.a.createElement(x.q,{autoFocus:!0,fullWidth:!0,required:!0,margin:"normal",placeholder:"myname@example.com",type:"email",name:"email",label:"email",value:t,onChange:function(e){return l(e)},InputProps:{startAdornment:r.a.createElement(x.h,{position:"start"},r.a.createElement(y.a,{icon:"user-circle",fixedWidth:!0}))}}),r.a.createElement(x.q,{fullWidth:!0,required:!0,margin:"normal",type:"password",name:"password",label:"password",value:a,onChange:function(e){return l(e)},InputProps:{startAdornment:r.a.createElement(x.h,{position:"start"},r.a.createElement(y.a,{icon:"lock",fixedWidth:!0}))}}),i&&r.a.createElement(x.q,{fullWidth:!0,required:!0,margin:"normal",type:"password",name:"password2",label:"retype password",value:n,onChange:function(e){return l(e)},InputProps:{startAdornment:r.a.createElement(x.h,{position:"start"},r.a.createElement(y.a,{icon:"check-double",fixedWidth:!0}))}}),r.a.createElement(x.r,null,o),r.a.createElement(x.b,{variant:"contained",color:"secondary",type:"submit"},"Submit"))))},T=function(e){var t=e.onChange,a=e.onSubmit,n=e.longurl,l=e.helperText;return r.a.createElement("form",{id:"url-form",onSubmit:a},r.a.createElement(x.c,null,r.a.createElement(x.d,null,r.a.createElement(x.q,{autoFocus:!0,fullWidth:!0,margin:"normal",variant:"outlined",placeholder:"https://www.example.com",name:"longurl",value:n,onChange:t,helperText:l}),r.a.createElement(x.b,{variant:"contained",color:"secondary",type:"submit"},"Create URL"))))},L={table:{maxwidth:200,tableLayout:"auto"},cell:{wordBreak:"break-all",overflow:"hidden"},longurl:{scope:"col",width:"60%"},shorturl:{},hitcount:{scope:"col",maxwidth:"10%",minwidth:72}},k=function(e){var t=e.urlList,a=e.deleteItem;return r.a.createElement(x.c,null,r.a.createElement(x.d,null,r.a.createElement(x.k,{padding:"checkbox",style:L.table},r.a.createElement(x.n,null,r.a.createElement(x.o,null,r.a.createElement(x.m,{style:L.longurl},"long url"),r.a.createElement(x.m,{style:L.shorturl},"short url"),r.a.createElement(x.m,{align:"right",style:L.hitcount},"hit count"),r.a.createElement(x.m,{align:"center",style:{width:72}},"delete"))),r.a.createElement(x.l,null,t.map(function(e){return r.a.createElement(x.o,{key:e._id,hover:!0},r.a.createElement(x.m,{style:L.cell},r.a.createElement(x.i,{href:"http://localhost:5000/".concat(e.shorturl),target:"_blank"},e.longurl)),r.a.createElement(x.m,{style:L.cell},r.a.createElement(x.i,{href:e.shorturl,target:"_blank"},e.shorturl)),r.a.createElement(x.m,{align:"right",style:L.cell},e.hitcount),r.a.createElement(x.m,{align:"center",style:L.cell},r.a.createElement(x.g,{size:"small",onClick:function(){return a(e._id)}},r.a.createElement(y.a,{icon:"times-circle",size:"xs"}))))})))))},M={container:{width:"100vw",minheight:"100vh",padding:16}},S={signupMode:!1,email:"",password:"",password2:"",_id:"",longurl:"",helperText:"",error:!1,urlList:[]},A=function(e){function t(){var e,a;Object(h.a)(this,t);for(var l=arguments.length,o=new Array(l),i=0;i<l;i++)o[i]=arguments[i];return(a=Object(f.a)(this,(e=Object(E.a)(t)).call.apply(e,[this].concat(o)))).state={signupMode:!1,email:"",password:"",password2:"",_id:"",longurl:"",helperText:"",error:!1,urlList:[]},a.getUser=function(){b.a.get("/api/users",{withCredentials:!0}).then(function(e){var t=e.data;a.setState(Object(p.a)({},S,{_id:t._id})),a.getUrls()}).catch(function(e){return a.handleApiError(e)})},a.register=function(e){e.preventDefault();var t=a.state,n=t.password,r=t.password2;a.setHelperText("",!1),n.length<8?a.setHelperText("Password must at least 8 characters",!0):n!==r?a.setHelperText("Passwords must match!",!0):a.createUser()},a.createUser=function(){var e={method:"post",url:"/api/users",withCredentials:!0,data:{email:a.state.email.toLowerCase(),password:a.state.password}};b()(e).then(function(e){var t=e.data;a.setHelperText(t.message,!1),a.login()}).catch(function(e){return a.handleApiError(e)})},a.login=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";e&&e.preventDefault();var t={method:"post",url:"/api/users/login",data:{email:a.state.email.toLowerCase(),password:a.state.password}};b()(t).then(function(e){var t=e.data;a.setState({_id:t._id,helperText:t.message}),a.getUser()}).catch(function(e){e.respnse&&e.response.data.message&&e.response.data.message.includes("Please register")&&a.toggleMode(),a.handleApiError(e)})},a.logout=function(e){e.preventDefault(),b.a.post("/api/users/logout").then(a.setState(S)).catch(function(e){return a.handleApiError(e)})},a.toggleMode=function(){a.setState({signupMode:!a.state.signupMode})},a.getUrls=function(){b()({url:"/api/urls",withCredentials:!0}).then(function(e){var t=e.data;return a.setState({urlList:t.docs})}).catch(function(e){return a.handleApiError(e)})},a.onChange=function(e){e.preventDefault(),a.setState(Object(d.a)({},e.target.name,e.target.value))},a.onSubmit=function(e){e.preventDefault();var t={method:"post",url:"/api/urls",data:{longurl:a.state.longurl},withCredentials:!0};a.apiCall(t)},a.setHelperText=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"";a.setState({helperText:e,err:t,longurl:n})},a.deleteItem=function(e){var t={method:"delete",url:"/api/urls/".concat(e),withCredentials:!0};a.apiCall(t)},a.apiCall=function(e){b()(e).then(function(e){var t=e.data;a.setHelperText(t.message,!1),a.getUrls()}).catch(function(e){return a.handleApiError(e)})},a.handleApiError=function(e){var t=e.response?e.response.data.message:e.message;a.setHelperText(t,!0)},a.LoginForm=function(){var e=a.state,t=e.helperText,n=e.email,l=e.password,o=e.signupMode;return r.a.createElement(x.f,{item:!0,xs:12},r.a.createElement(C,{email:n,password:l,signupMode:o,helperText:t,onChange:a.onChange,login:a.login,register:a.register,toggleMode:a.toggleMode}))},a.UrlFormAndList=function(){var e=a.state,t=e.urlList,l=e.longurl,o=e.helperText;return r.a.createElement(n.Fragment,null,r.a.createElement(x.f,{item:!0,xs:12,container:!0,justify:"flex-end"},r.a.createElement(x.b,{color:"secondary",variant:"contained",onClick:a.logout},"Logout")),r.a.createElement(x.f,{item:!0,xs:12},r.a.createElement(T,{longurl:l,helperText:o,onChange:a.onChange,onSubmit:a.onSubmit})),r.a.createElement(x.f,{item:!0,xs:12},r.a.createElement(k,{urlList:t,getUrls:a.getUrls,deleteItem:a.deleteItem})))},a}return Object(w.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){this.getUser()}},{key:"render",value:function(){return r.a.createElement("div",{style:M.container},r.a.createElement(x.e,null),r.a.createElement(x.f,{container:!0,spacing:16,direction:"column"},this.state._id?r.a.createElement(this.UrlFormAndList,null):r.a.createElement(this.LoginForm,null)))}}]),t}(n.Component),U=Object(i.b)(A);u.b.add(m.c,m.d,m.b,m.a),o.a.render(r.a.createElement(i.a,null,r.a.createElement(s.MuiThemeProvider,{theme:c},r.a.createElement(U,null))),document.getElementById("root"))}},[[213,1,2]]]);
//# sourceMappingURL=main.cf843c9a.chunk.js.map