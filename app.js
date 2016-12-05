enchant(); // initialize
var game = new Core(1000, 562); // game stage
game.preload('images/Player_Sprite.png');
game.preload('images/jimen.png');
game.fps = 20;

game.onload = function(){
    var ground = new Sprite(1000, 85);
    ground.image = game.assets['images/jimen.png'];
    ground.x = 0;
    ground.y = 562 - 85;
    game.rootScene.addChild(ground);
    game.keybind(90, 'a');

    var player = new Sprite(64, 64);
    player.image = game.assets['images/Player_Sprite.png'];
    game.rootScene.backgroundColor = 'black';
    game.rootScene.addChild(player);
    player.y = 562 - 85 - 64;
    game.rootScene.addEventListener('enterframe', function(){
        if(game.input.a){
            player.frame = [2];
            if(game.input.right){
                player.scaleX = 1;
                player.x += 5;
            }else if(game.input.left){
                // player.scaleX = - 1;
                player.x -= 5;
            }else if(game.input.up){
                player.y -= 5;
            }else if(game.input.down){
                if(player.y < 562 - 85 - 64){
                    player.y += 5;
                }else{
                    player.y = 562 - 85 - 64;
                }
            }
        }else if(game.input.right){
            player.frame = [0, 0, 0, 1, 1, 1];
            player.scaleX = 1;
            player.x += 5;
        }else if(game.input.left){
            player.frame = [0, 0, 0, 1, 1, 1];
            player.scaleX = - 1;
            player.x -= 5;
        }else{
            player.frame = [0];
            if(player.y < 562 - 85 - 64){
                player.y += 5;
            }else{
                player.y = 562 - 85 - 64;
            }
        }

        // if(game.input.right){
        //     player.frame = [0, 0, 0, 1, 1, 1];
        //     player.scaleX = 1;
        //     player.x += 5;
        // }else if(game.input.left){
        //     player.frame = [0, 0, 0, 1, 1, 1];
        //     player.scaleX = - 1;
        //     player.x -= 5;
        // }else if(game.input.a){
        //     player.frame = [2];
        // }else{
        //     player.frame = [0];
        // }
    });

    // player.tl.moveBy(400, 0, 180)
    //     .scaleTo(-1, 1, 10)
    //     .moveBy(-288, 0, 90)
    //     .scaleTo(1, 1, 10)
    //     .loop();
};

game.start();