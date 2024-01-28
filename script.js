score = 0;
cross = true; //eligible for cross

audio = new Audio('./assets/music.mp3');
audiogo = new Audio('./assets/gameover.mp3');
setTimeout(()=>{
    audio.play();
},1000)

document.onkeydown = function(e){
    console.log("Key pressed: ", e.key);
    if(e.key === "ArrowUp"){
        let dino = document.querySelector(".dino");
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove("animateDino")
        }, 700);
    }

    if(e.key === "ArrowRight"){
        let dino = document.querySelector(".dino");
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dinoX + 112 +"px";
        dino.style.transform = "rotateY(0deg)";
    }
    if(e.key === "ArrowLeft"){
        let dino = document.querySelector(".dino");
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dino.style.left = dinoX - 112 +"px";
        dino.style.transform = "rotateY(180deg)";
    }
}

//checking the collision after every 0.1sec

setInterval(()=>{
    let dino = document.querySelector(".dino");
    let obstacle = document.querySelector(".obstacle");
    let gameOver = document.querySelector(".gameOver");

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));


    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);

    // console.log(offsetX, offsetY);
    if(offsetX < 73 && offsetY < 52) {
        gameOver.style.visibility = 'visible';
        obstacle.classList.remove('animateObstacle');
        audiogo.play();
        setTimeout(()=>{
            audio.pause();
            audiogo.pause();
        },1000)
        gameOver.innerHTML = 'Game Over: Please Reload To Play Again'
        dino.style.bottom = "-150px"
    }
    else if(offsetX < 145 && cross && obstacle.classList.contains("animateObstacle")){
        score +=1;
        updateScore(score);
        cross=false;
        setTimeout(()=>{
            cross = true;
        },1000)

        obsAniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
        console.log("animation: ", obsAniDur)
        //to increase the speed of the obstacle
        setTimeout( ()=> {

            obsAniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
            newDur = obsAniDur - 0.1;
            console.log("new animation duration: ", obsAniDur, newDur);
            if(newDur<1){
                obstacle.style.animationDuration = '1s';
            }
            else{
                obstacle.style.animationDuration = newDur + 's'; 
            }                                             
        }, 500)
    }
    
}, 10)

let scoreContainer = document.querySelector(".scoreContainer");
function updateScore(score) {
    scoreContainer.innerHTML = `Your Score is : ${score}`;
    
}
    