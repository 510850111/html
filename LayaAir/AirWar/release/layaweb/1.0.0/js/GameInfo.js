//游戏UI文件
var GameInfo = (function (_super) {
    function GameInfo() {
        GameInfo.super(this);

        //注册按钮的监听事件,点击后暂停游戏
        this.pauseBtn.on(Laya.Event.CLICK, this, this.onPauseBtnClick);

        //初始化UI界面
        this.resetUI();
    }

    //注册这个类
    Laya.class(GameInfo, "GameInfo", _super);
    var _proto = GameInfo.prototype;

    /**
     * 按钮的点击事件
     */
    _proto.onPauseBtnClick = function (e) {
        //阻止事件的派发,因为要防止对事件流中当前节点的后续节点中的所有事件侦听器进行处理
        e.stopPropagation();
        //暂停游戏
        this.infoLable.text = "游戏已暂停,点击任意地方恢复游戏";
        pauseGame();
        Laya.stage.once(Laya.Event.CLICK, this, this.onStageClick);
    }

    /**
     * ui界面初始化
     */
    _proto.resetUI = function(){
        this.infoLable.text = "";
        this.hp(3);
        this.level(0);
        this.score(0);
    }

    /**
     * 暂停状态下在舞台上的点击动作,它会使得游戏继续
     */
    _proto.onStageClick = function () {
        this.infoLable.text = "";
        resumeGame();
    }

    /**
     * 显示当前的血量
     * @param hp 需要显示的血量
     */
    _proto.hp = function (hp) {
        this.hpLable.text = "HP:" + hp;
    }

    /**
     * 显示关卡级别
     * @param level 需要显示的级别
     */
    _proto.level = function (level) {
        this.levelLable.text = "level:" + level;
    }

    /**
     * 显示积分
     * @param score 需要显示的积分
     */
    _proto.score = function (score) {
        this.scoreLable.text = "score:" + score;
    }

    return GameInfo;
})(ui.GameInfoUI);
