"use strict";(self["webpackChunkfrontend"]=self["webpackChunkfrontend"]||[]).push([[996],{1756:function(e,t,s){s.d(t,{A:function(){return x}});var a=s(6929),r=s(8400),i=s(6521),n=s(9456),o=s(2987),c=s(1075),l=s(6453),u=s(6520),v=s(7410),d=s(1735),p=function(){var e=this,t=e._self._c;return t("div",[t(a.A,{attrs:{app:"","clipped-left":"",color:"indigo",dark:""}},[t(r.A,{on:{click:function(t){e.drawer=!e.drawer}}}),t(d.sw,[e._v("Donkey-Jim")]),t(v.A),t(i.A,{attrs:{text:"",to:{name:"Home"}}},[e._v("Home")]),t(i.A,{attrs:{text:"",href:"/dashboard/"}},[e._v("서비스안내")]),t(i.A,{attrs:{text:"",href:"/reservation"}},[e._v("예약하기")]),t(i.A,{attrs:{text:"",href:"/reservcheck"}},[e._v("예약확인")]),t(i.A,{attrs:{text:"",href:"/admin/"}},[e._v("Admin")]),t(i.A,{attrs:{text:""}},[e._v("/")]),t(i.A,{attrs:{text:"",href:"/"}},[e._v("HOME")]),t(i.A,{attrs:{text:"",to:{name:"Dashboard"}}},[e._v("서비스안내")]),t(i.A,{attrs:{text:"",to:{name:"Reservation"}}},[e._v("예약하기")]),t(i.A,{attrs:{text:"",to:{name:"ReservationCheck"}}},[e._v("예약확인")]),t(i.A,{attrs:{text:"",to:{name:"Faq"}}},[e._v("FAQ")]),t(v.A),t(u.A,{attrs:{left:"",bottom:""},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:a}){return[t(i.A,e._g(e._b({attrs:{text:""}},"v-btn",a,!1),s),[t(n.A,[e._v("mdi-account")]),e._v(" Anonymous "),t(n.A,[e._v("mdi-dots-vertical")])],1)]}}])},[t(o.A,[t(c.A,[t(l.UZ,[e._v("Login")])],1),t(c.A,[t(l.UZ,[e._v("Register")])],1),t(c.A,[t(l.UZ,[e._v("Logout")])],1),t(c.A,[t(l.UZ,[e._v("Password change")])],1)],1)],1)],1)],1)},h=[],m={data:()=>({})},A=m,_=s(1656),f=(0,_.A)(A,p,h,!1,null,null,null),x=f.exports},4174:function(e,t,s){var a=s(5471),r=s(5453);a.Ay.use(r.A),t.A=new r.A({})},6492:function(e,t,s){s.d(t,{A:function(){return le}});var a=s(5471),r=s(173),i=s(6521),n=s(7210),o=s(8834),c=s(1526),l=s(6278),u=s(1770),v=s(1906),d=s(9456),p=s(980),h=s(8412),m=s(7410),A=function(){var e=this,t=e._self._c;return t(l.A,{},[t(c.A,{},[t(n.A,{staticClass:"mb-10 mx-auto",attrs:{"max-width":"1590"}},[t(p.A,{staticClass:"white--text align-end",attrs:{height:"200px",src:"https://cdn.vuetifyjs.com/images/cards/docks.jpg"}},[t(o.ri,[e._v("Top 10 Australian beaches")])],1),t(o.ZR,{staticClass:"pb-0"},[e._v(" Number 10 ")]),t(o.OQ,{staticClass:"text--primary"},[t("div",[e._v("Whitehaven Beach")]),t("div",[e._v("Whitsunday Island, Whitsunday Islands")])])],1),t(u.A,{staticClass:"mx-auto",staticStyle:{"max-width":"1590px"}})],1),t(h.A,{staticClass:"pt-5"},e._l(e.cards,(function(s,a){return t(c.A,{key:a,attrs:{cols:"12",md:"4"}},[t(n.A,{staticClass:"mx-auto",attrs:{"max-width":"400"},on:{click:function(t){return e.navigateTo(s.link)}}},[t(p.A,{attrs:{src:s.image,height:"500px"}}),t(o.ri,[t("router-link",{attrs:{to:s.link}},[e._v(e._s(s.title))])],1),t(o.ZR,[e._v(" "+e._s(s.subtitle)+" ")]),t(o.SL,[t(i.A,{attrs:{color:"orange lighten-2",text:""},on:{click:function(t){return t.stopPropagation(),e.navigateTo(s.link)}}},[e._v(" Explore ")]),t(m.A),t(i.A,{attrs:{icon:""},on:{click:function(t){return t.stopPropagation(),e.toggle(a)}}},[t(d.A,[e._v(e._s(s.show?"mdi-chevron-up":"mdi-chevron-down"))])],1)],1),t(v.Qo,[t("div",{directives:[{name:"show",rawName:"v-show",value:s.show,expression:"card.show"}]},[t(u.A),t(o.OQ,[e._v(" "+e._s(s.text)+" ")])],1)])],1)],1)})),1)],1)},_=[],f=(s(4114),{data(){return{cards:[{image:"",title:"서비스 안내",subtitle:"서비스 안내 부제목 넣기",text:"서비스 안내 카드 : Dashboard ==> 간략한 설명 써넣기",show:!1,link:{name:"Dashboard"}},{image:"",title:"예약하기",subtitle:"예약하기 부제목 넣기",text:"예약하기 카드 : Reservation ==> 간략한 설명 써넣기",show:!1,link:{name:"Reservation"}},{image:"",title:"예약확인",subtitle:"예약확인 부제목 넣기",text:"예약확인 카드 : ReservationCheck ==> 간략한 설명 써넣기",show:!1,link:{name:"ReservationCheck"}}]}},methods:{toggle(e){this.cards[e].show=!this.cards[e].show},navigateTo(e){this.$router.push(e)}}}),x=f,b=s(1656),g=(0,b.A)(x,A,_,!1,null,null,null),S=g.exports,y=s(4089),k=function(){var e=this,t=e._self._c;return t(l.A,[t(h.A,{attrs:{align:"center",justify:"space-around"}},[t(c.A,{staticClass:"text-center right-border",attrs:{cols:"6"},on:{click:function(t){return e.selectService("Keeping")}}},[t("div",{staticClass:"serviceType"},[t(i.A,{attrs:{"x-large":"",text:""}},[e._v(" 맡기기 ")])],1)]),t(c.A,{staticClass:"text-center",attrs:{cols:"6"},on:{click:function(t){return e.selectService("Lending")}}},[t("div",{staticClass:"serviceType"},[t(i.A,{attrs:{"x-large":"",text:""}},[e._v(" 빌리기 ")])],1)])],1),t(h.A,{staticClass:"mb-5"},e._l(e.selectedCards,(function(s,a){return t(c.A,{key:a,attrs:{cols:"12",sm:"4"}},[t(n.A,{staticClass:"mx-auto",attrs:{"max-width":"400"},on:{click:function(t){return e.openDialog(a+1)}}},[t(p.A,{staticClass:"white--text align-end",attrs:{height:"200px",src:s.image}},[t(o.ri,[e._v(e._s(s.name))])],1),t(o.ZR,{staticClass:"pb-0"},[e._v(" "+e._s(s.base_price)+" / "+e._s(s.additional_price)+" ")]),t(o.OQ,{staticClass:"text--primary"},[t("div",[e._v(e._s(s.description))])]),t(o.SL,[t(i.A,{attrs:{color:"orange",text:""}},[e._v(" Share ")]),t(i.A,{attrs:{color:"orange",text:""}},[e._v(" Explore ")])],1)],1)],1)})),1),t(y.A,{attrs:{"max-width":"500px"},model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[t(n.A,[t(o.ri,{staticClass:"text-h5 grey lighten-2"},[e._v(" Card "+e._s(e.selectedCard)+" Information ")]),t(o.OQ,[e._v(" This is the content of card "+e._s(e.selectedCard)+". ")]),t(u.A),t(o.SL,[t(m.A),t(i.A,{attrs:{color:"primary",text:""},on:{click:function(t){e.dialog=!1}}},[e._v(" I accept ")])],1)],1)],1)],1)},D=[],C=s(4335),w={name:"DashboardPage",data(){return{dialog:!1,selectedCard:null,currentService:"Keeping",KeepingCards:[],LendingCards:[],loading:!0}},computed:{selectedCards(){return"Keeping"===this.currentService?this.KeepingCards:this.LendingCards}},created(){this.fetchItemsList()},methods:{fetchItemsList(){console.log("fetchItemsList()..."),C.A.get("http://localhost:8000/api/dashboard/").then((e=>{console.log("POST GET RES",e),this.KeepingCards=e.data.keeping_services.map((e=>({image:"",name:e.name,description:e.description,base_price:e.base_price,additional_price:e.additional_price}))),this.LendingCards=e.data.lending_services.map((e=>({image:"",name:e.name,description:e.description,base_price:e.base_price,additional_price:e.additional_price})))})).catch((e=>{e.response?(console.log("POST GET ERR.RESPONSE",e.response),alert(e.response.status+" "+e.response.statusText)):(console.error("Error",e.message),alert("Error: "+e.message))})).finally((()=>{this.loading=!1}))},selectService(e){this.currentService=e},openDialog(e){this.selectedCard=e,this.dialog=!0}}},R=w,L=(0,b.A)(R,k,D,!1,null,null,null),q=L.exports,E=s(3882),M=s(8797),P=s(8230),T=s(6520),I=s(9555),O=s(9940),Q=function(){var e=this,t=e._self._c;return t(l.A,[t(P.A,{ref:"form"},[t(h.A,[t(c.A,{attrs:{cols:"12",md:"6"}},[t(O.A,{attrs:{label:"이름",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),t(c.A,{attrs:{cols:"12",md:"6"}},[t(O.A,{attrs:{label:"전화번호",required:""},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}})],1)],1),e._l(e.servicesList,(function(s,a){return t(h.A,{key:a,staticClass:"mb-3"},[t(c.A,{attrs:{cols:"12"}},[t(I.A,{attrs:{items:e.services,label:"서비스 항목",required:""},on:{change:function(t){return e.clearSubServices(a)}},model:{value:s.selectedService,callback:function(t){e.$set(s,"selectedService",t)},expression:"service.selectedService"}})],1),t(c.A,{attrs:{cols:"12"}},[t(I.A,{attrs:{items:e.getSubServiceItems(s.selectedService),label:"세부 서비스 항목"},on:{change:function(t){return e.addSubService(a)}},model:{value:s.selectedSubService,callback:function(t){e.$set(s,"selectedSubService",t)},expression:"service.selectedSubService"}})],1),s.subServices.length?t(c.A,{attrs:{cols:"12"}},[t("div",e._l(s.subServices,(function(s,r){return t(E.A,{key:r,staticClass:"ma-2",attrs:{close:""},on:{"click:close":function(t){return e.removeSubService(a,r)}}},[e._v(" "+e._s(s)+" ")])})),1)]):e._e()],1)})),t(i.A,{attrs:{color:"primary"},on:{click:e.addService}},[e._v("추가")]),t(h.A,[t(c.A,{attrs:{cols:"12",md:"6"}},[t(T.A,{ref:"reservationDateMenu",attrs:{"close-on-content-click":!1,"return-value":e.reservationDate,transition:"scale-transition","offset-y":"","min-width":"290px"},on:{"update:returnValue":function(t){e.reservationDate=t},"update:return-value":function(t){e.reservationDate=t}},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:a}){return[t(O.A,e._g(e._b({attrs:{value:e.formattedReservationDate,label:"예약 날짜","prepend-icon":"mdi-calendar",readonly:""}},"v-text-field",a,!1),s))]}}]),model:{value:e.reservationDateMenu,callback:function(t){e.reservationDateMenu=t},expression:"reservationDateMenu"}},[t(M.A,{attrs:{"no-title":"",scrollable:""},on:{change:e.updateReservationDate},model:{value:e.reservationDate,callback:function(t){e.reservationDate=t},expression:"reservationDate"}})],1)],1),t(c.A,{attrs:{cols:"12",md:"6"}},[t(T.A,{ref:"expiryDateMenu",attrs:{"close-on-content-click":!1,"return-value":e.expiryDate,transition:"scale-transition","offset-y":"","min-width":"290px"},on:{"update:returnValue":function(t){e.expiryDate=t},"update:return-value":function(t){e.expiryDate=t}},scopedSlots:e._u([{key:"activator",fn:function({on:s,attrs:a}){return[t(O.A,e._g(e._b({attrs:{value:e.formattedExpiryDate,label:"만료 날짜","prepend-icon":"mdi-calendar",readonly:""}},"v-text-field",a,!1),s))]}}]),model:{value:e.expiryDateMenu,callback:function(t){e.expiryDateMenu=t},expression:"expiryDateMenu"}},[t(M.A,{attrs:{"no-title":"",scrollable:""},on:{change:e.updateExpiryDate},model:{value:e.expiryDate,callback:function(t){e.expiryDate=t},expression:"expiryDate"}})],1)],1)],1),t(i.A,{attrs:{color:"primary"},on:{click:e.submitForm}},[e._v("예약하기")])],2)],1)},$=[],F={name:"ReservationPage",data(){return{name:"",phone:"",reservationDate:null,reservationDateMenu:!1,expiryDate:null,expiryDateMenu:!1,servicesList:[{selectedService:"",selectedSubService:"",subServices:[]}],services:["맡기기","빌리기"],depositServices:["a","b","c"],rentServices:["x","y","z"]}},computed:{formattedReservationDate(){return this.reservationDate?this.formatDate(this.reservationDate):""},formattedExpiryDate(){return this.expiryDate?this.formatDate(this.expiryDate):""}},methods:{formatDate(e){if(!e)return null;const[t,s,a]=e.split("-");return`${t}-${s.padStart(2,"0")}-${a.padStart(2,"0")}`},getSubServiceItems(e){return"맡기기"===e?this.depositServices:this.rentServices},clearSubServices(e){this.servicesList[e].subServices=[]},addSubService(e){const t=this.servicesList[e];t.selectedSubService&&!t.subServices.includes(t.selectedSubService)&&(t.subServices.push(t.selectedSubService),t.selectedSubService=null)},removeSubService(e,t){this.servicesList[e].subServices.splice(t,1)},addService(){this.servicesList.push({selectedService:"",selectedSubService:"",subServices:[]})},updateReservationDate(e){this.reservationDate=e,this.reservationDateMenu=!1},updateExpiryDate(e){this.expiryDate=e,this.expiryDateMenu=!1},submitForm(){this.$refs.form.validate()&&alert("예약이 완료되었습니다!")}}},Z=F,K=(0,b.A)(Z,Q,$,!1,null,"4e5483e5",null),H=K.exports,U=s(2595),j=s(1373),N=s(7043),W=s(1735),G=function(){var e=this,t=e._self._c;return t(l.A,[t("h1",[e._v("Reservation Check Page")]),t(n.A,{staticClass:"mb-5"},[t(o.ri,[e._v("예약 확인")]),t(o.OQ,[t(P.A,{ref:"form"},[t(O.A,{attrs:{label:"이름",required:""},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),t(O.A,{attrs:{label:"전화번호",required:""},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),t(i.A,{attrs:{color:"primary"},on:{click:e.checkReservation}},[e._v("확인하기")])],1)],1)],1),e.showReservationList?t(n.A,{staticClass:"mt-5"},[t(o.ri,[e._v("예약 목록")]),t(o.OQ,[t(j.A,{staticClass:"elevation-1",attrs:{headers:e.headers,items:e.filteredReservations},scopedSlots:e._u([{key:"top",fn:function(){return[t(N.A,{attrs:{flat:""}},[t(W.sw,[e._v("Reservation List")]),t(u.A,{staticClass:"mx-4",attrs:{inset:"",vertical:""}})],1)]},proxy:!0},{key:"item",fn:function({item:s}){return[t("tr",[t("td",[e._v(e._s(s.name))]),t("td",[e._v(e._s(s.phone))]),t("td",[e._v(e._s(s.service))]),t("td",[t(U.A,e._l(s.subServices,(function(s,a){return t(E.A,{key:a,attrs:{small:""}},[e._v(" "+e._s(s)+" ")])})),1)],1),t("td",[e._v(e._s(s.reservationDate))]),t("td",[e._v(e._s(s.expiryDate))])])]}}],null,!1,157461167)})],1)],1):e._e()],1)},V=[],z={name:"ReservationCheckPage",data(){return{name:"",phone:"",showReservationList:!1,headers:[{text:"이름",value:"name"},{text:"전화번호",value:"phone"},{text:"서비스 항목",value:"service"},{text:"세부 서비스 항목",value:"subServices"},{text:"예약 날짜",value:"reservationDate"},{text:"만료 날짜",value:"expiryDate"}],reservations:[{name:"홍길동",phone:"010-1234-5678",service:"맡기기",subServices:["a","b"],reservationDate:"2024-07-10",expiryDate:"2024-07-20"},{name:"김철수",phone:"010-8765-4321",service:"빌리기",subServices:["x","y"],reservationDate:"2024-07-11",expiryDate:"2024-07-21"}]}},computed:{filteredReservations(){return this.reservations.filter((e=>e.name===this.name&&e.phone===this.phone))}},methods:{checkReservation(){this.name&&this.phone?this.showReservationList=!0:this.$refs.form.validate()}}},B=z,J=(0,b.A)(B,G,V,!1,null,"bc80b354",null),X=J.exports,Y=s(2822),ee=s(8461),te=s(4519),se=s(9366),ae=function(){var e=this,t=e._self._c;return t(l.A,[t("h1",[e._v("FAQ Page")]),t(se.A,e._l(e.faqs,(function(s,a){return t(Y.A,{key:a},[t(te.A,{staticClass:"question"},[e._v(e._s(s.question))]),t(ee.A,{staticClass:"answer"},[t("div",[e._v("↳"+e._s(s.answer))])])],1)})),1)],1)},re=[],ie={name:"FaqPage",data(){return{faqs:[{question:"1번질문",answer:"1번답변"},{question:"2번질문",answer:"2번답변"},{question:"3번질문",answer:"3번답변"}]}}},ne=ie,oe=(0,b.A)(ne,ae,re,!1,null,"4cef9421",null),ce=oe.exports;a.Ay.use(r.Ay);var le=new r.Ay({mode:"history",routes:[{path:"/",component:S,children:[{path:"",name:"Home",component:S}]},{path:"/dashboard",component:()=>s.e(526).then(s.bind(s,8526)),children:[{path:"",name:"ServiceInfo",component:q},{path:"reservation",name:"Reservation",component:H},{path:"reservation-check",name:"ReservationCheck",component:X},{path:"faq",name:"Faq",component:ce}]}]})}}]);
//# sourceMappingURL=chunk-common.97b5f09c.js.map