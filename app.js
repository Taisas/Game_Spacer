enchant();

var game = new Core(1000, 562);
game.preload('images/Player_Sprite.png');
game.preload('images/jimen.png');
game.preload('images/bar.png');
game.preload('images/player_effe.png');
game.preload('images/flying_bar.png');
game.preload('images/abtn.png');
game.preload('images/player_bullet.png');
game.fps = 20;
var GROUND_HEIGHT = 140;

game.onload = function(){
    var ground = new Sprite(1000, 140);
    ground.image = game.assets['images/jimen.png'];
    ground.x = 0;
    ground.y = 562 - 140;
    game.rootScene.addChild(ground);
    game.keybind(80, 'a');
    game.rootScene.backgroundColor = 'black';

    var pad = new APad();
    pad.y = 562 - 110;
    pad.x = 20;
    game.rootScene.addChild(pad);

    var barbg = new Sprite(454, 44);
    barbg.image = game.assets['images/flying_bar.png'];
    game.rootScene.addChild(barbg);
    barbg.x = 150;
    barbg.y = 562 - 80;

    var bar = new Bar(194, 562 - 62);
    bar.image = game.assets['images/bar.png'];
    game.rootScene.addChild(bar);
    bar.maxvalue = 400;
    bar.value = bar.maxvalue;

    var pf = new PlayerEffect();
    var player2 = new Player(200, 350, pad, bar, pf);

    var abutton = new AButton(1000 - 240, 562 - 110, player2);
    document.addEventListener('keydown',function (e) {
        player2.getAction(e.key);
        if(e.key == 'b'){
            var b = new Bullet(player2.x + 64*player2.scaleX, player2.y + 34, player2.scaleX, 50);
        }
    });

};

var Bullet = Class.create(Sprite, {
    initialize: function (x, y, direction, speed) {
        Sprite.call(this, 8, 8);
        this.image = game.assets['images/player_bullet.png'];
        this.frame = [0];
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.speed = speed;
        this.addEventListener('enterframe', function (e) {
            if(this.x > 0 || this.x < 1000){
                this.x += this.speed * direction;
            }else{
                this.remove();
            }
        });
        game.rootScene.addChild(this);

    },
    remove : function () {
        game.rootScene.removeChild(this);
        delete this;
    }
});

var AButton = Class.create(Sprite, {
    initialize: function (x, y, target) {
        Sprite.call(this, 100, 100);
        this.image = game.assets['images/abtn.png'];
        game.rootScene.addChild(this);
        this.frame[0];
        this.x = x;
        this.y = y;
        this.target = target;
        this.addEventListener('touchstart', function (e) {
            this.frame = [1];
            target.getAction('m');
        }, false);
        this.addEventListener('touchend', function (e) {
            this.frame = [0];
        }, false);
    }
});

var PlayerEffect = Class.create(Sprite, {
    initialize: function (player) {
        Sprite.call(this, 34, 16);
        this.image = game.assets['images/player_effe.png'];
        this.frame = [0];
        game.rootScene.addChild(this);
    }
});

var Player = Class.create(Sprite, {
    initialize: function(x, y, pad, bar, pf){
        Sprite.call(this, 64, 64);
        this.image = game.assets['images/Player_Sprite.png'];
        this.x = x;
        this.y = y;
        this.pf = pf;
        this.pad = pad;
        this.bar = bar;
        this.damage = 2;
        this.flight = false;
        this.speed = 5;
        game.rootScene.addChild(this);
    },
    onenterframe: function(){
        // console.log(this.bar.value);
        if(this.flight && this.bar.value > 0){
            this.bar.value -= this.damage;
            this.frame = [2];
            this.scaleX = 1;
            if(this.y <= 562 - GROUND_HEIGHT - 64){
                //ここでフライト時の移動範囲を制限する
                this.x += this.speed * this.pad.vx * 2;
                this.y += this.speed * this.pad.vy * 2;
            }else{
                this.y = 562 - GROUND_HEIGHT - 64;
            }
            this.pf.frame = [1,1,2,2];
            this.pf.x = this.x - 14;
            this.pf.y = this.y + 36;
        }else{
            this.flight = false;
            this.pf.frame = [0];
            if(this.y == 562 - GROUND_HEIGHT - 64 ){
                //左右の入力受付
                //フライトバーの回復
                if(this.bar.value < this.bar.maxvalue) this.bar.value += 1;
                if(this.pad.vx > 0){
                    this.frame = [0, 0, 0, 1, 1, 1];
                    this.scaleX = 1;
                    if(this.x <= 1000 - 64 - this.speed){
                        this.x += this.speed;
                    }else{
                        this.x = 1000 - 64;
                    }
                }else if(this.pad.vx < 0){
                    this.frame = [0, 0, 0, 1, 1, 1];
                    this.scaleX = - 1;
                    if(this.x >= this.speed){
                        this.x -= this.speed;
                    }else{
                        this.x = 0;
                    }
                }else {
                    this.frame = [0];
                }
            }else {
                //落下する
                //入力を受け付けない
                //フライトバーが回復しない
                this.frame = [0];
                if(this.y < 562 - GROUND_HEIGHT - 64){
                    this.y += 10;
                }else{
                    this.y = 562 - GROUND_HEIGHT - 64;
                }
            }

        }
    },
    getAction : function (a) {
        if(a == 'm') this.flight = !this.flight;
    },
    getStatus : function () {
        return this.flight;
    }
});

game.start();