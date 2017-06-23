//角色类
var Role = (function (_super) {
    function Role() {
        Role.super(this);
        // //Role的初始化
        // this.init();
    }
    //是否缓存
    Role.cached = false;
    //注册Eole类
    Laya.class(Role, "Role", _super);
    var _proto = Role.prototype;//拿到Role的原型
    
    //实现Role的init方法
    _proto.init = function (_type,_camp,_hp,_speed,_hitRadius) {

        //角色的类型
        this.type = _type;
        //敌我阵营
        this.camp = _camp;
        //血量
        this.hp = _hp;
        //速度,不同飞机种类的速度不一样
        this.speed = _speed;
        //攻击半径
        this.hitRadius = _hitRadius;

        //射击类型
        this.shootType = 0;
        //射击间隔
        this.shootInterval = 100;
        //下次射击时间
        this.shootTime = Laya.Browser.now() + 2000;
        //当前动作
        this.action = "";
        //是否为子弹
        this.isBullet = false;

        if(!Role.cached){
            Role.cached = true;
            //缓存飞机的动作
            Laya.Animation.createFrames(["war/hero1.png","war/hero2.png"], "hero_fly");
            //缓存击中的爆炸效果
            Laya.Animation.createFrames(["war/hero_blowup_n1.png", "war/hero_blowup_n2.png", "war/hero_blowup_n3.png","war/hero_blowup_n4.png"], "hero_down");
            
            //缓存敌机1的飞行动作
            Laya.Animation.createFrames(["war/enemy1.png"],"enemy1_fly");
            //缓存敌机1的爆炸动作
            Laya.Animation.createFrames(["war/enemy1_down1.png","war/enemy1_down2.png","war/enemy1_down3.png","war/enemy1_down4.png"],"enemy1_down");

            //缓存敌机2的飞行动作
            Laya.Animation.createFrames(["war/enemy2.png"],"enemy2_fly");
            //缓存敌机2的碰撞动作
            Laya.Animation.createFrames(["war/enemy2_hit.png"],"enemy2_hit");
            //缓存敌机2的爆炸动作
            Laya.Animation.createFrames(["war/enemy2_down1.png","war/enemy2_down2.png","war/enemy2_down3.png","war/enemy2_down4.png"],"enemy2_down");
            
            //缓存敌机3的飞行动作
            Laya.Animation.createFrames(["war/enemy3_n1.png","war/enemy3_n2.png"],"enemy3_fly");
            //缓存敌机3的碰撞动作
            Laya.Animation.createFrames(["war/enemy3_hit.png"],"enemy3_hit");
            //缓存敌机3的爆炸动作
            Laya.Animation.createFrames(["war/enemy3_down1.png","war/enemy3_down2.png","war/enemy3_down3.png","war/enemy3_down4.png","war/enemy3_down5.png","war/enemy3_down6.png"],"enemy3_down");

            //缓存子弹的飞行动作
            Laya.Animation.createFrames(["war/bullet1.png"],"bullet1_fly");
            //缓存子弹的爆炸动作
            Laya.Animation.createFrames(["war/enemy1_down4.png"],"bullet1_down");

        }
        
        if(!this.body){
            //创建一个动画,作为飞机的身体
            this.body = new Laya.Animation();
            //把机体添加到容器内
            this.addChild(this.body);

            //监听事件
            this.body.on(Laya.Event.COMPLETE,this,this.onPlayComplete);
        }
        
        //播放飞行动画
        this.playAction("fly");
    }

    _proto.playAction = function (action) {
        //记录当前动画类型
        this.action = action;
        //根据类型播放动画
        this.body.play(0, true, this.type+"_"+action);
        //获取动画大小区域
        this.bound = this.body.getBounds();
        //设置机身居中
        this.body.pos(-this.body.width / 2, -this.bound.height / 2);
    }

    _proto.onPlayComplete = function (){
        //如果是被击毁.则隐藏对象
        if(this.action === "down"){
            //停止动画播放
            this.body.stop();
            //隐藏显示
            this.visible = false;
        }else if(this.action === "hit"){
            //如果是被击中而未被击毁,则继续播放飞行动作
            this.playAction("fly");
        }

    }
    return Role;
})(Laya.Sprite);
