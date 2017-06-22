//角色类
var Role = (function(_super){
    function Role(){
        Role.super(this);
        //Role的初始化
        this.init();
    }
    //注册Eole类
    Laya.class(Role,"Role",_super);
    var _proto = Role.prototype;//拿到Role的原型
    //实现Role的init方法
    _proto.init = function(){
        //缓存飞机的动作
        Laya.Animation.createFrames(["war/hero_fly0.png","war/hero_fly1.png"],"hero_fly");
        //缓存击中的爆炸效果
        Laya.Animation.createFrames(["war/hero_down0.png","war/hero_down1.png","war/hero_down2.png","war/hero_down3.png"],"hero_down");
        //创建一个动画,作为飞机的身体
        this.body = new Laya.Animation();
        //把机体添加到容器内
        this.addChild(this.body);
        //测试其他状态
        this.playAction("hero_fly");
    }
    _proto.playAction = function(action){
        //根据类型播放动画
        this.body.play(0,true,action);
        //获取动画大小区域
        this.bound = this.body.getBounds();
        //设置机身居中
        this.body.pos(-this.body.width/2,-this.bound.height/2);
    }
    return Role;
})(Laya.Sprite);
