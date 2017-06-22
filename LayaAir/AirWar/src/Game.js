//程序主入口
    var Game = (function(){
    (function Game(){
        //初始化窗口大小为背景图的大小439*780,默认使用canvass渲染
        Laya.init(439,780);
        //创建循环滚动的背景
        this.bg = new BackGround();
        //把背景加到舞台上显示出来
        Laya.stage.addChild(this.bg);
    })();
})();