
cc.Class({
    extends: cc.Component,

    properties: {
        //score : 0,
        //brickNum : 20

        //----tag-----
        //plat   is 1
        //brick  is 2
        //superBallBrick  3
        //bottomBrick is  4
        //shield is 5
        //bottom is 6
        //left   is 7
        //right  is 7
        //cover  is 8
        //bulletBrick 9
        //ball   is 10
        //superball 11
        //bullet    12
 
    },

    init(){
        this.score = 0;
        this.brickNum = 40;
    },

    addScore : function(s){
        this.score += s;
    },

    subBrick : function(){
        this.brickNum --;
    },

    addBrick : function(n){
        this.brickNum += n;
    }

    // update (dt) {},
});
