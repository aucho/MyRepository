
cc.Class({
    extends: cc.Component,

    properties: {
       brickLife : 1,
       brick1 :{ default : null,  type : cc.SpriteFrame},
       brick2 :{ default : null,  type : cc.SpriteFrame},
       brick3 :{ default : null,  type : cc.SpriteFrame},
       brick4 :{ default : null,  type : cc.SpriteFrame},
       waterAudio1 : {  default : null,  type : cc.AudioClip},
       waterAudio2 : {  default : null,  type : cc.AudioClip},
       waterAudio3 : {  default : null,  type : cc.AudioClip},
       waterAudio4 : {  default : null,  type : cc.AudioClip},

    },
    onLoad(){
        if(this != null){
            this.changeColor();
        }
    },
    start(){
        
    },

    update(dt){
        //过线坠落
        if(this.node.y <= -520)         
        {
            this.getComponent(cc.RigidBody).type = 2; //dynamic
            setTimeout(()=>{ if(this.node !== null) this.node.destroy() },10000);
        }
    },
 
    onBeginContact: function (contact, selfCollider, otherCollider){
        //击中事件冒泡
        switch(otherCollider.tag){
            case 12 :
                otherCollider.node.destroy();
            case 10:                               //球
                this.audioEffectPlay();
                this.node.dispatchEvent(new cc.Event.EventCustom("hitBrick",true)); 
                this.brickLife--;
                this.changeColor();
                break;
            case 7 :                                //左右墙壁
                this.node.dispatchEvent(new cc.Event.EventCustom("hitBrick",true)); 
                this.node.destroy();
                break;
            case 6 :this.node.destroy();break;      //底部
            default : break;
        }
    },

    changeColor : function(){
        var that = this;
        var spr = function (err, spriteFrame){
            if(that.node != null)
                that.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        };
        switch(this.brickLife){
            case 0 : this.node.destroy();break;
            case 1 : cc.loader.loadRes("brick1",   cc.SpriteFrame, spr);break;
            case 2 : cc.loader.loadRes("brick2", cc.SpriteFrame, spr);break;
            case 3 : cc.loader.loadRes("brick3", cc.SpriteFrame, spr);break;
            case 4 : cc.loader.loadRes("brick4", cc.SpriteFrame, spr);break;
            case 5 : 
                this.node.dispatchEvent(new cc.Event.EventCustom("genBottomBrick",true)); 
                this.node.destroy();
                break;
            default : cc.loader.loadRes("brick-5", cc.SpriteFrame, spr);break;
        }
    },
    //水滴音效
    audioEffectPlay : function(){
        let r = Math.floor(Math.random()*4);
        switch(r){
            case 0:cc.audioEngine.play(this.waterAudio1,false,0.8);break;
            case 1:cc.audioEngine.play(this.waterAudio2,false,0.8);break;
            case 2:cc.audioEngine.play(this.waterAudio3,false,0.8);break;
            case 3:cc.audioEngine.play(this.waterAudio4,false,0.8);break;
        }
        
    }
    // reuse:function(){
    //     this.area.getComponent("generateBrick").brickPool.put(this);
    //     console.log(this.area.getComponent("generateBrick").brickPool.put(this));
    // }

});