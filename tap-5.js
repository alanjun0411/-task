class Tap {
    constructor(def) {
        let select = {
            sjlx: 'mouseover',
            ys: 'active',
            mbys: 'selected',
            sjy: '.tab-item',
            sjmb: '.main',
            cunt: 0,
            time: 1000,
            stop: true,
            //从鼠标移开的地方开始轮播
            out:false


        }
        Object.assign(select, def);
        Object.assign(this, select)
        this.sjy = document.querySelectorAll(select.sjy);
        this.sjmb = document.querySelectorAll(select.sjmb);
        this.addTap();
    }
    //事件注册
    addTap() {
        this.sjy.forEach((e, i) => {
            e.addEventListener(this.sjlx, () => {
                clearInterval(this.timer);
                this.stop = true;
                if(this.out){
                    this.cunt = i;
                }
                this.changeYS(e);
                this.changeNR(i);

            })
            if (this.sjlx == 'mouseover') {
                e.addEventListener('mouseout', () => {
                    this.timer = setInterval(() => {
                        if (!this.stop) this.cunt++;
                        this.cunt %= this.sjy.length;
                        this.changeYS(this.sjy[this.cunt]);
                        this.changeNR(this.cunt)
                        this.stop = false;
                    }, this.time)

                })
            }

        })
    }
    //改变样式
    changeYS(e) {
        this.sjy.forEach(e => {
            e.classList.remove(this.ys);
        })
        e.classList.add(this.ys);
    }
    //改变内容
    changeNR(i) {
        this.sjmb.forEach(e => {
            e.classList.remove(this.mbys);
        })
        this.sjmb[i].classList.add(this.mbys);
    }
}
class autoTap extends Tap {
    constructor(def) {
        super(def);

        this.autoPlay();
    }
    autoPlay() {
        this.timer = setInterval(() => {
            this.cunt++;
            this.cunt %= this.sjy.length;
            this.changeYS(this.sjy[this.cunt]);
            this.changeNR(this.cunt);

        }, this.time)
    }
}

