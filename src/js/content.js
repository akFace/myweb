$(function(){
	//console.log(11111111);
	var pageNum = 1;
	// 全局配置
	$.ajaxSetup({
		url:'/ajax/weibo',//API地址（数据请求地址）
		data:{pageNo:pageNum},
		dataType:'json',
		success:function(res){
			//console.log(res);
			$.each(res,function(idx,val){
				var $Li = $('<li/>');
				var $Div1 = $('<div/>');
				var $Div2 = $('<div/>');
				var $Div3 = $('<div/>');
				var $Div4 = $('<div/>');
				var $span = $('<span/>');
				var $a1 = $('<a/>');
				var $h2 = $('<h2/>');
				var $a2 = $('<a/>');
				var $p1 = $('<p/>');
				var $p2 = $('<p/>');
				var $button = $('<button/>');

				$span.addClass('icon-local').appendTo($Div1);
				$('<img/>').attr('src',val.imgurl).appendTo($a1);
				$a1.attr('href','###').appendTo($Div1);
				$Div1.addClass('content-img').appendTo($Li);

				$a2.attr('href','###');
				$h2.html($a2.html('<span>'+val.brand+'<span/>'+val.goodsname)).appendTo($Div2);
				$Div2.addClass('content-title').appendTo($Li);

				$p1.addClass('old-price').html(val.oldprice).appendTo($Div3);
				$p2.addClass('save-price').html(val.saveprice).appendTo($Div3);
				$Div3.addClass('price-box').appendTo($Li);

				$button.addClass('cart').html('加入购物车').appendTo($Div4);
				$Div4.addClass('cart-box').appendTo($Li);

				$Li.addClass('item').appendTo($('.list'));
			});
		}
	});

	$.ajax();

	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();

		// 懒加载：滚动《快到底部》的时候再加载
		if(scrollTop >= $(document).height() - $(window).height() - 300){
			pageNum++;
			if(pageNum>=4){
				pageNum = 1;
			}

			$.ajax({
				data:{pageNo:pageNum}
			});
		}
	});
	// 手动触发滚动事件
	$(window).trigger('scroll');

});