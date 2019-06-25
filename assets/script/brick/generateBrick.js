cc.Class({
    extends: cc.Component,

    properties: {
        space : 10,  //砖间间隔
        brickNum : 0,
        /*brickPrefab: cc.Prefab,*/
        brick:{
            default: null,
            type : cc.Node,
        },
        superBall:{
            default: null,
            type : cc.Node,
        },
        shield:{
            default: null,
            type : cc.Node,
        },
        bullet: {
            default: null,
            type : cc.Node,
        },
        c : 0
    },

    onLoad () {
        
    },

    init(n){
        this.brickNum = n;
        this.genBrick(this.brickNum, 0);
        // console.log(this.brickNum);
    },

    start () {
        this.node.on("unuse",(event)=>{
            console.log(event);
        },this)
    },

    genBrick(num, score){
        var brick = new Array();
        //稳定状态 白40 蓝30 紫20  橙10 （特殊块包含在白块里）
        //初始     白 80 蓝15 紫5 橙0
        //前150分,蓝白交换，150到400 白 ，紫，橙，交换
        //特殊块概率从白块分割，后续生成的砖块有概率生成特殊块
        var probWhite = 60;
        var probBlue  = 20;
        var probViolet = 10;
        var probSpecial = 0;
        probSpecial = 8;
        if(score > 1) probSpecial = 4;
        if(score < 150) 
        {
            probWhite = -score * 0.1 + 80;
            probBlue  =  score * 0.1  + 15;
        }
        else if(score > 150 && score < 400) 
        {
            console.log("in")
            probBlue  = 30;
            probWhite = -score * 0.1 + 80;
            probViolet= (score-150) * 0.06 + 5;
            probSpecial = 2
        }
        else{
            probWhite = 40;
            probBlue  = 30;
            probViolet= 20;
            probSpecial = 1.5;
        }
        //probSpecial = 30;
        //console.log(probWhite,probBlue,probViolet,100-probBlue-probWhite-probViolet);
        probBlue += probWhite;
        probViolet += probBlue;
        
        //planB
        //probSpecial = -60 / score + 3;
        // probSpecial = -40 / score + 2;
        // probOrange   = 10000/(score+333) +40;
        // if (score < 150)    probBlue = score/(150/35) + 15 + probWhite;
        // else                probBlue = 10000/(score+50)
        // if(score < 300)     probViolet = score/(300/25.5) + 4.5 + probBlue;
        // else                probViolet = 10000/(score+33)
        
        for(let i = 0; i<num; i++){
            //console.log(i);
            //this.c = this.c+1 ;
            let rand  = Math.random() * 100;
            let genB  = (bLife)=>{
                brick[i] = cc.instantiate(this.brick);
                brick[i].getComponent("brick").brickLife = bLife
                }
           
            let randB = Math.floor(Math.random()*4);
            if(rand < probSpecial){
                switch(randB)
                {
                    case 0 : 
                        brick[i] = cc.instantiate(this.superBall);  //超级球
                        break;
                    case 1 : 
                        genB(Math.floor(Math.random() * 3+1));      //气泡护盾砖
                        let shield = cc.instantiate(this.shield);
                        brick[i].parent = this.node;
                        shield.parent = brick[i];
                        shield.active = true;
                        break;
                    case 2 :
                        brick[i] = cc.instantiate(this.bullet);     //子弹砖块
                        break;
                    case 3 :
                        genB(9);break;                              //9-5 黑砖
                        
                    default:
                        genB(1);break;
                }
            }

            // ----------------normal brick below---------------------
            else if(rand >= probSpecial && rand <probWhite) genB(1);
            else if(rand >= probWhite   && rand <probBlue)  genB(2);
            else if(rand >= probBlue    && rand <probViolet)genB(3);
            else if(rand >= probViolet  && rand <100)       genB(4);
            else genB(1);
            //每行可容纳块数
            let colNum = Math.floor((this.node.width + this.space)/(brick[i].width + this.space));
            //砖块坐标 
            brick[i].x = (brick[i].width + this.space)* (i % colNum) + 1/2 * brick[i].width;
            brick[i].y = -((brick[i].height + this.space) * Math.floor(i/colNum) - 1/2 * brick[i].height);
            brick[i].active = true;
            brick[i].parent = this.node;

            //console.log(this.c);

        }
    },


    //superball
    superBallActivate: function(){
        var brick = new Array();
        brick = this.node.children;
        for(let i = 0;i<120 ;i++){
            if(brick[i] !== undefined ){
                if(brick[i].active !== false)
                switch(brick[i].name){
                    case "brick":
                    {
                        brick[i].getComponent(cc.RigidBody).gravityScale = 0;
                        brick[i].getComponent(cc.RigidBody).type=2;
                        setTimeout(()=>{
                            if(brick[i] !== null && brick[i] !== undefined){
                                brick[i].getComponent(cc.RigidBody).type = 0;
                                brick[i].getComponent(cc.RigidBody).gravityScale = 1;
                            }
                        },8000);
                        break;
                    }
                    case "superBallBrick":
                        break;
                    case "shieldBrick":
                        break;
                    default :
                        {brick[i].name;break;}
                }
                else console.log(brick[i].name, i, "not active");
            }
            else{
                console.log(i);
                console.log("break");
                break;
            }
        }
    },

    //使砖块运动
    brickMove : function(){
        var brick = new Array();
        brick = this.node.children;
        for(let i = 0;i<brick.length ;i++){
            if(brick[i] !== null && brick[i] !== undefined){
                let act = cc.moveBy(1, 0, -70);
                brick[i].runAction(act);
            }
            else
                console.log("brick_move nil brick genbrick 172");
        }
    },
    //使砖块停止运动
    brickPause: function () {
        this.unscheduleAllCallbacks();
    },

    gameOver: function(){
        clearInterval(this.genTimer);
        var brick = new Array();
        brick = this.node.children;
        for(let i = 0;i<120 ;i++){
            if(brick[i] !== undefined )
                brick[i].destroy();
        }
    }
});
