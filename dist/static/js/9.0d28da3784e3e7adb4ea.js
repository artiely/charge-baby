webpackJsonp([9],{p2Hu:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("H8JJ"),n=a("c9Np"),r=[{title:"设备id",key:"code",dataIndex:"code",scopedSlots:{customRender:"code"},width:150,fixed:"left"},{key:"created_at",title:"入住时间",dataIndex:"created_at",width:150},{key:"box.code",title:"所在机柜id",dataIndex:"box.code",width:150},{key:"power",title:"剩余电量%",scopedSlots:{customRender:"power"},dataIndex:"power",width:140},{key:"status_cn",title:"状态",scopedSlots:{customRender:"status_cn"},dataIndex:"status_cn",width:60},{key:"store.name",title:"所属商户",dataIndex:"store.name"},{title:"操作",dataIndex:"operation",scopedSlots:{customRender:"operation"},width:100,fixed:"right"}],o={mixins:[s.a],components:{recordList:n.default},data:function(){return{columns:r,recordVisible:!1}},methods:{fetch:function(){return"CHARGE_LIST"},history:function(t){this.row=t,this.recordVisible=!0}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-card",[a("div",{attrs:{slot:"title"},slot:"title"},[a("a-input-search",{staticStyle:{width:"400px"},attrs:{placeholder:"商户名/设备类型"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),a("a-range-picker",{staticClass:"pull-right",attrs:{format:"YYYY-MM-DD"},on:{change:t.timeChange}})],1),t._v(" "),a("a-table",{attrs:{columns:t.columns,size:"middle",dataSource:t.data,width:600,pagination:!1,loading:t.loading,scroll:{x:t.scrollX}},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"created_at",fn:function(e,s){return[a("a",{attrs:{href:"#"}},[t._v(t._s(s.mobile)+" - "+t._s(s.name))])]}},{key:"power",fn:function(t,e){return[a("a-progress",{attrs:{percent:e.power,size:"small"}})]}},{key:"status_cn",fn:function(e,s){return["丢失"==s.status_cn?a("a-badge",{attrs:{status:"error",text:s.status_cn}}):t._e(),t._v(" "),"使用"==s.status_cn?a("a-badge",{attrs:{status:"success",text:s.status_cn}}):t._e(),t._v(" "),"充电"==s.status_cn?a("a-badge",{attrs:{status:"processing",text:s.status_cn}}):t._e()]}},{key:"operation",fn:function(e,s){return[a("a",{on:{click:function(e){t.history(s)}}},[t._v("使用记录")])]}}])}),t._v(" "),t.last_page>1?a("a-pagination",{staticStyle:{"margin-top":"6px"},attrs:{defaultCurrent:1,total:t.total},on:{change:t.onChange}}):t._e()],1),t._v(" "),a("record-list",{attrs:{recordVisible:t.recordVisible,chargeId:t.row.id},on:{"update:recordVisible":function(e){t.recordVisible=e}}})],1)},staticRenderFns:[]},c=a("VU/8")(o,i,!1,null,null,null);e.default=c.exports}});
//# sourceMappingURL=9.0d28da3784e3e7adb4ea.js.map