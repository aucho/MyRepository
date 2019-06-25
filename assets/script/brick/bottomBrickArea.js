
cc.Class({
    extends: cc.Component,

    properties: {
        brick: {
            default : null,
            type: cc.Node
        },
        space : 10,  //砖间间隔
        brickNum : 0,
    },

    genBrick : function(num){
        let brick = new Array();
        for(let i = 0; i<num; i++){
            brick[i] = null;
            brick[i] = cc.instantiate(this.brick)
            brick[i].active = true;
            brick[i].parent = this.node;
        // //每行可容纳块数
            let colNum = Math.floor((this.node.width + this.space)/(brick[i].width + this.space));
        // //砖块坐标 
            brick[i].x = (brick[i].width + this.space)* (i % colNum) + 1/2 * brick[i].width;
            brick[i].y = -((brick[i].height + this.space) * Math.floor(i/colNum) + 1/2 * brick[i].height);
            
            var act = cc.moveBy(2, 0, 200);
            brick[i].runAction(act);
        }
    },

    destroyBrick :function(){
        var brick = new Array();
        brick = this.node.children;
        for(let i = 0;i<20 ;i++){
            if(brick[i] !== undefined )
                brick[i].destroy();
        }
    }
        
    
});
