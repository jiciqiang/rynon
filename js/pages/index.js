var _svgNode, _viewEquName, _tmpIcon = 'ele_base', _iconPathConfig = [
    {"name" : "ele_base","path" : "image/icon/arrow_01.png"},
    {"name" : "ele_normal","path" : "image/icon/arrow_01_normal.png"},
    {"name" : "ele_warn","path" : "image/icon/arrow_01_warn.png"},
    {"name" : "equ_base","path" : "image/icon/arrow_02.png"},
    {"name" : "equ_normal","path" : "image/icon/arrow_02_normal.png"},
    {"name" : "equ_warn","path" : "image/icon/arrow_02_warn.png"}
], _ajaxUrl = 'json/node1.json';

/**/
function getPathName(_path){
    for(var i = 0; i < _containsPath.length; i++){
        if(_path == _containsPath[i].path){
            return _containsPath[i].name;
        }
    }
}

function getNamePath(_name){
    for(var i = 0; i < _containsPath.length; i++){
        if(_name == _containsPath[i].name){
            return _containsPath[i].path;
        }
    }
}

/*弹框配置信息*/
var _dialogEditParam = {
    _title : "编辑信息",
    _show : function(){ },
    _buttons : {
        okayBtn : {
            _viewName : '保存',
            _callback : function(_dialog){ }
        }
    }
}, _dialogDetailParam = {
    _title : "设备信息",
    _size : [600, 420]
};

//编辑节点 菜单 回调函数
function _nodeEditCallback(_node){
    //console.log('编辑节点', _node);
    //console.log(_svgNode.getPosition(_node));
    _dialogEditParam['_html'] = template('tpl-edit', {});

    //加载弹框
    $.myDialog(_dialogEditParam);
}

//删除节点 菜单 回调函数
function _nodeDelCallback(_node){
    //console.log('删除节点', _node)
    _svgNode.deleteNode(_node);         //删除节点
}

//显示详情 菜单 回调函数
function _nodeViewCallback(_node){
    //console.log('显示详情', _node)

    _dialogDetailParam['_html'] = template('tpl-detail', {});
    $.myDialog(_dialogDetailParam);
}

//确认坐标点位置 回调函数
function _nodePosCallback(_node, _pos){
    console.log('position okay', _node, _pos);
}

//创建节点
function createNode(data){
    var _node = _svgNode.createNode(_tmpIcon, {x : data['x'], y : data['y']});

    //设置图标
    _svgNode.resetIcon(_node, data['iconName']);

    //设置数据
    _svgNode.setData(_node, {
        'id' : data['id'],
        'name' : data['name'],        //name必须填
        'number' : data['number']          //必填
    });

    //开户编辑节点功能, true则关闭
    _svgNode.disabledNode(_node, false);
}

//创建地图
function loadMap(data){
    var _svgMap = $('#svgMap');

    _svgMap.data('url', data['svgImage'].src);

    //创建地图
    _svgNode = new Nodes({
        'id' : '#svgMap',
        'width' : data['svgImage'].width,
        'height' : data['svgImage'].height,
        nodeEditCallback : _nodeEditCallback,
        nodeDelCallback : _nodeDelCallback,
        nodeViewCallback : _nodeViewCallback,
        nodePosCallback : _nodePosCallback
    }, _iconPathConfig);

    //加载节点数据
    $.each(data['resultList'], function(i, value){
        createNode(value);  //创建节点
    });
}

//ajax加载数据
function ajaxLoad(){
    $.ajax({
        url : _ajaxUrl,
        type : "GET",
        dataType : 'JSON',
        success : function(data){
            loadMap(data);
        }
    })
}

//切换楼层地址
function switchUrl(index){
    switch (index){
        case 1: _ajaxUrl = 'json/node1.json'; break;
        case 2: _ajaxUrl = 'json/node2.json'; break;
        case 3: _ajaxUrl = 'json/node3.json'; break;
        case 4: _ajaxUrl = 'json/node4.json'; break;
        case 5: _ajaxUrl = 'json/node5.json'; break;
    }
}

//追加事件
function addEvent(){
    //添加节点
    $('button#btnAddNode').on('click', function(){
        var _node = _svgNode.createNode(_tmpIcon);

        //保存数据
        _svgNode.setData(_node, {
            'id' : '123',
            'name' : '双门常闭',        //name必须填
            'number' : 'F2620'          //必填
        });

        //开户编辑节点功能, true则关闭
        _svgNode.disabledNode(_node, false);

        //更换图标
        //_svgNode.resetIcon(_node, 'ele_normal');

        //获取节点数据
        //console.log('create', _svgNode.getData(_node));
    });

    //切换楼层
    $('ul#floorWrap li').on('click', function(){
        var _id = parseInt($(this).data('id'));     //获取楼层id

        switchUrl(_id);        //切换json数据地址

        ajaxLoad();     //重新加载楼层数据
    });

    //图标状态切换
    var _buttonWrap = $('div.top-button-wrap'), _active = 'active';
    //状态
    $('button#status01').on('click', function(){ _tmpIcon = 'ele_base'; _viewEquName.val('ele_base'); _buttonWrap.find('button[id^=status]').removeClass(_active); $(this).addClass(_active); });
    $('button#status02').on('click', function(){ _tmpIcon = 'ele_normal'; _viewEquName.val('ele_normal'); _buttonWrap.find('button[id^=status]').removeClass(_active); $(this).addClass(_active); });
    $('button#status03').on('click', function(){ _tmpIcon = 'ele_warn'; _viewEquName.val('ele_warn'); _buttonWrap.find('button[id^=status]').removeClass(_active); $(this).addClass(_active); });
    $('button#status04').on('click', function(){ _tmpIcon = 'equ_base'; _viewEquName.val('equ_base'); _buttonWrap.find('button[id^=status]').removeClass(_active); $(this).addClass(_active); });
    $('button#status05').on('click', function(){ _tmpIcon = 'equ_normal'; _viewEquName.val('equ_normal'); _buttonWrap.find('button[id^=status]').removeClass(_active); $(this).addClass(_active); });
    $('button#status06').on('click', function(){ _tmpIcon = 'equ_warn'; _viewEquName.val('equ_warn'); _buttonWrap.find('button[id^=status]').removeClass(_active); $(this).addClass(_active); });
}

$(function(){
    _viewEquName = $('#viewEquName').val(_tmpIcon);

    ajaxLoad(); //加载数据

    addEvent();   //追加事件
});


