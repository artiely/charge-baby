webpackJsonp([5],{NcXA:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=[{title:"用户信息",key:"member_id",dataIndex:"member_id",scopedSlots:{customRender:"member_id"},width:150,fixed:"left"},{key:"box.code",title:"机柜id",width:150,dataIndex:"box.code"},{key:"charger.code",title:"充电宝id",width:150,dataIndex:"charger.code"},{key:"duration",title:"使用时长",width:150,dataIndex:"duration"},{key:"status_cn",title:"订单状态",width:100,dataIndex:"status_cn",scopedSlots:{customRender:"status_cn"}},{key:"pay_amount",title:"支付金额(元)",width:100,dataIndex:"pay_amount"},{key:"store.name",title:"商户",dataIndex:"store.name"}],r={mixins:[a("H8JJ").a],data:function(){return{columns:i,detailVisible:!1}},computed:{currentStatus:function(){return this.row.pay_time&&this.row.start_time&&this.row.end_time?2:this.row.start_time&&this.row.end_time?1:this.row.start_time?0:void 0},pending:function(){return"等待支付"}},methods:{fetch:function(){return"ORDER_LIST"},detail:function(t){this.row=t}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-card",{attrs:{loading:t.preLoading}},[a("template",{slot:"title"},[a("a-input-search",{staticStyle:{width:"400px"},attrs:{placeholder:"商户名/用户名/手机号/机柜id/充电宝id"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),a("a-range-picker",{staticClass:"pull-right",attrs:{format:"YYYY-MM-DD"},on:{change:t.timeChange}})],1),t._v(" "),a("a-table",{attrs:{columns:t.columns,size:"middle",dataSource:t.data,pagination:!1,loading:t.loading,scroll:{x:1100}},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"member_id",fn:function(e,i){return[a("a",{attrs:{href:"#"}},[t._v(t._s(i.member.mobile)+" - "+t._s(i.member.name))])]}},{key:"status_cn",fn:function(e,i){return[a("a-popover",{attrs:{title:"流程时间",placement:"rightTop"}},[a("template",{slot:"content"},[a("a-timeline",[i.start_time?a("a-timeline-item",{attrs:{color:"green"}},[a("a-icon",{attrs:{slot:"dot",type:"clock-circle-o"},slot:"dot"}),t._v("借出 "+t._s(i.start_time))],1):t._e(),t._v(" "),i.end_time?a("a-timeline-item",{attrs:{color:"green"}},[a("a-icon",{attrs:{slot:"dot",type:"clock-circle-o"},slot:"dot"}),t._v("归还 "+t._s(i.end_time))],1):t._e(),t._v(" "),i.pay_time?a("a-timeline-item",{attrs:{color:"green"}},[a("a-icon",{attrs:{slot:"dot",type:"clock-circle-o"},slot:"dot"}),t._v("支付 "+t._s(i.pay_time))],1):t._e()],1)],1),t._v(" "),"已借出"==e?a("a-tag",{attrs:{color:"cyan"}},[t._v("已借出")]):t._e(),t._v(" "),"已归还"==e?a("a-tag",{attrs:{color:"blue"}},[t._v("已归还")]):t._e(),t._v(" "),"已支付"==e?a("a-tag",{attrs:{color:"green"}},[t._v("已支付")]):t._e(),t._v(" "),"已丢失"==e?a("a-tag",{attrs:{color:"red"}},[t._v("已丢失")]):t._e()],2)]}},{key:"operation",fn:function(e,i){return[a("a",{on:{click:function(e){t.detail(i)}}},[t._v("详情")])]}}])}),t._v(" "),t.last_page>1?a("a-pagination",{staticStyle:{"margin-top":"6px"},attrs:{defaultCurrent:1,total:t.total},on:{change:t.onChange}}):t._e()],2),t._v(" "),t.row?a("a-modal",{staticStyle:{top:"20px"},attrs:{title:t.row.member.mobile+"-"+t.row.member.name,visible:t.detailVisible,width:768},on:{ok:function(){return t.detailVisible=!1},cancel:function(){return t.detailVisible=!1}}},[[a("a-steps",{attrs:{current:t.currentStatus,status:"process"}},[a("a-step",{attrs:{title:"租出",description:t.row.start_time}}),t._v(" "),a("a-step",{attrs:{title:"归还",description:t.row.end_time}}),t._v(" "),a("a-step",{attrs:{title:"支付",description:t.row.pay_time}})],1)],t._v("\n    "+t._s(t.row.duration)+"\n  ")],2):t._e()],1)},staticRenderFns:[]},o=a("VU/8")(r,n,!1,null,null,null);e.default=o.exports}});
//# sourceMappingURL=5.cb971a5ca904df7ae469.js.map