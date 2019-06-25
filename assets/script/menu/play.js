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
        //button: cc.Button,
        startAudio : 
        {  
            default : null,
            type : cc.AudioClip
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.button.node.on('click', this.play, this);
        // cc.loader.downloader.loadSubpackage('game', function (err) {
        //     if (err) {
        //         return console.error(err);
        //     }
        //     console.log('load subpackage successfully.');
        // });
    },

    start () {
    },

    play : function(){

        cc.audioEngine.play(this.startAudio);
        cc.director.loadScene("game");
    }
    // update (dt) {},
});
