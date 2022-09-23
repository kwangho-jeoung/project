let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=700;
canvas.height=700;
document.body.appendChild(canvas);

let backgroundImage,heroImage,swordImage,enemyImage,gameoverImage;
let gameOver=false // true이면 게임이 끝남, false 이면 게임이 지속
let score=0;

//우주선 좌표
let heroX = canvas.width/2-128
let heroY = canvas.height-256

let swordList = [] //무기들을 저장하는 리스트
function Sword(){
    this.x=0
    this.y=0
    this.init=function(){
        this.x = heroX + 100;
        this.y = heroY;
        this.alive = true; //true면 살아있는, false면 죽은 무기
        swordList.push(this);
    };
    this.update = function(){
        this.y -= 5;
    };

    this.checkHit = function(){
        for(let i=0;i<enemyList.length;i++){
            if(
                this.y <= enemyList[i].y && 
                this.x >= enemyList[i].x && 
                this.x <= enemyList[i].x+96
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
        this.x = generateRandomValue(30,canvas.width-150)
        enemyList.push(this);
    };
    this.update=function(){
        this.y += 1.5; // 적군의 속도 조절

        if(this.y>= canvas.height-96){
            gameOver = true;
            console.log("gameOver");
        }
    };
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src="images/다운로드.jpg";

    heroImage = new Image();
    heroImage.src="images/UI_AvatarIcon_Nilou.png";
    
    swordImage = new Image();
    swordImage.src="images/icons8-heart-48.png";

    enemyImage = new Image();
    enemyImage.src="images/icons8-genshin-impact-96.png";

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
            createSword(); //총알생성
        }
    })
}

function createSword(){
    console.log("총알 생성");
    let b = new Sword(); //총알 하나 생성
    b.init();
    console.log("새로운 총알 리스트",swordList);
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init();
    },1000);
}

function update(){
    if(39 in keysDown){
        heroX += 5; //우주선 속도
    } //우주선이 오른쪽으로 이동
    if(37 in keysDown){
        heroX -= 5;
    } //우주선이 왼쪽으로 이동

    if(heroX <=-20){
        heroX=-20
    }
    if(heroX >= canvas.width-240){
        heroX=canvas.width-240;
    }
    //우주선의 좌표값이 무한대로 업데이트가 되는게 아닌! 캔버스 안에서만 이동

    //총알의 y좌표 업데이트 하는 함수 호출
    for(let i=0;i<swordList.length;i++){
        if(swordList[i].alive){
        swordList[i].update();
        swordList[i].checkHit();
      }
    }

      //enemy의 y좌표값이 7씩 계속 증가하는 함수 호출
      for(let i=0;i<enemyList.length;i++){
        enemyList[i].update();
      }
}


function render(){
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(heroImage,heroX, heroY);
    ctx.fillText(`Score:${score}`, 20, 20)
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    for(let i=0;i<swordList.length;i++){
        if(swordList[i].alive) {
        ctx.drawImage(swordImage,swordList[i].x,swordList[i].y);
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
        ctx.drawImage(gameoverImage,60,30,550,550);
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
