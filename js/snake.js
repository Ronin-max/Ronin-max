class Snake {
    constructor() {
            this.header; //蛇头
            this.lastTop = 0; //蛇尾的top
            this.lastLeft = 20; //蛇尾的left
            this.bodyList = []; //存储body
            this.difficulty = 500; //难度
            this.createSnake(); //初始化蛇
            this.timer; //定时器
        }
        //创建蛇
    createSnake() {
            this._createHeader();
            this.createBody();
        }
        //蛇头
    _createHeader() {
            this.header = rect.createRect(0, 20, 'header');
        }
        //身体
    createBody() { //初始化body
            this.bodyList.push(rect.createRect(0, 0, 'body'));
        }
        //添加body
    addBody() {
            let top, left;
            if (this.bodyList[this.bodyList.length - 1].direction === 'right') {
                //如果蛇往right
                top = this.lastTop;
                left = this.lastLeft - 20;
            } else if (this.bodyList[this.bodyList.length - 1].direction === 'left') {
                //如果蛇往left
                top = this.lastTop;
                left = this.lastLeft + 20;
            } else if (this.bodyList[this.bodyList.length - 1].direction === 'bottom') {
                //如果蛇往bottom
                top = this.lastTop - 20;
                left = this.lastLeft;
            } else if (this.bodyList[this.bodyList.length - 1].direction === 'top') {
                top = this.lastTop + 20;
                left = this.lastLeft;
            }
            this.bodyList.push(rect.createRect(top, left, 'body'));
        }
        /**
         * 
         * @param {按键：top bottom left right} move 
         */
    _move(dom, move) {
            if (move === 'top') {
                dom.style.top = dom.offsetTop - 20 + 'px';
            } else if (move === 'left') {
                dom.style.left = dom.offsetLeft - 20 + 'px';
            } else if (move === 'right') {
                dom.style.left = dom.offsetLeft + 20 + 'px';
            } else if (move === 'bottom') {
                dom.style.top = dom.offsetTop + 20 + 'px';
            }
        }
        //通过蛇头 带领着body移动
    headMove(move) {
            this._move(this.header, move); //动蛇头
            this._move(this.bodyList[0], this.header.direction); //body第一块跟蛇头尾巴走
            this.bodyMove(); //身体走蛇头移动前的方向
            this.header.direction = move; //等所有body都走完后，再保存蛇头当前移动的方向

            this.lastLeft = this.bodyList[this.bodyList.length - 1].offsetLeft;
            this.lastTop = this.bodyList[this.bodyList.length - 1].offsetTop;

            //判断是否吃了食物
            this.eat();
            //判断是否撞击自己
            for (let i = 1; i < this.bodyList.length; i++) {
                const element = this.bodyList[i];
                this.isOver(this.header, element);
            }
            //判断是否撞墙
            if (this.header.offsetLeft < 0 || this.header.offsetLeft > (49 * 20) || this.header.offsetTop < 0 || this.header.offsetTop > (29 * 20)) {
                clearInterval(this.timer);
                alert('游戏结束');
                window.location.reload();
            }
        }
        //身体跟随上一个方块移动
    bodyMove() {
            //先动一次，再进行存储
            for (let i = 0; i < this.bodyList.length; i++) { //遍历body，整体动起来
                if (i > 0) { //i=1开始  跟着i=0的尾巴走
                    //第二块
                    this._move(this.bodyList[i], this.bodyList[i - 1].direction);
                }
            }
            //要先等body后面先保存好前一个方块的方向，不然如果前面先保存，那么后面就都一样了
            for (let j = this.bodyList.length - 1; j > 0; j--) {
                this.bodyList[j].direction = this.bodyList[j - 1].direction;
            }
            this.bodyList[0].direction = this.header.direction;
        }
        //判断是否碰撞
    isOver(dom1, dom2) {
            const width1 = parseInt(dom1.style.width);
            const width2 = parseInt(dom2.style.width);
            const height1 = parseInt(dom2.style.height);
            const height2 = parseInt(dom2.style.height);
            const widthSum = (width1 + width2) / 2;
            const heightSum = (height1 + height2) / 2;
            const left = Math.abs(dom2.offsetLeft - dom1.offsetLeft);
            const top = Math.abs(dom2.offsetTop - dom1.offsetTop);
            if (left < widthSum && top < heightSum) {
                clearInterval(this.timer);
                alert('游戏结束');
                window.location.reload();
            }
        }
        //吃食物
    eat() {
        if (this.header.offsetLeft === food.foodLeft && this.header.offsetTop === food.foodTop) {
            this.addBody();
            food._getFood(this.bodyList, this.header);
        }
    }



    //控制移动
    handleMove(move) {
        if (this.header.direction === move) {
            return;
        }
        if (this.header.direction === 'top' && move === 'bottom' || this.header.direction === 'bottom' && move === 'top' || this.header.direction === 'left' && move === 'right' || this.header.direction === 'right' && move === 'left') {
            return;
        }
        if (this.timer) {
            clearInterval(this.timer);
            this.headMove(move);
        }
        this.timer = setInterval(() => {
            //使蛇开始移动
            this.headMove(move);
        }, this.difficulty);
    }
}
const snake = new Snake();