webpackJsonp([8],{WewG:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Dd8w"),o=a.n(n),r=[{title:"设备类型",key:"name",dataIndex:"name",scopedSlots:{customRender:"name"},width:150,fixed:"left"},{key:"box_num",title:"该设备数量(台)",dataIndex:"box_num",scopedSlots:{customRender:"box_num"}},{key:"upper",title:"含充电宝数量(台)",dataIndex:"upper",scopedSlots:{customRender:"upper"}},{title:"操作",dataIndex:"operation",scopedSlots:{customRender:"operation"},width:100,fixed:"right"}],i={mixins:[a("H8JJ").a],data:function(){return{columns:r,visible:!1,row:""}},methods:{fetch:function(){return"BOXTYPE_LIST"},editFetch:function(){return"BOXTYPE_PUT_POST"},handleSubmit:function(){var e=this;this.form.validateFields(function(t,a){var n=o()({id:e.row.id},a);t||e.save(n)})}}},l={render:function(){var e=this,t=this,a=t.$createElement,n=t._self._c||a;return n("div",[n("a-table",{attrs:{columns:t.columns,size:"middle",dataSource:t.data,pagination:!1,loading:t.loading,scroll:{x:t.scrollX}},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"operation",fn:function(e,a){return[n("a",{on:{click:function(){return t.edit(a)}}},[t._v("编辑")])]}}])}),t._v(" "),t.last_page>1?n("a-pagination",{staticStyle:{"margin-top":"6px"},attrs:{defaultCurrent:1,total:t.total},on:{change:t.onChange}}):t._e(),t._v(" "),n("a-modal",{attrs:{title:t.title,footer:null,width:600},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("a-form",{attrs:{autoFormCreate:function(t){e.form=t}},on:{submit:t.handleSubmit}},[n("a-form-item",{attrs:{label:"设备类型",labelCol:t.labelCol,wrapperCol:t.wrapperCol,fieldDecoratorId:"name",fieldDecoratorOptions:{rules:[{required:!0,message:"请输入设备类型"}],initialValue:t.row.name}}},[n("a-input")],1),t._v(" "),n("a-form-item",{attrs:{label:"含充电宝数量(台)",labelCol:t.labelCol,wrapperCol:t.wrapperCol,fieldDecoratorId:"upper",fieldDecoratorOptions:{initialValue:t.row.upper}}},[n("a-input",{attrs:{type:"number"},model:{value:t.row.upper,callback:function(e){t.$set(t.row,"upper",e)},expression:"row.upper"}})],1),t._v(" "),n("a-form-item",{attrs:{wrapperCol:{span:19,offset:5}}},[n("a-button",{staticStyle:{width:"120px","margin-right":"10px"},attrs:{type:"dashed",size:"large"},on:{click:function(e){t.visible=!1}}},[t._v("\n          取消\n        ")]),t._v(" "),n("a-button",{staticStyle:{width:"120px"},attrs:{type:"primary",htmlType:"submit",size:"large"}},[t._v("\n          保存\n        ")])],1)],1)],1)],1)},staticRenderFns:[]},s=a("VU/8")(i,l,!1,null,null,null);t.default=s.exports}});
//# sourceMappingURL=8.0da657788fa6e3eebe06.js.map