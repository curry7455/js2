//canvas and context
var c = document.querySelector(`#pong`)
var ctx = c.getContext(`2d`)

//timer to make the game run at 60fps
var timer = setInterval(main, 1000/60)

//global friction variable
var fy = .97;

var scores = document.querySelectorAll(`#score div`);

var player1 = new Player();
player1.pad = new Box();
var p1 = player1.pad;

//p1 setup
p1.w = 20
p1.h = 150
p1.x = 0 + p1.w/2
p1.force = 1; 
p1.dir = -1;

var player2 = new Player();
player2.pad = new Box();
player2.pad.w = 20;
player2.pad.h = 150;
player2.pad.x = c.width - player2.pad.w/2;
player2.pad.color = `cyan`;
player2.pad.force = 1;
var p2 = player2.pad;
var player = [player1,player2]
var pad = [player1.pad, player2.pad]

//ball setup
var ball = new Box();
ball.w = 20;
ball.h = 20;
ball.vx = -2;
ball.vy = -2;;
ball.color = `black`;

function main()
{
    //erases the canvas
    ctx.clearRect(0,0,c.width,c.height)
    
    //p1 accelerates when key is pressed 
    if(keys[`w`])
    {
       p1.vy += -p1.force
    }

    if(keys[`s`])
    {
        p1.vy += p1.force
    }
    if(keys[`ArrowUp`])
    {
        p2.vy += -p2.force
    }
    if(keys[`ArrowDown`]) {
        p2.vy += p2.force;
    }
    //applies friction
    player[i].pad.vy *= fy;
    p2.vy *= fy;
    //player movement
    p1.move();
    p2.move();

    //ball movement
    ball.move();

    //p1 collision
    if(p1.y < 0+p1.h/2)
    {
        p1.y = 0+p1.h/2
    }
    if(p1.y > c.height-p1.h/2)
    {
        p1.y = c.height-p1.h/2
    }
    if(p2.y < 0 + p2.h/2) {
        p2.y = 0 + p2.h/2;
    }
    if(p2.y > c.height - p2.h/2) {
        p2.y = c.height - p2.h/2;
    }

    //ball collision 
    if(ball.x < 0)
    {
        ball.x = c.width/2
        ball.y  =c.height/2
        player[1].score++
    }
    if(ball.x > c.width)
    {
        ball.x = c.width
        ball.vx = -ball.vx
        player[0].score++
    }
    if(ball.y < 0)
    {
        ball.y = 0
        ball.vy = -ball.vy
    }
    if(ball.y > c.height)
    {
        ball.y = c.height
        ball.vy = -ball.vy
       
    }

    //p1 with ball collision
    if(ball.collide(p1))
    {
        ball.x = p1.x + (p1.w/2 + ball.w/2) * p1.dir 
        ;
        ball.vx = -ball.vx;
    }
    if(ball.collide(p2)) 
    {
        ball.x = p2.x + (p2.w/2 + ball.w/2) * p2.dir;
        ball.vx = -ball.vx;
    }

    //draw the objects
    p1.draw();
    p2.draw();
    ball.draw();
    //console.log(`${player[0].score} | ${player[1].score}`)
    for(let i=0; i<player.length; i++)
    {
        player[i].pad.vy *= fy;
        scores[i].innerText=`Player ${i+1}: ${player[i].score}`
    }
}
   