(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["posts"],{"6fe3":function(t,s,e){"use strict";var i=e("d75e"),a=e.n(i);a.a},"715d":function(t,s,e){"use strict";e.r(s);var i=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"post-wrap"},[t.postExist?e("div",{staticClass:"post-box block"},[e("div",{staticClass:"post-box-head"},[e("h1",{staticClass:"post-title"},[t._v(t._s(t.post.title))]),e("div",{staticClass:"post-author"},[e("router-link",{attrs:{to:"/profile/"+t.post.userId}},[e("img",{staticClass:"post-avatar",attrs:{src:t.post.userInfo.avatar||t.defaultAvatar,alt:"用户头像"}})]),e("div",{staticClass:"post-detail"},[e("router-link",{staticClass:"post-user",attrs:{to:"/profile/"+t.post.userId}},[t._v(t._s(t.post.userInfo.nickName||"stuer用户"))]),e("div",{staticClass:"post-legend"},[e("div",{staticClass:"post-time"},[e("span",[t._v("发表于 "+t._s(t.post.createdAt?t.$dayjs(t.post.createdAt).format("YYYY-MM-DD HH:mm:ss"):"-")+" ，")]),e("span",[t._v("编辑于 "+t._s(t.post.updatedAt?t.$dayjs(t.post.updatedAt).format("YYYY-MM-DD HH:mm:ss"):"-"))])]),e("ul",{staticClass:"post-legend-opts"},t._l(t.legendOpts,function(s,i){return e("li",{key:i},[e("span",[t._v(t._s(s))]),e("span",{staticClass:"opts-num"},[t._v(t._s(parseInt((Math.random()+"").slice(2,4),10)))]),i!==t.legendOpts.length-1?e("span",{staticClass:"seperate-pipe"},[t._v("|")]):t._e()])}),0)])],1)],1)]),e("div",{staticClass:"post-box-main"},[e("div",{staticClass:"post-content-box"},[e("div",{domProps:{innerHTML:t._s(t.post.content)}})]),e("div",{staticClass:"post-foot"},[e("ul",{staticClass:"opt-list"},t._l(t.postOpts,function(s,i){return e("li",{key:i},[e("a",{staticClass:"opt-list-item",attrs:{href:"javascript:void(0)"}},[e("svg",{staticClass:"icon opt-list-icon",attrs:{"aria-hidden":"true"}},[e("use",{attrs:{"xlink:href":"#icon-"+s.icon}})]),e("span",{staticClass:"opt-list-name"},[t._v(t._s(s.name))])]),i!==t.postOpts.length-1?e("span",{staticClass:"seperate-pipe"},[t._v("|")]):t._e()])}),0)])])]):t._e(),t.postExist?e("div",{staticClass:"comment-box block"},[e("div",{staticClass:"comment-box-head"},[e("h1",{staticClass:"post-title"},[t._v(t._s(t.commentCount)+"条评论")]),e("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"}},[t._v("评论")])],1),e("div",{staticClass:"comment-box-main"},[e("div",{staticClass:"comment-list"},t._l(10,function(s){return e("div",{key:s,staticClass:"comment-list-item"},[e("span",[t._v("还未完成")])])}),0)])]):t._e(),t.postExist?e("div",{staticClass:"edit-box block"},[e("div",{staticClass:"editor"},[e("div",{ref:"editor_bar",staticClass:"editor-bar"}),e("div",{ref:"editor_main",staticClass:"editor-main"}),e("div",{staticClass:"editor-foot"},[e("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"}},[t._v("评论")])],1)])]):t._e(),t.postExist?t._e():e("div",{staticClass:"postNotFound block"},[t._v("帖子不存在")]),t.postExist?t._e():e("div",{staticClass:"toIndex"},[e("el-button",{attrs:{type:"primary"},on:{click:t.routeToIndex}},[t._v("返回首页")])],1)])},a=[],o=(e("96cf"),e("3b8d")),n=e("cb15"),r=e.n(n),c=e("365c"),p={data:function(){return{editor:null,post:{title:"",content:"",userId:void 0,createdAt:void 0,updateAt:void 0,userInfo:{avatar:"",nickName:""}},commentCount:0,comments:[{userId:void 0,nickName:""}],legendOpts:["收藏","点赞","评论","浏览"],postOpts:[{name:"收藏",icon:"collect"},{name:"点赞",icon:"dianzan"},{name:"评论",icon:"comment"},{name:"举报",icon:"report"}],defaultAvatar:r.a,postExist:!0}},mounted:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.initPost();case 2:this.initEditor();case 3:case"end":return t.stop()}},t,this)}));function s(){return t.apply(this,arguments)}return s}(),methods:{initPost:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var s,e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return s=this.$route.params.id,t.next=3,Object(c["g"])(s);case 3:e=t.sent,0===e.code?(this.post=e.data,2===this.post.type&&(this.postExist=!1)):this.postExist=!1;case 5:case"end":return t.stop()}},t,this)}));function s(){return t.apply(this,arguments)}return s}(),initEditor:function(){var t=window.wangEditor;this.editor=new t(this.$refs.editor_bar,this.$refs.editor_main),this.editor.customConfig.zIndex=100,this.editor.customConfig.uploadImgServer="/api/uploadImgsForPost",this.editor.customConfig.uploadImgMaxSize=3145728,this.editor.customConfig.uploadImgMaxLength=5;var s=this;this.editor.customConfig.customAlert=function(t){s.$message.error(t)},this.editor.create()},routeToIndex:function(){this.$router.push("/")}}},d=p,l=(e("6fe3"),e("2877")),u=Object(l["a"])(d,i,a,!1,null,null,null);s["default"]=u.exports},d75e:function(t,s,e){}}]);
//# sourceMappingURL=posts.2c66b4c1.js.map