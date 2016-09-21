// jQuery.prototype = jQuery.fn
$(function(){
	//放大镜---------------------------------------
	// 实现放大镜效果
	$('.pic').lxzoom({
		width:500,
		height:400
	});
});
;(function($){
	$.fn.lxzoom = function(opts){
		// 这里的this指向jquery实例（选择器得到的对象）
		var defaults = {
			position:'right',//大图显示的位置
			gap:50,//小图与大图的距离
			width:300,
			height:200,
		}

		this.each(function(){
			// 这里的this为DOM节点
			var $self = $(this);

			// 把传入的参数opts扩展到defaults
			// 如果有同名属性：覆盖
			// 如果defaults中没有相应属性：则添加
			// 返回目标对象本身
			var opt = $.extend({},defaults,opts);
			// $.extend([d],target,obj1,obj2,...,[objN])

			

			var $smallPic = $(this).find('img');
			var $minZoom;

			// 大图容器
			var $bigWrap;

			// 大图
			var $bigPic;

			// 大图与小图的比例
			var ratio;

			// 绑定mousemove事件
			var smallPicPos;

			$self.on('mouseenter',function(){
				// 绑定mousemove事件
				smallPicPos = {x:$smallPic.offset().left,y:$smallPic.offset().top};
				// 初始化
				init($smallPic.attr('src'));
			})
			

			$self.on('mousemove',function(e){
				// 鼠标的位置距离小图左上角的偏移量
				var oLeft = e.pageX - smallPicPos.x;
				var oTop = e.pageY - smallPicPos.y;

				// 半透明方块的左上角位置
				var minPos = {
					top: oTop- $minZoom.outerHeight()/2,
					left:oLeft - $minZoom.outerWidth()/2
				}


				// 判断不让它超出小图的区域（水平+垂直）
				if(minPos.left < 0){
					minPos.left = 0;
				}else if(minPos.left >= $smallPic.outerWidth() - $minZoom.outerWidth()){
					minPos.left = $smallPic.outerWidth() - $minZoom.outerWidth();
				}
				if(minPos.top < 0){
					minPos.top = 0;
				}else if(minPos.top >= $smallPic.outerHeight() - $minZoom.outerHeight()){
					minPos.top = $smallPic.outerHeight() - $minZoom.outerHeight()
				}

				// 定位minizoom位置
				$minZoom.css(minPos);


				// 定位大图
				var bigPos = {left:oLeft*ratio-200,top:oTop*ratio-100};

				// 判断大图到底后不再移动
				if(bigPos.top >= $bigPic.outerHeight()-$bigWrap.outerHeight()){
					bigPos.top = $bigPic.outerHeight()-$bigWrap.outerHeight()
				}
				if(bigPos.left >= $bigPic.outerWidth()-$bigWrap.outerWidth()){
					bigPos.left = $bigPic.outerWidth()-$bigWrap.outerWidth()
				}
				$bigPic.css({
					left:-bigPos.left,
					top:-bigPos.top
				});
			});

			// 鼠标移开
			$self.on('mouseleave',function(){
				remove();
			})

			function init(src){
				// 生成html结构
				$bigPic = $('<img/>').attr('src',src);
				$bigWrap = $('<div/>').addClass('lxbzoom').append($bigPic).appendTo('body');

				if(opt.position == 'right'){
					var left = smallPicPos.x + $self.outerWidth() + opt.gap;
					var top = smallPicPos.y;
					
				}
				$bigWrap.css({
					left:left,
					top:top,
					width:opt.width,
					height:opt.height
				})

				$minZoom = $('<span/>').addClass('minzoom').appendTo($self);

				// $bigPic.load(function(){
					ratio = $bigPic.outerHeight()/$smallPic.outerHeight();
					console.log(ratio);
				// })
			}

			function remove(){
				$bigWrap.remove();
				$minZoom.remove();
			}
		})

		// 为了链式调用
		return this;
	}
})(jQuery);

//$('#box').lxzoom();