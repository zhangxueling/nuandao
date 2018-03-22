/*
	封装轮播图类
*/
class Banner {
	constructor({el, timeout = 3000}) {
		this.el = el;
		this.timeout = timeout;

		// 鼠标移入移出事件
		let Btn = this.el.getElementsByClassName('btn')[0];
		let dots = this.el.getElementsByClassName('dots')[0];
		this.el.onmouseover = () => {
			dots.style.display = 'block';
			Btn.style.display = 'block';
			
			// 清除定时器
			clearInterval(this.timer);
		}
		this.el.onmouseout = () => {
			Btn.style.display = 'none';
			dots.style.display = 'none';
			// 再次自动轮播
			this.autoMove();
		}


		// 复制carousel-list的第一个LI到最后
		let bannerList = this.el.getElementsByClassName('banner-list')[0];
		let firstLi = bannerList.children[0];
		this.liWidth = firstLi.offsetWidth;    // 每张图片的宽度
		
		bannerList.innerHTML += firstLi.outerHTML; // 复制第一张图片
		this.imgLen = bannerList.children.length; // 图片的个数

		// 设置最新的UL宽度
		bannerList.style.width = this.imgLen * this.liWidth + 'px';

		this.bannerList = bannerList;


		// 添加LI的下标
		this.liIndex = 0;
		// 添加按钮的下标
		this.dotIndex = 0;

		// 获取按钮的长度
		this.dots = this.el.getElementsByClassName('dots')[0];
		this.dotLen = this.dots.children.length;

		for(let i = 0; i < this.dotLen; i++) {
			this.dots.children[i].onmouseover = () => {
				this.liIndex = i;
				this.dotIndex = i;

				// 让UL运动
				bufferMove(this.bannerList, {left: - this.liIndex * this.liWidth});
				// 切换按钮
				this.dotMove();
			}
		}

		// 给左侧按钮添加点击事件
		let prev = this.el.getElementsByClassName('prev')[0];

		prev.onclick = () => {
			this.leftMove();
		}

		// 给右侧按钮添加点击事件
		let next = this.el.getElementsByClassName('next')[0];

		next.onclick = () => {
			this.rightMove();
		}

		// 自动轮播
		this.autoMove();
	}

	autoMove() {
		this.timer = setInterval(() => {
			this.rightMove();
		}, this.timeout);
	}

	leftMove() {
		this.liIndex--;
		if(this.liIndex < 0) {
			this.bannerList.style.left = - (this.imgLen - 1) * this.liWidth + 'px';
			this.liIndex = this.imgLen - 2;
		}
		bufferMove(this.bannerList, {left: - this.liIndex * this.liWidth});

		// 按钮切换
		this.dotIndex--;
		this.dotMove();
	}

	rightMove() {
		// 图片运动
		this.liIndex++;

		if(this.liIndex >= this.imgLen) {
			this.bannerList.style.left = 0
			this.liIndex = 1
		}
		bufferMove(this.bannerList, {left: - this.liIndex * this.liWidth});

		// 按钮切换
		this.dotIndex++;
		this.dotMove();
	}
	dotMove() {

		// 左侧方向的判断
		if(this.dotIndex < 0) {
			this.dotIndex = this.dotLen - 1;
		}
		// 右侧方向的判断
		if(this.dotIndex >= this.dotLen) {
			this.dotIndex = 0;
		}

		for(let i = 0; i < this.dotLen; i++) {
			this.dots.children[i].className = '';
		}
		this.dots.children[this.dotIndex].className = 'active';
	}
}