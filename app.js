enchant();

var game = new Core(1000, 562);
game.preload('images/Player_Sprite.png');
game.preload('images/jimen.png');
game.fps = 20;
var GROUND_HEIGHT = 85;

game.onload = function(){
    var ground = new Sprite(1000, 85);
    ground.image = game.assets['images/jimen.png'];
    ground.x = 0;
    ground.y = 562 - 85;
    game.rootScene.addChild(ground);
    game.keybind(80, 'a');
    game.rootScene.backgroundColor = 'black';

    var pad = new APad();
    pad.y = 454;
    game.rootScene.addChild(pad);

    var player2 = new Player(200, 350, pad);

    document.addEventListener('keydown',function (e) {
        player2.getAction(e.key);
    });

    var bar = new Bar(10, 10);
    // bar.image = game.assets['bar.png'];
    game.rootScene.addChild(bar);
    bar.maxvalue = 300;
    bar.value = bar.maxvalue;

};

var Player = Class.create(Sprite, {
    initialize: function(x, y, pad){
        Sprite.call(this, 64, 64);
        this.image = game.assets['images/Player_Sprite.png'];
        this.x = x;
        this.y = y;
        this.pad = pad;
        this.flight = false;
        this.speed = 5;
        game.rootScene.addChild(this);
    },
    onenterframe: function(){
        // console.log(this.pad.vx);
        if(this.flight){
            this.frame = [2];
            this.scaleX = 1;
            if(this.y <= 562 - GROUND_HEIGHT - 64){
                this.x += this.speed * this.pad.vx * 2;
                this.y += this.speed * this.pad.vy * 2;
            }else{
                this.y = 562 - GROUND_HEIGHT - 64;
            }
        }else if(this.pad.vx > 0){
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
        }else{
            this.frame = [0];
            if(this.y < 562 - GROUND_HEIGHT - 64){
                this.y += 5;
            }else{
                this.y = 562 - GROUND_HEIGHT - 64;
            }
        }
    },
    getAction : function (a) {
        if(a == 'm') this.flight = !this.flight;
    }
});

game.start();