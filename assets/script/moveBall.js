cc.Class({
    extends: cc.Component,

    properties: {
        isBallMove : false,
        ballLife : 2,
        ballSpeed : 0,
        onHit : false,
        bubble: {
            type : cc.Node,
            default : null
        },
        ballLifeSubAudio : 
        {  
            default : null,
            type : cc.AudioClip
        },
    },

    
    init (s) {
        //初始化球速度
        this.ballSpeed = s;
        this.ballLife = 2,
        this.node.position = cc.v2(0,-310);
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,0);
        this.node.parent.on(cc.Node.EventType.TOUCH_START,this.lineMove,this);
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE,this.lineMove,this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END,this.ballMove,this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL,this.touchCancel,this);
        this.node.getChildByName("shield").active = true;
        this.node.getChildByName("motionStreak").active = false;
    },

    start () {

    },

    update (dt) {
    },

        
    onBeginContact(contact, selfCollider, otherCollider){
        switch(otherCollider.tag){
            case 6 :              //球触底
                this.ballLife--;
                if(this.ballLife === 0)
                {
                    this.isBallMove = false;
                    this.node.dispatchEvent(new cc.Event.EventCustom('gameOver', true));
                }
                else if(this.ballLife === 1)
                {
                    this.node.getChildByName("shield").active = false;
                    this.node.getChildByName("motionStreak").active = true;
                    this.bubbleBrick();
                    cc.audioEngine.play(this.ballLifeSubAudio);
                }
                else if(this.ballLife === 2)
                {
                    this.node.getChildByName("shield1").active = false;
                    this.bubbleBrick();
                    cc.audioEngine.play(this.ballLifeSubAudio);
                };
                break;

            case 4 :             //底部砖块
                otherCollider.node.destroy();
                break;
            case 5 :             //生命+1
                if(this.ballLife === 1){
                    this.node.getChildByName("shield").active = true;
                    this.node.getChildByName("motionStreak").active = false;
                    this.ballLife ++;
                }
                else if(this.ballLife === 2){
                    this.node.getChildByName("shield1").active = true;
                    this.ballLife ++;
                }
                break;
            case 9 : 
                //this.ballLife++;
                break;
            default : break;
        }
    },

    //发球线随触摸出现和移动
    lineMove : function(t){
        var shootLine = this.node.getChildByName("shootLine");
        shootLine.active = true;
        //位置校准
        var wPos = t.getLocation();
        var nPos = this.node.convertToNodeSpaceAR(wPos);
        var  r1  = Math.atan2(nPos.x,nPos.y);
        var angle = r1 / Math.PI * 180;

        if(nPos.y > 0)
        shootLine.rotation = angle;
        //发球线出现
        shootLine.opacity = 255;
    },

    //根据触摸结束位置发射球
    ballMove : function(t){
        //触摸结束隐藏发球线
        var shootLine = this.node.getChildByName("shootLine");
        shootLine.opacity = 0; 
        var wPos = t.getLocation();//获取当前点击世界位置
        //console.log("world",wPos.x, wPos.y)
        var nPos = this.node.convertToNodeSpaceAR(wPos);//将世界坐标转化为节点锚点坐标
        
        var dir = Math.atan2(nPos.y,nPos.x);              //鼠标点击方向
        var dirX = this.ballSpeed * Math.cos(dir)
        var dirY = this.ballSpeed * Math.sin(dir)
        //球运动
        if(nPos.y>0 && !this.isBallMove) 
        {
            shootLine.active = false;//发射后取消发球线
            this.getComponent(cc.RigidBody).linearVelocity = cc.v2(dirX,dirY);
            this.isBallMove = true;
            this.node.dispatchEvent(new cc.Event.EventCustom('ballShot',true));
            this.node.parent.off(cc.Node.EventType.TOUCH_START,this.lineMove,this);
            this.node.parent.off(cc.Node.EventType.TOUCH_MOVE,this.lineMove,this);
            this.node.parent.off(cc.Node.EventType.TOUCH_END,this.ballMove,this);
        }
    },

    //触摸取消
    touchCancel : function(){
        var shootLine = this.node.getChildByName("shootLine");
        shootLine.opacity = 0; 
    },

    //加速
    speedUp : function(speed){
        this.ballSpeed = speed;
        var oriSpeed = this.getComponent(cc.RigidBody).linearVelocity;
        var dir = Math.atan2(oriSpeed.y,oriSpeed.x);              //速度方向
        var dirX = this.ballSpeed * Math.cos(dir)
        var dirY = this.ballSpeed * Math.sin(dir)
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(dirX,dirY);
    },

    //变成superBall！
    superBall : function(){
        console.log("transform!")
        this.node.getChildByName("superBall").active = true;
        this.getComponent(cc.PhysicsCircleCollider).tag = 11;
        setTimeout(()=>{
            this.node.getChildByName("superBall").active = false;
            this.getComponent(cc.PhysicsCircleCollider).tag = 10;
        },8000);
    },

    //护盾爆炸
    bubbleBrick : function(){
        var bub  = cc.instantiate(this.bubble);
        bub.parent = this.node;
        bub.x = 0;
        bub.y = 0;
        var rand1 = Math.random()*1000-500;    //-50 to +50
        var rand2 = Math.random()*1000-500;
        var vec  = cc.v2(rand1,rand2);
        bub.getComponent(cc.RigidBody).linearVelocity = vec;
        bub.active = true;
        setTimeout(
            ()=>{bub.destroy();}
            ,1500)
    },

    gameOver: function(){
        this.node.getChildByName("superBall").active = false;
        this.node.getChildByName("shield1").active = false;
    }
});