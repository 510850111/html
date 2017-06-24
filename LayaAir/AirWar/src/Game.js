//程序主入口
var BackGroundImageXLength = 480;
var BackGroundImageYLength = 852;

//子弹等级偏移位置表
this.bulletPos = [[0], [-15, 15], [-30, 0, 30], [-45, -15, 15, 45]];
//关卡等级
this.level = 0;
//积分成绩
this.score = 0;
//升级等级所需成绩
this.levelUpScore = 10;
//子弹级别
this.bulletLevel = 0;

//敌机血量
this.hps = [1, 3, 8];//因为有三种敌机,所以有三个不同血量
//敌机速度
this.speed = [2.5, 2, 1];//敌机大小越小,速度越快
//敌机被击半径
this.hitRadius = [30, 50, 120];

//初始化窗口大小为背景图的大小490*852,激活webGL渲染
Laya.init(BackGroundImageXLength, BackGroundImageYLength, Laya.WebGL);
Laya.stage.scaleMode = "showall";
Laya.stage.alignH = "center";
Laya.stage.screenMode = "vertical";
//加载图集资源
Laya.loader.load("res/atlas/war.json", Laya.Handler.create(this, onLoaded), null, Laya.Loader.ATLAS);

/**
 * 加载游戏
 */
function onLoaded() {

    //创建循环滚动的背景
    this.bg = new BackGround();
    //把背景加到舞台上显示出来
    Laya.stage.addChild(this.bg);

    //实例化容器,用以添加角色
    this.roleBox = new Laya.Sprite();
    //添加到舞台上
    Laya.stage.addChild(this.roleBox);

    //创建游戏UI界面
    this.gameInfo = new GameInfo();
    //添加到舞台
    Laya.stage.addChild(this.gameInfo);

    //创建一个主角
    this.hero = new Role();
    //把它添加到舞台上
    this.roleBox.addChild(this.hero);

    //开始游戏
    startGame();
}

/**
 * 游戏会在这里面循环
 */
function onLoop() {
    //遍历所有的物体并更改它们的状态
    for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
        var role = this.roleBox.getChildAt(i);
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
        //处理发射子弹逻辑
        if (role.shootType > 0) {
            //获取当前时间
            var time = Laya.Browser.now();
            //如果当前时间大于下次射击时间
            if (time > role.shootTime) {
                //更新下次射击时间
                role.shootTime = time + role.shootInterval;

                //根据不同的子弹类型设置不同的及位置
                this.pos = this.bulletPos[role.shootType - 1];
                for (var index = 0; index < pos.length; index++) {
                    //从对象池中创建一个子弹
                    var bullet = Laya.Pool.getItemByClass("role", Role);
                    //初始化子弹信息
                    bullet.init("bullet1", role.comp, 1, (-4 - role.shootType - Math.floor(this.level / 15)), 1, 1);
                    //设置角色类型为子弹类型
                    role.isBullet = true;
                    //设置子弹起始位置
                    bullet.pos(role.x + pos[index] + 46, role.y - role.hitRadius - 40);
                    //添加到舞台上
                    this.roleBox.addChild(bullet);
                }
                //添加发射子弹音效
                Laya.SoundManager.playSound("res/sound/bullet.wav",1);
            }
        }
    }


    //碰撞检测
    for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
        //获取角色对象1
        var role1 = this.roleBox.getChildAt(i);
        //如果角色死亡则忽略
        if (role1.hp < 1) continue;
        for (var j = i - 1; j > -1; j--) {
            //如果角色死亡则忽略
            if (!role1.visible) continue;
            //获取角色2
            var role2 = this.roleBox.getChildAt(j);
            //如果角色未死亡和阵营不同,则判断碰撞
            if (role2.hp > 0 && (role1.camp != role2.camp)) {
                //计算碰撞区域
                var hitRadius = role1.hitRadius + role2.hitRadius;
                //根据距离判断是否碰撞
                if (Math.abs(role1.x - role2.x) < hitRadius && Math.abs(role1.y - role2.y) < hitRadius) {

                    if ((role1.type === "hero" && role2.type === "bullet1") || (role2.type === "hero" && role1.type === "bullet1")) {
                        continue;
                    } else {
                        //碰撞后掉血
                        lostHP(role1, 1);
                        lostHP(role2, 1);

                        //积分的增加,每掉一滴血,积分+1
                        this.score++;
                        //在UI上显示积分
                        this.gameInfo.score(this.score);
                        //积分大于升级所需积分,则升级
                        if (this.score > this.levelUpScore) {
                            //升级关卡
                            this.level++;
                            //在UI上显示关卡等级
                            this.gameInfo.level(this.level);
                            //提高下一级的难度
                            this.levelUpScore += this.levelUpScore * 5;
                        }
                    }

                }
            }

        }

    }
    //如果主角死亡,则停止游戏循环
    if (this.hero.hp < 1) {
        //添加音效
        Laya.SoundManager.playMusic("res/sound/game_over.wav",1);
        Laya.timer.clear(this, onLoop);
        //显示提示信息
        this.gameInfo.infoLable.text = "游戏结束!\n您的分数:" + this.score + "\n您的等级:" + this.level + "\n点击这里重新开始.";
        //注册这个ui界面的点击事件
        this.gameInfo.infoLable.once(Laya.Event.CLICK, this, restartGame);


    }

    /*
     *   根据等级创建敌机
     */

    //关卡越高,创建敌机时间越短
    var cutTime = this.level < 30 ? this.level * 2 : 60;
    //关卡越高,敌机飞行速度越快
    var speedUp = Math.floor(this.level / 20);
    //关卡越高,血量越大
    var hpUp = Math.floor(this.level / 10) + (this.bulletLevel / 2) + 1;
    //关卡越高,数量越多
    var numUp = Math.floor(this.level / 20);

    //生成小飞机
    if (Laya.timer.currFrame % (80 - cutTime) === 0) { createEnemy(0, 2 + numUp, 3 + speedUp, 1) }
    //生成中型飞机
    if (Laya.timer.currFrame % (150 - cutTime) === 0) { createEnemy(1, 1 + numUp, 2 + speedUp, 2 + hpUp * 2) }
    //生成大飞机(BOSS)
    if (Laya.timer.currFrame % (900 - cutTime) === 0) { 
        createEnemy(2, 1, 1 + speedUp, 10 + hpUp * 6);
        //BOSS出场怎么能没有点BGM呢?
        Laya.SoundManager.playMusic("res/sound/big_spaceship_flying.wav");
     }

}

