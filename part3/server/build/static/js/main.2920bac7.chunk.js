(this.webpackJsonpphonebook3=this.webpackJsonpphonebook3||[]).push([[0],{21:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(1),a=t.n(c),o=t(16),r=t.n(o),u=(t(21),t(7)),i=t(3),s=t(0),l=function(e){var n=e.value,t=e.onChange;return Object(s.jsxs)("div",{children:["filter by name: ",Object(s.jsx)("input",{value:n,onChange:t})]})},d=function(e){var n=e.onSubmit,t=e.nameValue,c=e.nameHandle,a=e.phoneValue,o=e.phoneHandle;return Object(s.jsxs)("form",{onSubmit:n,children:[Object(s.jsxs)("div",{children:["name: ",Object(s.jsx)("input",{value:t,onChange:c})]}),Object(s.jsxs)("div",{children:["phone: ",Object(s.jsx)("input",{value:a,onChange:o})]}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},j=function(e){var n=e.name,t=e.number,c=e.delref;return Object(s.jsxs)("tr",{children:[Object(s.jsx)("td",{children:n}),Object(s.jsx)("td",{children:t}),Object(s.jsx)("td",{children:Object(s.jsx)("button",{onClick:c,idref:n,children:"delete"})})]})},b=function(e){var n=e.peopleToShow,t=e.delref;return Object(s.jsx)("table",{children:Object(s.jsx)("tbody",{children:n.map((function(e){return Object(s.jsx)(j,{name:e.name,number:e.number,delref:t},e.name)}))})})},f=function(e){var n=e.className,t=e.message;return null===t||""===t?null:"error"===n?Object(s.jsx)("div",{className:"error",children:t}):Object(s.jsx)("div",{className:"success",children:t})},h=t(4),m=t.n(h),O="api/persons",p=function(){return m.a.get(O)},v=function(e){return m.a.post(O,e)},x=function(e,n){return console.log("from front-end",e,n),m.a.put("".concat(O,"/").concat(e),n)},g=function(e){return m.a.delete("".concat(O,"/").concat(e))},S=function(){var e=Object(c.useState)([]),n=Object(i.a)(e,2),t=n[0],a=n[1],o=Object(c.useState)(""),r=Object(i.a)(o,2),j=r[0],h=r[1],m=Object(c.useState)(""),O=Object(i.a)(m,2),S=O[0],w=O[1],C=Object(c.useState)(""),y=Object(i.a)(C,2),T=y[0],k=y[1],N=Object(c.useState)(""),D=Object(i.a)(N,2),F=D[0],H=D[1],L=Object(c.useState)(""),V=Object(i.a)(L,2),E=V[0],P=V[1];Object(c.useEffect)((function(){p().then((function(e){return a(e.data)}))}),[]);var B=function(e){var n=Object(u.a)(Object(u.a)({},e),{},{number:S});x(e.id,n).then((function(e){console.log("front-end, after response"),a(t.map((function(n){return n.name!==j?n:e.data}))),h(""),w(""),P("".concat(e.data.name," has been updated.")),setTimeout((function(){P(null)}),3e3)})).catch((function(e){console.log(e),H("".concat(e)),setTimeout((function(){H(null)}),3e3)}))},I=""!==T.trim()?t.filter((function(e){return e.name.toLowerCase().includes(T)})):t;return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(f,{className:"error",message:F}),Object(s.jsx)(f,{className:"success",message:E}),Object(s.jsx)(l,{value:T,onChange:function(e){k(e.target.value.toLowerCase())}}),Object(s.jsx)("h3",{children:"Add a new entry"}),Object(s.jsx)(d,{onSubmit:function(e){e.preventDefault();var n=[];t.forEach((function(e){return n.push(e.name)}));var c=t.find((function(e){return e.name===j}));if(void 0!==c){window.confirm("".concat(j," is already present in the phonebook. Do you want to update the entry?"))&&B(c)}else{var o={name:j,number:S};v(o).then((function(e){a(t.concat(o)),h(""),w(""),P("".concat(e.data.name," has been added.")),setTimeout((function(){P(null)}),3e3)}))}},nameValue:j,nameHandle:function(e){h(e.target.value)},phoneValue:S,phoneHandle:function(e){w(e.target.value)}}),Object(s.jsx)("h3",{children:"Numbers"}),Object(s.jsx)(b,{peopleToShow:I,delref:function(e){var n=e.target.attributes.idref.value,c=t.find((function(e){return e.name===n}));window.confirm("".concat(c.name," is going to be deleted. Do you wish to continue?"))&&g(c.id).then((function(e){a(t.filter((function(e){return String(e.id)!==n}))),P("".concat(c.name," has been deleted.")),setTimeout((function(){P(null)}),3e3)}))}})]})},w=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,43)).then((function(n){var t=n.getCLS,c=n.getFID,a=n.getFCP,o=n.getLCP,r=n.getTTFB;t(e),c(e),a(e),o(e),r(e)}))};r.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(S,{})}),document.getElementById("root")),w()}},[[42,1,2]]]);
//# sourceMappingURL=main.2920bac7.chunk.js.map