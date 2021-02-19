class Rect {
    /**
     * 
     * @param {矩形宽度} width 
     * @param {添加的父级} dom 
     */
    constructor(width, dom) {
        this.width = width;
        this.dom = dom;
    }
    createRect(top, left, className) {
        const div = document.createElement('div');
        div.style.width = this.width + 'px';
        div.style.height = this.width + 'px';
        if ((top == 0 || top) && (left == 0 || left)) {
            div.style.top = top + 'px';
            div.style.left = left + 'px';
        }
        if (className) {
            div.classList.add(className);
        }
        this.dom.appendChild(div);
        div.direction = 'right'; //每个元素都保存着下个兄弟元素移动的方向
        return div;
    }
}
const wrapper = document.getElementsByClassName('wrapper')[0];
const rect = new Rect(20, wrapper);