//渲染背景
for (let i = 0; i < 1500; i++) {
    rect.createRect();
}

//游戏开始：输入难度
const difficulty = prompt('请输入 低级、中级、高级');
if (difficulty === '低级') {
    snake.difficulty = 500;
} else if (difficulty === '中级') {
    snake.difficulty = 300;
} else if (difficulty === '高级') {
    snake.difficulty = 100;
} else {
    alert('请输入正确的难度');
    window.location.reload();
}

//生成食物
food._getFood(snake.bodyList, snake.header);

//使蛇头开始移动
snake.timer = setInterval(() => {
    snake.headMove('right');
}, snake.difficulty);

//按键控制
document.onkeydown = function(e) {
    if (e.keyCode === 40) { //bottom
        snake.handleMove('bottom');
    } else if (e.keyCode === 38) { //top
        snake.handleMove('top');
    } else if (e.keyCode === 39) { //right
        snake.handleMove('right');
    } else if (e.keyCode === 37) { //left
        snake.handleMove('left');
    }
}