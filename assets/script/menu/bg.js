// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        updateRate : 0.004
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.i = Math.floor(Math.random()*100);
    },

    start () {
        
    },

    update (dt) {
        dt = 1;
        this.i+= this.updateRate;
        //137--200之间浮动
        var r = 36.5 * Math.sin(this.i) + 173.5;
        var g = 36.5 * Math.sin(this.i+this.i/3) + 173.5;
        var b = 36.5 * Math.sin(this.i+1) + 173.5;
        // var r = (0 + this.i)% 200 + 137;;
        // var g = (73 + this.i)% 200 + 137;
        // var b = (40 + this.i)% 200 + 137;
        this.node.color = new cc.color(r,g,b)
    },
});