/**
 * 根据参数来减少对象的血量,并播放相应的被击中/死亡的动画.
 * @param	role 要减少血量的对象。
 * @param	hp 要减少hp的血量。
 */
function lostHP(role, hp) {
    role.hp--;
    if (role.heroType === 2) {
        //一个子弹升级道具使得子弹升级+1
        this.bulletLevel++;
        //子弹每升2级,子弹数量+1,最高为4
        this.hero.shootType = Math.min(Math.floor(this.bulletLevel / 2) + 1, 4);
        //子弹级别越高,发射频率越快
        this.hero.shootInterval = 350 - 20 * (this.bulletLevel > 20 ? 20 : this.bulletLevel);
        //子弹最高速度为150
        if (this.hero.shootInterval <= 150) { this.hero.shootInterval = 150 }
        //吃到后隐藏道具,并播放声音
        role.visible = false;
        Laya.SoundManager.playMusic("res/sound/get_bomb.wav",1);
        
    } else if (role.heroType === 3) {
        //一个血瓶使得血量+1
        this.hero.hp++;
        //设置主角血量
        this.gameInfo.hp(this.hero.hp);
        //最大血量不超过十
        if (this.hero.hp > 10) this.hero.hp = 10;
        //吃到后隐藏道具并播放声音
        role.visible = false;
        Laya.SoundManager.playMusic("res/sound/get_double_laser.wav",1);
    }
    if (role.hp > 0) {
        //如果未死亡,则播放被击中的动画
        role.playAction("hit");
    } else {
        if (role.heroType > 0) {
            //如果是子弹,则直接隐藏
            role.visible = false;
        } else {
            if(role.type != "hero"){
                //播放爆炸的声音
                Laya.SoundManager.playSound("res/sound/" + role.type + "_down.wav",1);
            }
            //如果死亡,则播放死亡动画
            role.playAction("down");
            //击毁boss掉落血瓶或子弹升级道具
            if (role.type == "enemy3") {
                //随机选择道具
                var type = Math.random() < 0.7 ? 2 : 3;
                var item = Laya.Pool.getItemByClass("role", Role);
                //初始化信息
                item.init("ufo" + (type - 1), role.camp, 1, 1, 35, type);
                //设置位置
                item.pos(role.x, role.y);
                //添加到舞台上
                this.roleBox.addChild(item);
            }
        };
    }
    if (role == this.hero) {
        //设置主角血量
        this.gameInfo.hp(role.hp)
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
 * @param type 敌机类型(0-小飞机,1-中飞机,2-大飞机(BOSS))
 * @param num 创建num个敌人
 * @param speed 敌机速度
 * @param hp 敌机血量
 */
function createEnemy(type, num, speed, hp) {
    //创建num个敌人
    for (var i = 0; i < num; i++) {
        //创建敌人
        var enemy = Laya.Pool.getItemByClass("role", Role);//从对象池中获取敌人,以减少对象的创建
        //初始化敌人
        enemy.init("enemy" + (type + 1), 1, hp, speed, this.hitRadius[type]);
        //随机位置
        enemy.pos(Math.random() * 400 + 40, -Math.random() * 200 - 100);
        //添加到舞台
        this.roleBox.addChild(enemy);
    };
}

/**
 * 开始游戏
 */
function startGame() {
    restartGame();
    onLoop();
}

/**
 * 重新开始游戏
 */
function restartGame() {
    //重置游戏数据
    this.level = 0;
    this.score = 0;
    this.levelUpScore = 20;
    this.bulletLevel = 0;
    this.gameInfo.resetUI();

    //初始化角色
    this.hero.init("hero", 0, 3, 0, 25);
    //射击类型
    this.hero.shootType = 1;
    //设置主角的位置
    this.hero.pos(BackGroundImageXLength / 3, (BackGroundImageYLength / 3) * 2);
    //重置射击间隔
    this.hero.shootInterval = 350;
    //显示这个角色
    this.hero.visible = true;

    for (var i = this.roleBox.numChildren - 1; i > -1; i--) {
        var role = this.roleBox.getChildAt(i);
        if (role != this.hero) {
            role.removeSelf();
            //回收之前重置信息
            role.visible = true;
            //回收到对象池里面
            Laya.Pool.recover("role", role);
        }
    }

    resumeGame();

}
/**
 * 暂停游戏
 */
function pauseGame() {
    //移除鼠标移动事件
    Laya.stage.off(Laya.Event.onMouseMove, this, onMouseMove);
    //停止游戏的主循环
    Laya.timer.clear(this, onLoop);

}
/**
 * 恢复游戏
 */
function resumeGame() {
    //监听舞台的鼠标移动事件
    Laya.stage.on(Laya.Event.MOUSE_MOVE, this, onMouseMove);
    //在循环中创建敌人
    Laya.timer.frameLoop(1, this, onLoop);
}

