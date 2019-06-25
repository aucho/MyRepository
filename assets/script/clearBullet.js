
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onBeginContact(contact,self,other){
        if(other.tag === 12)
            other.node.destroy();
    },

    start () {

    },

});
