var _svgNode, _viewEquName, _tmpIcon = 'ele_base', _iconPathConfig = [
    {"name" : "ele_base","path" : "image/icon/arrow_01.png"},
    {"name" : "ele_normal","path" : "image/icon/arrow_01_normal.png"},
    {"name" : "ele_warn","path" : "image/icon/arrow_01_warn.png"},
    {"name" : "equ_base","path" : "image/icon/arrow_02.png"},
    {"name" : "equ_normal","path" : "image/icon/arrow_02_normal.png"},
    {"name" : "equ_warn","path" : "image/icon/arrow_02_warn.png"}
], _ajaxUrl = 'json/node1.json', _currentFloorId = 0, _currentFloorName = 'currentFloor';

/**/
function getPathName(_path){
    for(var i = 0; i < _iconPathConfig.length; i++){
        if(_path == _iconPathConfig[i].path){
            return _iconPathConfig[i].name;
        }
    }
}

function getNamePath(_name){
    for(var i = 0; i < _iconPathConfig.length; i++){
        if(_name == _iconPathConfig[i].name){
            return _iconPathConfig[i].path;
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
    var _nodeData = _svgNode.getData(_node);
    WebDatabase.deleteNodeById(_nodeData['id']);
}

//显示详情 菜单 回调函数
function _nodeViewCallback(_node){
    //console.log('显示详情', _node)

    _dialogDetailParam['_html'] = template('tpl-detail', {});
    $.myDialog(_dialogDetailParam);
}

//确认坐标点位置 回调函数
function _nodePosCallback(_node, _pos){
    //console.log('position okay', _node, _pos);
    var _nodeData = _svgNode.getData(_node),
        _position = _svgNode.getPosition(_node);

    //修改节点数据
    WebDatabase.editNodeById(_nodeData['name'], _currentFloorId, _nodeData['number'], _position['x'], _position['y'], '' + getPathName(_pos['i']), _nodeData['id']);
}

//创建节点
function createNode(data){
    var _node = _svgNode.createNode(_tmpIcon, {x : data['x'], y : data['y']});

    //设置图标
    _svgNode.resetIcon(_node, data['iconName']);

    //设置数据
    _svgNode.setData(_node, {
        'id' : data['id'],
        'fId' : data['fId'],
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
        var _node = _svgNode.createNode(_tmpIcon),
            _equName = $('#equName');



        //开户编辑节点功能, true则关闭
        _svgNode.disabledNode(_node, false);

        //更换图标
        //_svgNode.resetIcon(_node, 'ele_normal');

        //获取节点数据
        //console.log('create', _svgNode.getData(_node));

        //存入数据库
        var _data = _svgNode.getData(_node),
            _position = _svgNode.getPosition(_node);
        WebDatabase.insertNodeById(_data['name'], _currentFloorId, _data['number'], _position['x'], _position['y'], _tmpIcon, function(id){
            //保存成功，并保存数据
            _svgNode.setData(_node, {
                'id' :id,
                'name' : _equName.val(),        //name必须填
                'number' : _equName.find('option:selected').data('num')          //必填
            });
        }, function(msg){
            //保存失败
            _svgNode.deleteNode(_node);         //删除节点
            //console.log(msg)
        });
    });

    //切换楼层
    $(document).on('click', 'ul#floorWrap li', function(){
        var _id = parseInt($(this).data('id')), //获取楼层id
            _data = {};
        _currentFloorId = _id;
        Cookies.set(_currentFloorName, $(this).index());

        _data['svgImage'] = {};
        _data.svgImage['src'] = $(this).data('url');
        _data.svgImage['width'] = $(this).data('width');
        _data.svgImage['height'] = $(this).data('height');

        //获取节点
        WebDatabase.getNodeById(_id, function(data){
            if(data && data.length > 0){
                _data['resultList'] = data;
            }else{
                _data['resultList'] = [];
            }
            loadMap(_data);
        });

        $('ul#floorWrap li').removeClass('active');
        $(this).addClass('active');
        //switchUrl(_id);        //切换json数据地址
        //ajaxLoad();     //重新加载楼层数据
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

//初始化数据
function initialFloor(){
    var _floorWrap = $('#floorWrap');
    WebDatabase.getFloors(function(data){
        _floorWrap.html(template('tpl-floor', {Floors : data}));

        setTimeout(function(){
            var _current = Cookies.get(_currentFloorName);
            if('undefined' === typeof _current){
                _current = 0;
            }
            _floorWrap.find('li').eq(_current).trigger('click');
        }, 200);
    });
}

$(function(){
    _viewEquName = $('#viewEquName').val(_tmpIcon);

    addEvent();   //追加事件
    initialFloor();   //加载数据
});