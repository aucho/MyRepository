
cc.Class({
    extends: cc.Component,

    properties: {
        onHit : false
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },
    
    start () {
        // this.node.width = 64;
        // this.node.height = 64;
    },

    onCollisionEnter: function (other, self) {
        switch(other.tag){
            case 10:  {
                this.onHit = true;                //撞到球
                break;
            } 
            case 1 :{                             //平台吃到
                this.node.dispatchEvent(new cc.Event.EventCustom('bullet',true));   
                this.node.destroy();
                break;
            } 
            case 6 :{                             //触底消失
                this.node.destroy();
                break;
            }
            default : console.log("hit_tag", other.tag, other.name);
        }
    },

    update (dt) {
        if( this.onHit === true) 
        {   
            this.onHit = false;
            this.getComponent(cc.RigidBody).type = 2; //2 for dynamic
        }


        if(this.node.y <= -520)         
        {
            this.getComponent(cc.RigidBody).type = 2; //dynamic
            setTimeout(()=>{ if(this.node !== null) this.node.destroy() },10000);
        }
    },
});

