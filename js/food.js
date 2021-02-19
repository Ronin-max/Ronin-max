class Food {
    constructor() {
            this.foodLeft = null; //食物的left
            this.foodTop = null; //食物的top
            this.food = null; //食物dom对象
        }
        //随机生成食物
    _getFood(bodyList, header) {
            const obj = this._getFoodTL(bodyList, header);
            if (this.food) {
                this.food.style.top = obj.top + 'px';
                this.food.style.left = obj.left + 'px';
            } else {
                this.food = rect.createRect(obj.top, obj.left, 'food');
            }
            this.foodTop = obj.top;
            this.foodLeft = obj.left;
        }
        //生成随机位置，且不会跟蛇的位置重复
        /**
         * 
         * @param {身体方块数组} bodyList 
         * @param {蛇头} header 
         */
    _getFoodTL(bodyList, header) {
        let flag = true;
        let top, left;
        let arrT = [];
        let arrL = [];
        //把body和header的top、left都用数组存储起来，方便对比
        for (let i = 0; i < bodyList.length; i++) {
            const element = bodyList[i];
            arrT.push(parseInt(element.style.top));
            arrL.push(parseInt(element.style.left));
        }
        arrT.push(parseInt(header.style.top));
        arrL.push(parseInt(header.style.left));

        while (flag) {
            top = this._getRandom(0, 30) * 20;
            left = this._getRandom(0, 50) * 20;
            if (!arrT.includes(top) && !arrL.includes(left)) { //如果在数组中找不到相等的，就跳出循环
                flag = false;
            }
        }
        return {
            top,
            left
        }
    }

    //随机函数
    _getRandom(min, max) {
        return parseInt(Math.random() * (max - min) + min);
    }
}
const food = new Food();