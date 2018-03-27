var _svgNode,_viewEquName,_tmpIcon="ele_base",_iconPathConfig=[{name:"ele_base",path:"image/icon/arrow_01.png"},{name:"ele_normal",path:"image/icon/arrow_01_normal.png"},{name:"ele_warn",path:"image/icon/arrow_01_warn.png"},{name:"equ_base",path:"image/icon/arrow_02.png"},{name:"equ_normal",path:"image/icon/arrow_02_normal.png"},{name:"equ_warn",path:"image/icon/arrow_02_warn.png"}],_ajaxUrl="json/node1.json",_currentFloorId=0,_currentFloorName="currentFloor";function getPathName(a){for(var e=0;e<_iconPathConfig.length;e++)if(a==_iconPathConfig[e].path)return _iconPathConfig[e].name}function getNamePath(a){for(var e=0;e<_iconPathConfig.length;e++)if(a==_iconPathConfig[e].name)return _iconPathConfig[e].path}var _dialogEditParam={_title:"编辑信息",_show:function(){},_buttons:{okayBtn:{_viewName:"保存",_callback:function(a){}}}},_dialogDetailParam={_title:"设备信息",_size:[600,420]};function _nodeEditCallback(a){_dialogEditParam._html=template("tpl-edit",{}),$.myDialog(_dialogEditParam)}function _nodeDelCallback(a){_svgNode.deleteNode(a);var e=_svgNode.getData(a);WebDatabase.deleteNodeById(e.id)}function _nodeViewCallback(a){_dialogDetailParam._html=template("tpl-detail",{}),$.myDialog(_dialogDetailParam)}function _nodePosCallback(a,e){var t=_svgNode.getData(a),o=_svgNode.getPosition(a);WebDatabase.editNodeById(t.name,_currentFloorId,t.number,o.x,o.y,""+getPathName(e.i),t.id)}function createNode(a){var e=_svgNode.createNode(_tmpIcon,{x:a.x,y:a.y});_svgNode.resetIcon(e,a.iconName),_svgNode.setData(e,{id:a.id,fId:a.fId,name:a.name,number:a.number}),_svgNode.disabledNode(e,!1)}function loadMap(a){$("#svgMap").data("url",a.svgImage.src),_svgNode=new Nodes({id:"#svgMap",width:a.svgImage.width,height:a.svgImage.height,nodeEditCallback:_nodeEditCallback,nodeDelCallback:_nodeDelCallback,nodeViewCallback:_nodeViewCallback,nodePosCallback:_nodePosCallback},_iconPathConfig),$.each(a.resultList,function(a,e){createNode(e)})}function ajaxLoad(){$.ajax({url:_ajaxUrl,type:"GET",dataType:"JSON",success:function(a){loadMap(a)}})}function switchUrl(a){switch(a){case 1:_ajaxUrl="json/node1.json";break;case 2:_ajaxUrl="json/node2.json";break;case 3:_ajaxUrl="json/node3.json";break;case 4:_ajaxUrl="json/node4.json";break;case 5:_ajaxUrl="json/node5.json"}}function addEvent(){$("button#btnAddNode").on("click",function(){var a=_svgNode.createNode(_tmpIcon),e=$("#equName");_svgNode.disabledNode(a,!1);var t=_svgNode.getData(a),o=_svgNode.getPosition(a);WebDatabase.insertNodeById(t.name,_currentFloorId,t.number,o.x,o.y,_tmpIcon,function(t){_svgNode.setData(a,{id:t,name:e.val(),number:e.find("option:selected").data("num")})},function(e){_svgNode.deleteNode(a)})}),$(document).on("click","ul#floorWrap li",function(){var a=parseInt($(this).data("id")),e={};_currentFloorId=a,Cookies.set(_currentFloorName,$(this).index()),e.svgImage={},e.svgImage.src=$(this).data("url"),e.svgImage.width=$(this).data("width"),e.svgImage.height=$(this).data("height"),WebDatabase.getNodeById(a,function(a){a&&a.length>0?e.resultList=a:e.resultList=[],loadMap(e)}),$("ul#floorWrap li").removeClass("active"),$(this).addClass("active")});var a=$("div.top-button-wrap"),e="active";$("button#status01").on("click",function(){_tmpIcon="ele_base",_viewEquName.val("ele_base"),a.find("button[id^=status]").removeClass(e),$(this).addClass(e)}),$("button#status02").on("click",function(){_tmpIcon="ele_normal",_viewEquName.val("ele_normal"),a.find("button[id^=status]").removeClass(e),$(this).addClass(e)}),$("button#status03").on("click",function(){_tmpIcon="ele_warn",_viewEquName.val("ele_warn"),a.find("button[id^=status]").removeClass(e),$(this).addClass(e)}),$("button#status04").on("click",function(){_tmpIcon="equ_base",_viewEquName.val("equ_base"),a.find("button[id^=status]").removeClass(e),$(this).addClass(e)}),$("button#status05").on("click",function(){_tmpIcon="equ_normal",_viewEquName.val("equ_normal"),a.find("button[id^=status]").removeClass(e),$(this).addClass(e)}),$("button#status06").on("click",function(){_tmpIcon="equ_warn",_viewEquName.val("equ_warn"),a.find("button[id^=status]").removeClass(e),$(this).addClass(e)})}function initialFloor(){var a=$("#floorWrap");WebDatabase.getFloors(function(e){a.html(template("tpl-floor",{Floors:e})),setTimeout(function(){var e=Cookies.get(_currentFloorName);void 0===e&&(e=0),a.find("li").eq(e).trigger("click")},200)})}$(function(){_viewEquName=$("#viewEquName").val(_tmpIcon),addEvent(),initialFloor()});