
cc.Class({
    extends: cc.Component,

    properties: {
        brick : {
            type : cc.Node,
            default : null
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start(){
        this.node.width = 64;
        this.node.height = 64;
        this.node.parent.width = 37;
        this.node.parent.height = 37;
        this.node.x = 0;
        this.node.y = 0;
        this.brick = this.node.parent;
        this.node.parent = this.node.parent.parent;//节点挂载到brickArea
    },

    onBeginContact : function(contact, self, other){
        if(this.brick !== null && this.brick.active === true)
            {
                this.brick.width = 60;
                this.brick.height = 60;
            }
        this.node.destroy();
    },

    onDestroy : function(){
        // bubble = this.node.instantiate(this);
        // bubble.parent = this.node.parent;
    },

    update (dt) {
        if(this.node.y <= -520)
        {
            this.getComponent(cc.RigidBody).type = 2; //dynamic
            setTimeout(()=>{ if(this.node !== null) this.node.destroy() },10000);
        }
    },
});
