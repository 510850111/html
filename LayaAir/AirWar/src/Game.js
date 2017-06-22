//程序主入口
    var BackGroundImageXLength = 439;
    var BackGroundImageYLength = 780;
    var Game = (function(){
    (function Game(){
        //初始化窗口大小为背景图的大小439*780,默认使用canvass渲染
        Laya.init(BackGroundImageXLength,BackGroundImageYLength);
        //创建循环滚动的背景
        this.bg = new BackGround();
        //把背景加到舞台上显示出来
        Laya.stage.addChild(this.bg);
        //加载图集资源
        Laya.loader.load("res/atlas/war.json",Laya.Handler.create(this,onLoaded),null,Laya.Loader.ATLAS);
    })();

    function onLoaded(){
        //创建一个主角
        this.hero = new Role();
        //设置主角的位置
        this.hero.pos(BackGroundImageXLength/3,(BackGroundImageYLength/3)*2);
        //把它添加到舞台上
        Laya.stage.addChild(this.hero);
    }
})();