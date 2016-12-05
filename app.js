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
    game.keybind(90, 'a');
    game.rootScene.backgroundColor = 'black';

    var pad = new APad();
    pad.y = 454;
    game.rootScene.addChild(pad);

    var player2 = new Player(500, 200, pad);

};

var Player = Class.create(Sprite, {
    initialize: function(x, y, pad){
        Sprite.call(this, 64, 64);
        this.image = game.assets['images/Player_Sprite.png'];
        this.x = x;
        this.y = y;
        this.pad = pad;
        game.rootScene.addChild(this);
    },
    onenterframe: function(){
        console.log(this.pad.vx);
        if(game.input.a){
            this.frame = [2];
            if(game.input.right){
                this.scaleX = 1;
                this.x += 5;
            }else if(game.input.left){
                this.x -= 5;
            }else if(game.input.up){
                this.y -= 5;
            }else if(game.input.down){
                if(this.y < 562 - GROUND_HEIGHT - 64){
                    this.y += 5;
                }else{
                    this.y = 562 - GROUND_HEIGHT - 64;
                }
            }
        }else if(game.input.right){
            this.frame = [0, 0, 0, 1, 1, 1];
            this.scaleX = 1;
            this.x += 5;
        }else if(game.input.left){
            this.frame = [0, 0, 0, 1, 1, 1];
            this.scaleX = - 1;
            this.x -= 5;
        }else{
            this.frame = [0];
            if(this.y < 562 - GROUND_HEIGHT - 64){
                this.y += 5;
            }else{
                this.y = 562 - GROUND_HEIGHT - 64;
            }
        }
    }
});

game.start();