var CLASS$=Laya.class;
var STATICATTR$=Laya.static;
var View=laya.ui.View;
var Dialog=laya.ui.Dialog;
var GameInfoUI=(function(_super){
		function GameInfoUI(){
			
		    this.pauseBtn=null;
		    this.hpLable=null;
		    this.levelLable=null;
		    this.scoreLable=null;
		    this.infoLable=null;

			GameInfoUI.__super.call(this);
		}

		CLASS$(GameInfoUI,'ui.GameInfoUI',_super);
		var __proto__=GameInfoUI.prototype;
		__proto__.createChildren=function(){
		    
			laya.ui.Component.prototype.createChildren.call(this);
			this.createView(GameInfoUI.uiView);
		}
		GameInfoUI.uiView={"type":"View","props":{"width":400,"height":852},"child":[{"type":"Image","props":{"y":10,"x":350,"width":45,"var":"pauseBtn","skin":"war/game_pause_nor.png","height":45}},{"type":"Label","props":{"y":10,"x":0,"width":100,"var":"hpLable","text":"HP:0","height":30,"fontSize":24,"font":"Arial","color":"#00ff00","align":"center"}},{"type":"Label","props":{"y":10,"x":110,"width":100,"var":"levelLable","text":"level:0","height":30,"fontSize":24,"font":"Arial","color":"#ffffff","align":"center"}},{"type":"Label","props":{"y":10,"x":230,"width":100,"var":"scoreLable","text":"score:0","height":30,"fontSize":24,"font":"Arial","color":"#f4ff00","align":"center"}},{"type":"Label","props":{"y":400,"x":0,"width":400,"var":"infoLable","text":"游戏结束","height":100,"fontSize":24,"font":"Microsoft YaHei","color":"#ffffff","bold":true,"align":"center"}}]};
		return GameInfoUI;
	})(View);