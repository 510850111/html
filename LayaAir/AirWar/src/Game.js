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

    /**
     * 加载游戏
     */
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


        //敌机血量
        this.hps = [1, 2, 10];//因为有三种敌机,所以有三个不同血量
        //敌机速度
        this.speed = [3, 2, 1];//敌机大小越小,速度越快
        //敌机被击半径
        this.hitRadius = [30, 70, 100];

        //创建敌机
        // createEnemy(10);
        //在循环中创建敌人
        Laya.timer.frameLoop(1, this, onLoop);

    }

    /**
     * 游戏会在这里面循环
     */
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
                bullet.init("bullet1", role.comp, 1, -5, 5);
                //设置角色类型为子弹类型
                blur.isBullet = true;
                //设置子弹起始位置
                bullet.pos(role.x + 46, role.y - role.hitRadius - 40);
                //添加到舞台上
                Laya.stage.addChild(bullet);
            }
        }

        //碰撞检测
        for (var i = Laya.stage.numChildren - 1; i > 0; i--) {
            //获取角色对象1
            var role1 = Laya.stage.getChildAt(i);
            //如果角色死亡则忽略
            if (role1.hp < 1) continue;
            for (var j = i - 1; j > 0; j--) {
                //如果角色死亡则忽略
                if (!role1.visible) continue;
                //获取角色2
                var role2 = Laya.stage.getChildAt(j);
                //如果角色未死亡和阵营不同,则判断碰撞
                if (role2.hp > 0 && (role1.camp != role2.camp)) {
                    //计算碰撞区域
                    var hitRadius = role1.hitRadius + role2.hitRadius;
                    //根据距离判断是否碰撞
                    if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {
                        //碰撞后掉血
                        lostHP(role1, 1);
                        lostHP(role2, 1);
                    }
                }

            }

        }
        //如果主角死亡,则停止游戏循环
        if(this.hero.hp < 1){
            Laya.timer.clear(this,onLoop);
        }

        //每隔30帧创建新的敌机
        if (Laya.timer.currFrame % 30 === 0) {
            createEnemy(2);
        }

    }

    /**
     * 根据参数来减少对象的血量,并播放相应的被击中/死亡的动画.
     * @param	role 要减少血量的对象。
     * @param	hp 要减少hp的血量。
     */
    function lostHP(role, hp) {
        role.hp -= hp;
        if (role.hp > 0){
            //如果未死亡,则播放被击中的动画
            role.playAction("hit");
        }else{
            if(role.isBullet){
                //如果是子弹,则直接隐藏
                role.visible = false;
                 
            }else{
                //如果死亡,则播放死亡动画
                role.playAction("down");
            };
        }

    }


    /**
     * 设置保持主角的位置和鼠标一致
     */
    function onMouseMove() {
        //设置保持主角的位置和鼠标一致
        this.hero.pos(Laya.stage.mouseX - 50, Laya.stage.mouseY);
    }


    /**
     * 从对象池中创建敌人
     * @param num 创建num个敌人
     */
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
            enemy.pos(Math.random() * 400 + 40, -100);
            //添加到舞台
            Laya.stage.addChild(enemy);
        };
    }
})();