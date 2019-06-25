
cc.Class({
    extends: cc.Component,

    properties: {
        isBallShot : false, //平台运动开关
        allowRotate : true, //平台旋转开关
        bulletNum : 0,
        bullet : {
            default : null,
            type : cc.Node
        },
        bubble: {
            type : cc.Node,
            default : null
        },
    },

    //onLoad:function() {}, 

    init(){
        this.isBallShot = false;
        this.node.x = 0;
        this.node.y = -335;
        this.node.rotation = 0;
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE,this.onTouchMove, this);
    },



    start () {
    },

    onTouchMove:function(t){

        var wPos = t.getLocation();
        var pPos = this.node.parent.convertToNodeSpaceAR(wPos);
        var pos = this.node.convertToNodeSpaceAR(wPos);
        //获取距离上一次触摸移动的位置变化
        var delta = t.getDelta();
        //限制移动范围
        var moL = cc.winSize.width/2 - this.node.width/2;
        //水平拖动
        if( this.isBallShot
            && pos.y < 0 &&
            (
            (this.node.x < moL &&  delta.x > 0 )|
            (this.node.x > -moL &&  delta.x < 0 )
            ) 
        )   this.node.x += delta.x;
        //垂直转向
        //屏幕右侧垂直方向滑动
        if( this.isBallShot &&
            this.allowRotate&&
            pPos.x > this.node.x &&
            pPos.y > (this.node.y + 10) &&                  // 横板以上+10 垂直滑动 以移动角度
            (
            (this.node.rotation <-0.6 && delta.y<0) |      // 下移大于0度 上移不过45度
            (this.node.rotation >-45 && delta.y>0)
            )
        )   this.node.rotation -= delta.y/5;
                
        //左侧
        else if( this.isBallShot &&
            this.allowRotate     &&
            pPos.x < this.node.x &&
            pPos.y > (this.node.y + 10) &&                  // 横板以上+10 垂直滑动 以移动角度
            (
            (this.node.rotation >0.6 && delta.y<0) |      // 下移大于0度 上移不过45度
            (this.node.rotation <45 && delta.y>0)
            )
        )   this.node.rotation += delta.y/5;
        
    },

    //开启子弹平台
    shootBullet(){
        this.rotation = 0;
        var bullet = cc.instantiate(this.bullet);
        bullet.parent = this.node;
        bullet.x = -40;
        bullet.y = 20;
        bullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,500);
        bullet.active = true;

        var bullet0 = cc.instantiate(this.bullet);
        bullet0.parent = this.node;
        bullet0.x = 40;
        bullet0.y = 20;
        bullet0.getComponent(cc.RigidBody).linearVelocity = cc.v2(0,500);
        bullet0.active = true;

        this.allowRotate = false;
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
        var b = new Array();
        b = this.node.children;
        for(let i = 0;i<10 ;i++){
            if(b[i] !== undefined )
                b[i].destroy();
            else console.log("0");
        }
    }
});
