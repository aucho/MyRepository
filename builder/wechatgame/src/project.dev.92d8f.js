window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  DATA: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "613ecw7hmROK6+Tfk3XeqdE", "DATA");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      init: function init() {
        this.score = 0;
        this.brickNum = 40;
      },
      addScore: function addScore(s) {
        this.score += s;
      },
      subBrick: function subBrick() {
        this.brickNum--;
      },
      addBrick: function addBrick(n) {
        this.brickNum += n;
      }
    });
    cc._RF.pop();
  }, {} ],
  bg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8957bCbWd5OXYOWJIQzHFoY", "bg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        updateRate: .004
      },
      onLoad: function onLoad() {
        this.i = Math.floor(100 * Math.random());
      },
      start: function start() {},
      update: function update(dt) {
        dt = 1;
        this.i += this.updateRate;
        var r = 36.5 * Math.sin(this.i) + 173.5;
        var g = 36.5 * Math.sin(this.i + this.i / 3) + 173.5;
        var b = 36.5 * Math.sin(this.i + 1) + 173.5;
        this.node.color = new cc.color(r, g, b);
      }
    });
    cc._RF.pop();
  }, {} ],
  bottomBrickArea: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5711fDfTCtNU4m10VJiujMf", "bottomBrickArea");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        brick: {
          default: null,
          type: cc.Node
        },
        space: 10,
        brickNum: 0
      },
      genBrick: function genBrick(num) {
        var brick = new Array();
        for (var i = 0; i < num; i++) {
          brick[i] = null;
          brick[i] = cc.instantiate(this.brick);
          brick[i].active = true;
          brick[i].parent = this.node;
          var colNum = Math.floor((this.node.width + this.space) / (brick[i].width + this.space));
          brick[i].x = (brick[i].width + this.space) * (i % colNum) + .5 * brick[i].width;
          brick[i].y = -((brick[i].height + this.space) * Math.floor(i / colNum) + .5 * brick[i].height);
          var act = cc.moveBy(2, 0, 200);
          brick[i].runAction(act);
        }
      },
      destroyBrick: function destroyBrick() {
        var brick = new Array();
        brick = this.node.children;
        for (var i = 0; i < 20; i++) void 0 !== brick[i] && brick[i].destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  brick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f16eWgVlhDhqqnq88WO5E1", "brick");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        brickLife: 1,
        brick1: {
          default: null,
          type: cc.SpriteFrame
        },
        brick2: {
          default: null,
          type: cc.SpriteFrame
        },
        brick3: {
          default: null,
          type: cc.SpriteFrame
        },
        brick4: {
          default: null,
          type: cc.SpriteFrame
        },
        waterAudio1: {
          default: null,
          type: cc.AudioClip
        },
        waterAudio2: {
          default: null,
          type: cc.AudioClip
        },
        waterAudio3: {
          default: null,
          type: cc.AudioClip
        },
        waterAudio4: {
          default: null,
          type: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        null != this && this.changeColor();
      },
      start: function start() {},
      update: function update(dt) {
        var _this = this;
        if (this.node.y <= -520) {
          this.getComponent(cc.RigidBody).type = 2;
          setTimeout(function() {
            null !== _this.node && _this.node.destroy();
          }, 1e4);
        }
      },
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        switch (otherCollider.tag) {
         case 12:
          otherCollider.node.destroy();

         case 10:
          this.audioEffectPlay();
          this.node.dispatchEvent(new cc.Event.EventCustom("hitBrick", true));
          this.brickLife--;
          this.changeColor();
          break;

         case 7:
          this.node.dispatchEvent(new cc.Event.EventCustom("hitBrick", true));
          this.node.destroy();
          break;

         case 6:
          this.node.destroy();
        }
      },
      changeColor: function changeColor() {
        var that = this;
        var spr = function spr(err, spriteFrame) {
          null != that.node && (that.node.getComponent(cc.Sprite).spriteFrame = spriteFrame);
        };
        switch (this.brickLife) {
         case 0:
          this.node.destroy();
          break;

         case 1:
          cc.loader.loadRes("brick1", cc.SpriteFrame, spr);
          break;

         case 2:
          cc.loader.loadRes("brick2", cc.SpriteFrame, spr);
          break;

         case 3:
          cc.loader.loadRes("brick3", cc.SpriteFrame, spr);
          break;

         case 4:
          cc.loader.loadRes("brick4", cc.SpriteFrame, spr);
          break;

         case 5:
          this.node.dispatchEvent(new cc.Event.EventCustom("genBottomBrick", true));
          this.node.destroy();
          break;

         default:
          cc.loader.loadRes("brick-5", cc.SpriteFrame, spr);
        }
      },
      audioEffectPlay: function audioEffectPlay() {
        var r = Math.floor(4 * Math.random());
        switch (r) {
         case 0:
          cc.audioEngine.play(this.waterAudio1, false, .8);
          break;

         case 1:
          cc.audioEngine.play(this.waterAudio2, false, .8);
          break;

         case 2:
          cc.audioEngine.play(this.waterAudio3, false, .8);
          break;

         case 3:
          cc.audioEngine.play(this.waterAudio4, false, .8);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  bulletBrick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ee607FIn/xOiaptFkbBPVBs", "bulletBrick");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        onHit: false
      },
      onLoad: function onLoad() {},
      start: function start() {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        switch (other.tag) {
         case 10:
          this.onHit = true;
          break;

         case 1:
          this.node.dispatchEvent(new cc.Event.EventCustom("bullet", true));
          this.node.destroy();
          break;

         case 6:
          this.node.destroy();
          break;

         default:
          console.log("hit_tag", other.tag, other.name);
        }
      },
      update: function update(dt) {
        var _this = this;
        if (true === this.onHit) {
          this.onHit = false;
          this.getComponent(cc.RigidBody).type = 2;
        }
        if (this.node.y <= -520) {
          this.getComponent(cc.RigidBody).type = 2;
          setTimeout(function() {
            null !== _this.node && _this.node.destroy();
          }, 1e4);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  clearBullet: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0c57bIimBtLgZ1EBOeDo0uO", "clearBullet");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onBeginContact: function onBeginContact(contact, self, other) {
        12 === other.tag && other.node.destroy();
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  coverBg: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9dca4wh3bNFfaGsUsuKEzgy", "coverBg");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      backToMenu: function backToMenu() {
        cc.director.loadScene("menu");
      },
      init: function init() {
        this.node.opacity = 0;
        var score = this.node.getChildByName("score");
        score.opacity = 0;
        this.node.active = false;
      },
      share: function share() {
        wx.shareAppMessage({
          title: "\u6211\u8981\u5206\u4eab",
          success: function success(res) {
            console.log("\u62c9\u8d77\u5206\u4eab \u6210\u529f");
            console.log(res);
          },
          fail: function fail(res) {
            console.log("\u62c9\u8d77\u5206\u4eab \u5931\u8d25");
            console.log(res);
          }
        });
      },
      gameOver: function gameOver(sc) {
        var _this = this;
        console.log(sc);
        var score = this.node.getChildByName("score");
        score.getComponent(cc.Label).string = sc;
        this.node.active = true;
        setTimeout(function() {
          var fade = cc.fadeIn(2);
          _this.node.runAction(fade);
        }, 1e3);
        score.opacity = 255;
      }
    });
    cc._RF.pop();
  }, {} ],
  gameControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e772ejAcwJML4mhAlaWw5XJ", "gameControl");
    "use strict";
    var _bottomBrickArea = require("bottomBrickArea");
    var _bottomBrickArea2 = _interopRequireDefault(_bottomBrickArea);
    var _generateBrick = require("generateBrick");
    var _generateBrick2 = _interopRequireDefault(_generateBrick);
    var _movePlat = require("movePlat");
    var _movePlat2 = _interopRequireDefault(_movePlat);
    var _coverBg = require("coverBg");
    var _coverBg2 = _interopRequireDefault(_coverBg);
    var _DATA = require("DATA");
    var _DATA2 = _interopRequireDefault(_DATA);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }
    cc.Class({
      extends: cc.Component,
      properties: {
        moveBall: require("moveBall"),
        bottomBrick: _bottomBrickArea2.default,
        movePlat: _movePlat2.default,
        genBrick: _generateBrick2.default,
        data: _DATA2.default,
        cover: _coverBg2.default,
        score: {
          type: cc.Label,
          default: null
        },
        gameOverAudio: {
          default: null,
          type: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        cc.winSize.width / cc.winSize.height > .6 ? this.getComponent(cc.Canvas).fitHeight = true : this.getComponent(cc.Canvas).fitHeight = false;
        console.log(cc.winSize.width / cc.winSize.height, this.getComponent(cc.Canvas).fitHeight);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, function(event) {
          event.keyCode === cc.KEY.back && cc.director.end();
        });
        this.gameStart();
      },
      init: function init() {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getCollisionManager().enabled = true;
        this.data.init();
        this.cover.init();
        this.score.string = this.data.score;
        this.genBrick.init(this.data.brickNum);
        this.moveBall.init(600);
        this.movePlat.init();
        this.node.on("ballShot", this.ballShot, this);
        this.node.on("hitBrick", this.onHit, this);
        this.node.on("superBall", this.superBall, this);
        this.node.on("bullet", this.bullet, this);
        this.node.on("genBottomBrick", this.genBottomBrick, this);
        this.node.on("gameOver", this.gameOver, this);
      },
      gameStart: function gameStart() {
        this.init();
      },
      onHit: function onHit() {
        this.data.addScore(1);
        this.data.subBrick();
        this.score.string = this.data.score;
        var spe = 100 * Math.log2(3 * this.data.score + 45) + 50;
        this.moveBall.speedUp(spe);
      },
      ballShot: function ballShot() {
        var _this = this;
        setTimeout(function() {
          _this.genTimer = setInterval(function() {
            _this.genBrick.genBrick(10, _this.data.score);
          }, 8e3);
        }, 4e3);
        this.moveTimer = setInterval(function() {
          _this.genBrick.brickMove();
        }, 8e3);
        this.movePlat.isBallShot = true;
      },
      ballAct: function ballAct() {},
      superBall: function superBall() {
        this.moveBall.superBall();
        this.genBrick.superBallActivate();
      },
      bullet: function bullet() {
        var _this2 = this;
        this.movePlat.bubbleBrick();
        clearInterval(this.shootBullet);
        this.movePlat.allowRotate = true;
        this.shootBullet = setInterval(function() {
          _this2.movePlat.shootBullet();
        }, 1e3);
        setTimeout(function() {
          clearInterval(_this2.shootBullet);
          _this2.movePlat.allowRotate = true;
        }, 28e3);
      },
      genBottomBrick: function genBottomBrick() {
        this.bottomBrick.destroyBrick();
        this.bottomBrick.genBrick(10);
      },
      gameOver: function gameOver() {
        cc.audioEngine.play(this.gameOverAudio, false, 1);
        cc.director.getPhysicsManager().enabled = false;
        cc.director.getCollisionManager().enabled = false;
        this.bottomBrick.destroyBrick();
        this.genBrick.gameOver();
        this.movePlat.gameOver();
        this.moveBall.gameOver();
        clearInterval(this.genTimer);
        clearInterval(this.moveTimer);
        clearInterval(this.shootBullet);
        this.movePlat.isBallShot = false;
        this.cover.gameOver(this.data.score);
        this.node.off("ballShot", this.activatPlat, this);
        this.node.off("hitBrick", this.onHit, this);
        this.node.off("superBall", this.superBall, this);
        this.node.off("genBottomBrick", this.genBottomBrick, this);
        this.node.off("gameOver", this.gameOver, this);
      }
    });
    cc._RF.pop();
  }, {
    DATA: "DATA",
    bottomBrickArea: "bottomBrickArea",
    coverBg: "coverBg",
    generateBrick: "generateBrick",
    moveBall: "moveBall",
    movePlat: "movePlat"
  } ],
  generateBrick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cc06diF+fhMeqCbK3gHOKi6", "generateBrick");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        space: 10,
        brickNum: 0,
        brick: {
          default: null,
          type: cc.Node
        },
        superBall: {
          default: null,
          type: cc.Node
        },
        shield: {
          default: null,
          type: cc.Node
        },
        bullet: {
          default: null,
          type: cc.Node
        },
        c: 0
      },
      onLoad: function onLoad() {},
      init: function init(n) {
        this.brickNum = n;
        this.genBrick(this.brickNum, 0);
      },
      start: function start() {
        this.node.on("unuse", function(event) {
          console.log(event);
        }, this);
      },
      genBrick: function genBrick(num, score) {
        var _this = this;
        var brick = new Array();
        var probWhite = 80;
        var probBlue = 15;
        var probViolet = 5;
        var probSpecial = 0;
        probSpecial = 2;
        score > 1 && (probSpecial = 4);
        if (score < 150) {
          probWhite = .1 * -score + 80;
          probBlue = .1 * score + 15;
        } else if (score > 150 && score < 400) {
          console.log("in");
          probBlue = 30;
          probWhite = .1 * -score + 80;
          probViolet = .6 * (score - 150) + 5;
          probSpecial = 2;
        } else {
          probWhite = 40;
          probBlue = 30;
          probViolet = 20;
          probSpecial = 1.5;
        }
        probBlue += probWhite;
        probViolet += probBlue;
        var _loop = function _loop(i) {
          var rand = 100 * Math.random();
          var genB = function genB(bLife) {
            brick[i] = cc.instantiate(_this.brick);
            brick[i].getComponent("brick").brickLife = bLife;
          };
          var randB = Math.floor(4 * Math.random());
          if (rand < probSpecial) switch (randB) {
           case 0:
            brick[i] = cc.instantiate(_this.superBall);
            break;

           case 1:
            genB(Math.floor(3 * Math.random() + 1));
            var shield = cc.instantiate(_this.shield);
            brick[i].parent = _this.node;
            shield.parent = brick[i];
            shield.active = true;
            break;

           case 2:
            brick[i] = cc.instantiate(_this.bullet);
            break;

           case 3:
            genB(9);
            break;

           default:
            genB(1);
          } else genB(rand >= probSpecial && rand < probWhite ? 1 : rand >= probWhite && rand < probBlue ? 2 : rand >= probBlue && rand < probViolet ? 3 : rand >= probViolet && rand < 100 ? 4 : 1);
          var colNum = Math.floor((_this.node.width + _this.space) / (brick[i].width + _this.space));
          brick[i].x = (brick[i].width + _this.space) * (i % colNum) + .5 * brick[i].width;
          brick[i].y = -((brick[i].height + _this.space) * Math.floor(i / colNum) - .5 * brick[i].height);
          brick[i].active = true;
          brick[i].parent = _this.node;
        };
        for (var i = 0; i < num; i++) _loop(i);
      },
      superBallActivate: function superBallActivate() {
        var brick = new Array();
        brick = this.node.children;
        var _loop2 = function _loop2(i) {
          if (void 0 === brick[i]) {
            console.log(i);
            console.log("break");
            return "break";
          }
          if (false !== brick[i].active) switch (brick[i].name) {
           case "brick":
            brick[i].getComponent(cc.RigidBody).gravityScale = 0;
            brick[i].getComponent(cc.RigidBody).type = 2;
            setTimeout(function() {
              if (null !== brick[i] && void 0 !== brick[i]) {
                brick[i].getComponent(cc.RigidBody).type = 0;
                brick[i].getComponent(cc.RigidBody).gravityScale = 1;
              }
            }, 8e3);
            break;

           case "superBallBrick":
           case "shieldBrick":
            break;

           default:
            brick[i].name;
          } else console.log(brick[i].name, i, "not active");
        };
        for (var i = 0; i < 120; i++) {
          var _ret2 = _loop2(i);
          if ("break" === _ret2) break;
        }
      },
      brickMove: function brickMove() {
        var brick = new Array();
        brick = this.node.children;
        for (var i = 0; i < brick.length; i++) if (null !== brick[i] && void 0 !== brick[i]) {
          var act = cc.moveBy(1, 0, -70);
          brick[i].runAction(act);
        } else console.log("brick_move nil brick genbrick 172");
      },
      brickPause: function brickPause() {
        this.unscheduleAllCallbacks();
      },
      gameOver: function gameOver() {
        clearInterval(this.genTimer);
        var brick = new Array();
        brick = this.node.children;
        for (var i = 0; i < 120; i++) void 0 !== brick[i] && brick[i].destroy();
      }
    });
    cc._RF.pop();
  }, {} ],
  moveBall: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "db68cLyTehE2r4h71peTalc", "moveBall");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        isBallMove: false,
        ballLife: 2,
        ballSpeed: 0,
        onHit: false,
        bubble: {
          type: cc.Node,
          default: null
        },
        ballLifeSubAudio: {
          default: null,
          type: cc.AudioClip
        }
      },
      init: function init(s) {
        this.ballSpeed = s;
        this.ballLife = 2, this.node.position = cc.v2(0, -310);
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 0);
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.lineMove, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.lineMove, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.ballMove, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);
        this.node.getChildByName("shield").active = true;
        this.node.getChildByName("motionStreak").active = false;
      },
      start: function start() {},
      update: function update(dt) {},
      onBeginContact: function onBeginContact(contact, selfCollider, otherCollider) {
        switch (otherCollider.tag) {
         case 6:
          this.ballLife--;
          if (0 === this.ballLife) {
            this.isBallMove = false;
            this.node.dispatchEvent(new cc.Event.EventCustom("gameOver", true));
          } else if (1 === this.ballLife) {
            this.node.getChildByName("shield").active = false;
            this.node.getChildByName("motionStreak").active = true;
            this.bubbleBrick();
            cc.audioEngine.play(this.ballLifeSubAudio);
          } else if (2 === this.ballLife) {
            this.node.getChildByName("shield1").active = false;
            this.bubbleBrick();
            cc.audioEngine.play(this.ballLifeSubAudio);
          }
          break;

         case 4:
          otherCollider.node.destroy();
          break;

         case 5:
          if (1 === this.ballLife) {
            this.node.getChildByName("shield").active = true;
            this.node.getChildByName("motionStreak").active = false;
            this.ballLife++;
          } else if (2 === this.ballLife) {
            this.node.getChildByName("shield1").active = true;
            this.ballLife++;
          }
        }
      },
      lineMove: function lineMove(t) {
        var shootLine = this.node.getChildByName("shootLine");
        shootLine.active = true;
        var wPos = t.getLocation();
        var nPos = this.node.convertToNodeSpaceAR(wPos);
        var r1 = Math.atan2(nPos.x, nPos.y);
        var angle = r1 / Math.PI * 180;
        nPos.y > 0 && (shootLine.rotation = angle);
        shootLine.opacity = 255;
      },
      ballMove: function ballMove(t) {
        var shootLine = this.node.getChildByName("shootLine");
        shootLine.opacity = 0;
        var wPos = t.getLocation();
        var nPos = this.node.convertToNodeSpaceAR(wPos);
        var dir = Math.atan2(nPos.y, nPos.x);
        var dirX = this.ballSpeed * Math.cos(dir);
        var dirY = this.ballSpeed * Math.sin(dir);
        if (nPos.y > 0 && !this.isBallMove) {
          shootLine.active = false;
          this.getComponent(cc.RigidBody).linearVelocity = cc.v2(dirX, dirY);
          this.isBallMove = true;
          this.node.dispatchEvent(new cc.Event.EventCustom("ballShot", true));
          this.node.parent.off(cc.Node.EventType.TOUCH_START, this.lineMove, this);
          this.node.parent.off(cc.Node.EventType.TOUCH_MOVE, this.lineMove, this);
          this.node.parent.off(cc.Node.EventType.TOUCH_END, this.ballMove, this);
        }
      },
      touchCancel: function touchCancel() {
        var shootLine = this.node.getChildByName("shootLine");
        shootLine.opacity = 0;
      },
      speedUp: function speedUp(speed) {
        this.ballSpeed = speed;
        var oriSpeed = this.getComponent(cc.RigidBody).linearVelocity;
        var dir = Math.atan2(oriSpeed.y, oriSpeed.x);
        var dirX = this.ballSpeed * Math.cos(dir);
        var dirY = this.ballSpeed * Math.sin(dir);
        this.getComponent(cc.RigidBody).linearVelocity = cc.v2(dirX, dirY);
      },
      superBall: function superBall() {
        var _this = this;
        console.log("transform!");
        this.node.getChildByName("superBall").active = true;
        this.getComponent(cc.PhysicsCircleCollider).tag = 11;
        setTimeout(function() {
          _this.node.getChildByName("superBall").active = false;
          _this.getComponent(cc.PhysicsCircleCollider).tag = 10;
        }, 8e3);
      },
      bubbleBrick: function bubbleBrick() {
        var bub = cc.instantiate(this.bubble);
        bub.parent = this.node;
        bub.x = 0;
        bub.y = 0;
        var rand1 = 1e3 * Math.random() - 500;
        var rand2 = 1e3 * Math.random() - 500;
        var vec = cc.v2(rand1, rand2);
        bub.getComponent(cc.RigidBody).linearVelocity = vec;
        bub.active = true;
        setTimeout(function() {
          bub.destroy();
        }, 1500);
      },
      gameOver: function gameOver() {
        this.node.getChildByName("superBall").active = false;
        this.node.getChildByName("shield1").active = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  movePlat: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3c34er3pZtK77ysWxYg1BEG", "movePlat");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        isBallShot: false,
        allowRotate: true,
        bulletNum: 0,
        bullet: {
          default: null,
          type: cc.Node
        },
        bubble: {
          type: cc.Node,
          default: null
        }
      },
      init: function init() {
        this.isBallShot = false;
        this.node.x = 0;
        this.node.y = -335;
        this.node.rotation = 0;
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
      },
      start: function start() {},
      onTouchMove: function onTouchMove(t) {
        var wPos = t.getLocation();
        var pPos = this.node.parent.convertToNodeSpaceAR(wPos);
        var pos = this.node.convertToNodeSpaceAR(wPos);
        var delta = t.getDelta();
        var moL = cc.winSize.width / 2 - this.node.width / 2;
        this.isBallShot && pos.y < 0 && (this.node.x < moL && delta.x > 0) | (this.node.x > -moL && delta.x < 0) && (this.node.x += delta.x);
        console.log(pos.y);
        this.isBallShot && this.allowRotate && pPos.x > this.node.x && pPos.y > this.node.y + 10 && (this.node.rotation < -.6 && delta.y < 0) | (this.node.rotation > -45 && delta.y > 0) ? this.node.rotation -= delta.y / 5 : this.isBallShot && this.allowRotate && pPos.x < this.node.x && pPos.y > this.node.y + 10 && (this.node.rotation > .6 && delta.y < 0) | (this.node.rotation < 45 && delta.y > 0) && (this.node.rotation += delta.y / 5);
      },
      shootBullet: function shootBullet() {
        this.rotation = 0;
        var bullet = cc.instantiate(this.bullet);
        bullet.parent = this.node;
        bullet.x = -40;
        bullet.y = 20;
        bullet.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 500);
        bullet.active = true;
        var bullet0 = cc.instantiate(this.bullet);
        bullet0.parent = this.node;
        bullet0.x = 40;
        bullet0.y = 20;
        bullet0.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 500);
        bullet0.active = true;
        this.allowRotate = false;
      },
      bubbleBrick: function bubbleBrick() {
        var bub = cc.instantiate(this.bubble);
        bub.parent = this.node;
        bub.x = 0;
        bub.y = 0;
        var rand1 = 1e3 * Math.random() - 500;
        var rand2 = 1e3 * Math.random() - 500;
        var vec = cc.v2(rand1, rand2);
        bub.getComponent(cc.RigidBody).linearVelocity = vec;
        bub.active = true;
        setTimeout(function() {
          bub.destroy();
        }, 1500);
      },
      gameOver: function gameOver() {
        var b = new Array();
        b = this.node.children;
        for (var i = 0; i < 10; i++) void 0 !== b[i] ? b[i].destroy() : console.log("0");
      }
    });
    cc._RF.pop();
  }, {} ],
  play: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "442e8C9XslKdZoDCiU4WZ8b", "play");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        button: cc.Button,
        startAudio: {
          default: null,
          type: cc.AudioClip
        }
      },
      onLoad: function onLoad() {
        this.button.node.on("click", this.play, this);
      },
      start: function start() {},
      play: function play() {
        cc.loader.downloader.loadSubpackage("game", function(err) {
          if (err) return console.error(err);
          console.log("load subpackage successfully.");
        });
        cc.audioEngine.play(this.startAudio);
        cc.director.loadScene("game");
      }
    });
    cc._RF.pop();
  }, {} ],
  resolution: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b7f3aiZJpVCHogaI41kb6d9", "resolution");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.y = (1280 - cc.winSize.height) / 2;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  shieldBrick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "da5f72ZluREvaNnFr0BhOfy", "shieldBrick");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        brick: {
          type: cc.Node,
          default: null
        }
      },
      onLoad: function onLoad() {},
      start: function start() {
        this.node.width = 64;
        this.node.height = 64;
        this.node.parent.width = 37;
        this.node.parent.height = 37;
        this.node.x = 0;
        this.node.y = 0;
        this.brick = this.node.parent;
        this.node.parent = this.node.parent.parent;
      },
      onBeginContact: function onBeginContact(contact, self, other) {
        if (null !== this.brick && true === this.brick.active) {
          this.brick.width = 60;
          this.brick.height = 60;
        }
        this.node.destroy();
      },
      onDestroy: function onDestroy() {},
      update: function update(dt) {
        var _this = this;
        if (this.node.y <= -520) {
          this.getComponent(cc.RigidBody).type = 2;
          setTimeout(function() {
            null !== _this.node && _this.node.destroy();
          }, 1e4);
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  superBallBrick: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e645e97nfhLDbFF6ecJaWBO", "superBallBrick");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        onHit: false
      },
      onLoad: function onLoad() {},
      start: function start() {},
      onCollisionEnter: function onCollisionEnter(other, self) {
        switch (other.tag) {
         case 12:
          other.node.destroy();

         case 10:
          this.onHit = true;
          break;

         case 1:
          console.log(self.tag);
          3 === self.tag ? this.node.dispatchEvent(new cc.Event.EventCustom("superBall", true)) : 7 === self.tag && this.node.dispatchEvent(new cc.Event.EventCustom("bullet", true));
          this.node.destroy();
          break;

         case 6:
          this.node.destroy();
          break;

         default:
          console.log("hit_tag", other.tag, other.name);
        }
      },
      update: function update(dt) {
        var _this = this;
        if (true === this.onHit) {
          this.onHit = false;
          this.getComponent(cc.RigidBody).type = 2;
        }
        if (this.node.y <= -520) {
          this.getComponent(cc.RigidBody).type = 2;
          setTimeout(function() {
            null !== _this.node && _this.node.destroy();
          }, 1e4);
        }
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "bottomBrickArea", "brick", "bulletBrick", "generateBrick", "shieldBrick", "superBallBrick", "clearBullet", "DATA", "gameControl", "coverBg", "bg", "play", "moveBall", "movePlat", "resolution" ]);