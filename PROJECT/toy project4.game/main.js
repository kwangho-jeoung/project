let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,spaceshipImage,bulletImage,enemyImage,gameoverImage;
let gameOver=false // true이면 게임이 끝남, false 이면 게임이 지속
let score=0;

//우주선 좌표
let spaceshipX = canvas.width/2-48
let spaceshipY = canvas.height-96

let bulletList = [] //총알들을 저장하느 리스트
function Bullet(){
    this.x=0
    this.y=0
    this.init=function(){
        this.x = spaceshipX + 36;
        this.y = spaceshipY;
        this.alive = true; //true면 살아있는 총알, false면 죽은 총알
        bulletList.push(this);
    };
    this.update = function(){
        this.y -= 7;
    };

    this.checkHit = function(){
        for(let i=0;i<enemyList.length;i++){
            if(
                this.y <= enemyList[i].y && 
                this.x >= enemyList[i].x && 
                this.x <= enemyList[i].x+40 
                ){
                //총알이 적을 맞추면 적군 우주선 없어짐, 점수 획득
                score++;
                this.alive = false; //죽은 총알
                enemyList.splice(i,1);
            }
            if(
                this.y <= 0
            )
            this.alive = false;
        }
    };
}

function generateRandomValue(min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}

let enemyList=[]
function Enemy(){
    this.x=0;
    this.y=0;
    this.init = function(){
        this.y = 0
        this.x = generateRandomValue(0,canvas.width-48)
        enemyList.push(this);
    };
    this.update=function(){
        this.y += 2; // 적군의 속도 조절

        if(this.y>= canvas.height-48){
            gameOver = true;
            console.log("gameOver");
        }
    };
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src="images/gamebackground2.gif";

    spaceshipImage = new Image();
    spaceshipImage.src="images/icons8-enterprise-ncc-1701-b-96.png";
    
    bulletImage = new Image();
    bulletImage.src="images/icons8-bullet-24.png";

    enemyImage = new Image();
    enemyImage.src="images/icons8-reman-warbird-scimitar-48.png";

    gameoverImage = new Image();
    gameoverImage.src="images/gameover3.png.png";
}
let keysDown={}
function setupKeyboardListener(){
    document.addEventListener("keydown",function(event){
        keysDown[event.keyCode] = true
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode];

        if(event.keyCode == 32){
            createBullet(); //총알생성
        }
    })
}

function createBullet(){
    console.log("총알 생성");
    let b = new Bullet(); //총알 하나 생성
    b.init();
    console.log("새로운 총알 리스트",bulletList);
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },1000);
}

function update(){
    if(39 in keysDown){
        spaceshipX += 5; //우주선 속도
    } //우주선이 오른쪽으로 이동
    if(37 in keysDown){
        spaceshipX -= 5;
    } //우주선이 왼쪽으로 이동

    if(spaceshipX <=-20){
        spaceshipX=-20
    }
    if(spaceshipX >= canvas.width-78){
        spaceshipX=canvas.width-78;
    }
    //우주선의 좌표값이 무한대로 업데이트가 되는게 아닌! 캔버스 안에서만 이동

    //총알의 y좌표 업데이트 하는 함수 호출
    for(let i=0;i<bulletList.length;i++){
        if(bulletList[i].alive){
        bulletList[i].update();
        bulletList[i].checkHit();
      }
    }

      //enemy의 y좌표값이 7씩 계속 증가하는 함수 호출
      for(let i=0;i<enemyList.length;i++){
        enemyList[i].update();
      }
}


function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceshipImage,spaceshipX, spaceshipY);
    ctx.fillText(`Score:${score}`, 20, 20)
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    for(let i=0;i<bulletList.length;i++){
        if(bulletList[i].alive) {
        ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y);
        }
    }

    for(let i=0;i<enemyList.length;i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y);
    }
}

function main(){
    if(!gameOver){

    update(); //좌표값을 업데이트하고
    render(); //그려주고
    requestAnimationFrame(main)
    }else{
        ctx.drawImage(gameoverImage,10,100,380,380);
    }
}

loadImage();
setupKeyboardListener();
createEnemy();
main();

//방향키를 누르면

//총알만들기
//1. 스페이스바를 누르면 총알 발사
//2. 총알이 발사 = 총알의 y값이-- , 총알의 x값은? 스페이스를 누른 순간의 우주선의 x좌표
//3. 발사된 총알들은 총알 배열에 저장을 한다.
//4. 총알들은 x,y좌표값이 있어야 한다.
//5. 총알 ㅇ배열을 가지고 render 그려준다.
