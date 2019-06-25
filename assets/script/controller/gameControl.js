
import bottomBrick from "bottomBrickArea";
import genBrick from "generateBrick";
import movePlat from "movePlat";
import cover from "coverBg";
import data from "DATA";


cc.Class({
    extends: cc.Component,

    properties: {
        moveBall : require("moveBall"),
        bottomBrick : bottomBrick,
        movePlat : movePlat,
        genBrick : genBrick,
        data  : data,
        cover : cover,
        score : {
            type : cc.Label,
            default : null
        },
        gameOverAudio : 
        {  
            default : null,
            type : cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        if((cc.winSize.width/cc.winSize.height) > 0.6)
            this.getComponent(cc.Canvas).fitHeight = true;
        else
            this.getComponent(cc.Canvas).fitHeight = false;
        console.log(cc.winSize.width/cc.winSize.height, this.getComponent(cc.Canvas).fitHeight)
        //按键控制退出
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            if (event.keyCode === cc.KEY.back) {
                cc.director.end();
            }
        });
        this.gameStart();
    },

    init(){
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        this.data.init();
        this.cover.init();
        this.score.string = this.data.score;
        this.genBrick.init(this.data.brickNum);
        this.moveBall.init(600);
        this.movePlat.init();
        this.node.on("ballShot",this.ballShot,this); //ball发射后解锁plat移动,砖块开始生成并下坠
        this.node.on("hitBrick",this.onHit,this);       //接收到砖块被击中执行
        this.node.on("superBall",this.superBall,this);  //超级球启动
        this.node.on("bullet",  this.bullet,this);  //子弹平台启动
        this.node.on("genBottomBrick",this.genBottomBrick,this);  //黑块销毁，底部生砖
        this.node.on("gameOver",this.gameOver,this); 
    },

    gameStart(){
        this.init();
    },
    //每次消灭砖块加分，同时球提速
    onHit : function(){
        this.data.addScore(1);
        this.data.subBrick();
        //console.log(this.data.brickNum);
        this.score.string = this.data.score;
        var spe = 100*Math.log2(3*this.data.score+45)+50;
        this.moveBall.speedUp(spe);
        //sconsole.log(this.moveBall.ballSpeed);
    },

    ballShot : function(){ 
        setTimeout(()=>{
            this.genTimer = setInterval(()=>{this.genBrick.genBrick(10,this.data.score)},8000);
        }, 4000)           
        this.moveTimer = setInterval(()=>{this.genBrick.brickMove()},8000);
        this.movePlat.isBallShot = true;
        //this.node.on("ballStop",this.ballAct,this); //球运行中停止，执行
    },
    ballAct : function(){
        //this.moveBall.speedUp(600);
    },

    superBall : function(){
        this.moveBall.superBall();
        this.genBrick.superBallActivate();
    },

    bullet : function(){
        this.movePlat.bubbleBrick();
        clearInterval(this.shootBullet);
        this.movePlat.allowRotate = true;
        this.shootBullet = setInterval(()=>{this.movePlat.shootBullet();},1000);
        setTimeout(()=>{clearInterval(this.shootBullet); this.movePlat.allowRotate = true},28000) //28s
    },
    
    genBottomBrick : function(){
        this.bottomBrick.destroyBrick();
        this.bottomBrick.genBrick(10);
    },

    gameOver : function(){
        cc.audioEngine.play(this.gameOverAudio,false,1);
        cc.director.getPhysicsManager().enabled = false;
        cc.director.getCollisionManager().enabled = false;
        this.bottomBrick.destroyBrick();
        this.genBrick.gameOver();
        this.movePlat.gameOver();
        this.moveBall.gameOver();
        clearInterval(this.genTimer);
        clearInterval(this.moveTimer);
        clearInterval(this.shootBullet);
        this.movePlat.isBallShot = false;
        this.cover.gameOver(this.data.score);
        this.node.off("ballShot",this.activatPlat,this); 
        this.node.off("hitBrick",this.onHit,this);      
        this.node.off("superBall",this.superBall,this);
        this.node.off("genBottomBrick",this.genBottomBrick,this); 
        this.node.off("gameOver",this.gameOver,this);
    },



});
