//程序主入口
var BackGroundImageXLength = 480;
var BackGroundImageYLength = 852;
var Game = (function () {
    (function Game() {
        //初始化窗口大小为背景图的大小439*780,默认使用canvass渲染
        Laya.init(BackGroundImageXLength, BackGroundImageYLength);
        //创建循环滚动的背景
        this.bg = new BackGround();
        //把背景加到舞台上显示出来
        Laya.stage.addChild(this.bg);
        //加载图集资源
        Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, onLoaded), null, Laya.Loader.ATLAS);
    })();

    function onLoaded() {
        //创建一个主角
        this.hero = new Role();
        //初始化角色
        this.hero.init("hero", 0, 1, 0, 30);
        //射击类型
        this.hero.shootType = 1;
        //设置主角的位置
        this.hero.pos(BackGroundImageXLength / 3, (BackGroundImageYLength / 3) * 2);
        //把它添加到舞台上
        Laya.stage.addChild(this.hero);
        //监听舞台的鼠标移动事件
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, onMouseMove);

        //创建敌机
        // createEnemy(10);
        //在循环中创建敌人
        Laya.timer.frameLoop(1, this, onLoop);

    }

    function onLoop() {
        //遍历所有的物体并更改它们的状态
        for (var i = Laya.stage.numChildren - 1; i > 0; i--) {
            var role = Laya.stage.getChildAt(i);
            if (role && role.speed) {
                //根据物体速度更改飞机位置
                role.y += role.speed;
                //如果物体完全离开了舞台,就移除它
                if (role.y > 1000 || !role.visible || (role.isBullet && role.y < -20)) {
                    role.removeSelf();
                    //回收前重置属性信息
                    role.isBullet = false;
                    role.visible = true;
                    //回收到对象池里面
                    Laya.Pool.recover("role", role);
                }
            }
        }
        //处理发射子弹逻辑
        if (role.shootType > 0) {
            //获取当前时间
            var time = Laya.Browser.now();
            //如果当前时间大于下次射击时间
            if (time > role.shootTime) {
                //更新下次射击时间
                role.shootTime = time + role.shootInterval;
                //从对象池中创建一个子弹
                var bullet = Laya.Pool.getItemByClass("role", Role);
                //初始化子弹信息
                bullet.init("bullet1", role.comp, 1, -5, 1);
                //设置角色类型为子弹类型
                blur.isBullet = true;
                //设置子弹起始位置
                bullet.pos(role.x + 46, role.y - role.hitRadius -40);
                //添加到舞台上
                Laya.stage.addChild(bullet);
            }
        }
        //每隔30帧创建新的敌机
        if (Laya.timer.currFrame % 30 === 0) {
            createEnemy(2);
        }

    }

    function onMouseMove() {
        //设置保持主角的位置和鼠标一致
        this.hero.pos(Laya.stage.mouseX - 50, Laya.stage.mouseY);
    }

    //敌机血量
    this.hps = [1, 2, 10];//因为有三种敌机,所以有三个不同血量
    //敌机速度
    this.speed = [3, 2, 1];//敌机大小越小,速度越快
    //敌机被击半径
    this.hitRadius = [15, 32, 70];

    function createEnemy(num) {
        //创建num个敌人
        for (var i = 0; i < num; i++) {
            //随机出现敌人
            var r = Math.random();
            //根据随机数随机敌人
            var type = (r < 0.7) ? 0 : ((r < 0.95) ? 1 : 2);
            //创建敌人
            // var enemy = new Role();
            var enemy = Laya.Pool.getItemByClass("role", Role);//从对象池中获取敌人,以减少对象的创建
            //初始化敌人
            enemy.init("enemy" + (type + 1), 1, this.hps[type], this.speed[type], this.hitRadius[type]);
            //随机位置
            enemy.pos(Math.random() * 400 + 40, -50);
            //添加到舞台
            Laya.stage.addChild(enemy);
        };
    }
})();