//用于循环滚动背景
var BackGround = (function (_super) {
    var BackGroundImageXLength = 450;
    var BackGroundImageYLength = 852;

    function BackGround() {
         
        BackGround.super(this);
        //创建背景1
        this.bg1 = new Laya.Sprite();
        //加载并显示背景图1
        this.bg1.loadImage("war/BackGround.png");
        //将背景1放在容器中
        this.addChild(this.bg1);

        //创建背景2
        this.bg2 = new Laya.Sprite();
        //加载并显示背景图2
        this.bg2.loadImage("war/BackGround.png");
        //改变背景2的坐标位置
        this.bg2.pos(0,-BackGroundImageYLength);
        //将背景1放在容器中
        this.addChild(this.bg2);

        //添加背景声音
        Laya.SoundManager.playMusic("res/sound/game_music.wav",0);

        //给容器添加帧循环
        Laya.timer.frameLoop(1,this,this.onLoop);
    }

    //注册类
    Laya.class(BackGround, "BackGround", _super);

    var _proto = BackGround.prototype;
    _proto.onLoop = function(){
        //背景容器每帧向下移动一像素
        this.y += 1;
        //如果背景图到了下面不可见的位置,立即调整到最上边
        if(this.bg1.y + this.y >= BackGroundImageYLength){
            this.bg1.y -= BackGroundImageYLength * 2;
        }
        if(this.bg2.y + this.y >= BackGroundImageYLength){
            this.bg2.y -= BackGroundImageYLength * 2;
        }
    };

    return BackGround;

})(Laya.Sprite)//继承一个精灵;