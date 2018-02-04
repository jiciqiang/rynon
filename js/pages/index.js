var _svgNode, _viewEquName, _tmpIcon = 'ele_base';

$(function(){
    _viewEquName = $('#viewEquName').val(_tmpIcon);

    _svgNode = new Nodes({
        'id' : '#svgMap',
        //编辑节点 菜单 回调函数
        nodeEditCallback : function(_node){
            console.log('编辑节点', _node)
        },
        //删除节点 菜单 回调函数
        nodeDelCallback : function(_node){
            console.log('删除节点', _node)
        },
        //显示详情 菜单 回调函数
        nodeViewCallback : function(_node){
            console.log('显示详情', _node)
        },
        //确认坐标点位置 回调函数
        nodePosCallback : function(_node, _pos){
            console.log('position okay', _node, _pos);
        }
    }, [
        {"name" : "ele_base","path" : "image/icon/arrow_01.png"},
        {"name" : "ele_normal","path" : "image/icon/arrow_01_normal.png"},
        {"name" : "ele_warn","path" : "image/icon/arrow_01_warn.png"},
        {"name" : "equ_base","path" : "image/icon/arrow_02.png"},
        {"name" : "equ_normal","path" : "image/icon/arrow_02_normal.png"},
        {"name" : "equ_warn","path" : "image/icon/arrow_02_warn.png"}
    ]);

    console.log('svg', _svgNode);

    //添加节点
    $('button#btnAddNode').on('click', function(){
        var _node = _svgNode.createNode(_tmpIcon, '双门常闭', 'F2620');

        //保存数据
        $(_node).data({
           'id' : '123',
            'name' : '双门常闭',
            'number' : 'F2620'
        });

        console.log('create', _node);
    });

    //状态
    $('button#status01').on('click', function(){ _tmpIcon = 'ele_base'; _viewEquName.val('ele_base'); });
    $('button#status02').on('click', function(){ _tmpIcon = 'ele_normal'; _viewEquName.val('ele_normal'); });
    $('button#status03').on('click', function(){ _tmpIcon = 'ele_warn'; _viewEquName.val('ele_warn'); });
    $('button#status04').on('click', function(){ _tmpIcon = 'equ_base'; _viewEquName.val('equ_base'); });
    $('button#status05').on('click', function(){ _tmpIcon = 'equ_normal'; _viewEquName.val('equ_normal'); });
    $('button#status06').on('click', function(){ _tmpIcon = 'equ_warn'; _viewEquName.val('equ_warn'); });
});


