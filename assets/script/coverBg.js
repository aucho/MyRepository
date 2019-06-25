
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},


    backToMenu: function(){
        cc.director.loadScene("menu");
    },

    init: function() {
        this.node.opacity = 0;
        var score = this.node.getChildByName("score");
        score.opacity = 0;
        this.node.active = false;
    },

    share : function(){
        wx.shareAppMessage({
            title: '我要分享',
            success: function (res) {
              console.log('拉起分享 成功');
              console.log(res);
            },
            fail: function (res) {
              console.log('拉起分享 失败');
              console.log(res);
            }
          });
    },
    gameOver : function(sc) {
        console.log(sc)
        var score = this.node.getChildByName("score");
        score.getComponent(cc.Label).string = sc;
        this.node.active = true;
        setTimeout(()=>{
            var fade = cc.fadeIn(2);
            this.node.runAction(fade);
        },1000);
        score.opacity = 255;
    }

    // update (dt) {},
});
