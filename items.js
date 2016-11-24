/**
 *  组件用法
 * 	1.在html里 给想要操作的元素添加必要的
 * 			 class ：items
 * 		可选的class，有四个，分别是不同方向的动画
 * 			 以"items-" 为前缀,后面可以添加 left top bottom right
 * 			 	例<div class="items items-left"></div>
 * 	2.在items的子元素的img标签上写个data-src属性，可以有图片懒加载功能
 * 		例:<img data-src="img/1.jpg" />
 *
 *	3.在页面引入此文件，然后实例化一个对象，调用初始化方法
 * 例子：
 * 		var items=new Items();
 * 		items.init();
 *
 *
 *
 */


;(function(win,doc){
	function Items(){
		//构造函数
	}
	Items.prototype={
		//items对象下面的原型
		init:function(){
			var self=this,
				items=self.getItems();
			this.jiance(items);
			win.onscroll=function(){
				//监听win的滚动事件
				self.jiance(items);
			}
		},
		/**
		 * 获取所有items
		 * @returns {NodeList} 返回一个数组
		 */
		getItems:function(){
			return doc.getElementsByClassName('items');
		},
		/**
		 * 对每个items进行操作
		 * @param items 页面所有的item
		 */
		jiance:function(items){
			var len=items.length;
			var self=this;
			for(var i=0;i<len;i++){
				var item=items[i];
				self.isSee(item);
			}
		},
		/**
		 * 检测是否在可视区域
		 * @param item 每一个item
		 */
		isSee:function(item){
			//获取每个item到页面顶部的距离
			var itemTop=item.offsetTop;
			//获取窗口的高度
			var winH=win.innerHeight;
			//获取滚动条的距离
			var scrolltop=doc.body.scrollTop;
			if(winH+scrolltop>itemTop&&!this.hasActive(item)){
				item.className+=' active'
				this.getImage(item);
			}
		},
		/**
		 * 检测是否有active的class
		 * @param item 每个items
		 * @returns {boolean} 如果有返回true  如果没有返回false
		 */
		hasActive:function(item){
			var clsname=item.className;
			var re=/active/g;
			return re.test(clsname)?true:false;
		},
		/**
		 * 获取图片的真实路径
		 * @param item 每个items
		 */
		getImage:function(item){
			var childens=item.childNodes;
			var len=childens.length;
			var src='';
			var self=this;
			for(var i=0;i<len;i++){
				if(childens[i].nodeName.toLowerCase()==='img'){
					src=childens[i].getAttributeNode('data-src').nodeValue;
					self.toggleImgSrc(childens[i],src);
				}
			}
		},
		/**
		 * 将图片的真实路径转换过来
		 * @param imgNode img节点
		 * @param url	图片真实路径
		 */
		toggleImgSrc:function(imgNode,url){
			imgNode.setAttribute('src',url);
		}


	}

	//将对象借口绑定在Window对象上面
	win.Items=win['Items']=Items;
}(window,document));