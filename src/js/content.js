$(function(){
	//console.log(11111111);
	//ajax数据请求，懒加载-----------------------------------
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

	//非首页商品分类显示
	$('.sort').on('click',function(){
		if ($('.fenlei').is(':visible')) {
			$('.fenlei').hide(350);
		}else{
			$('.fenlei').show(350);
		}
		
	});
	$('.close-productlist').on('click',function(){
		$('.fenlei').hide(350);
	});


	//详情页------------------------------------
	//详情页的大图与小图切换
	$('.smallpic').on('click','li',function(){
		$('.pic').find('img').attr('src',$(this).find('img').attr('src'));
	});

	//变焦弹窗
	var n = 0;
	var $allimg = $('.allsmallpic').find('img');
	var $picnum = $('.pic-num').find('span');

	$('.openpic').on('click',function(event){
		event.stopPropagation();
		$picnum.eq(1).html($allimg.length);
		$('.overlay').css('height',$(document).height());
		$('.imgauto').css({
			top:$(window).height()/2,
		});
		$('.imgauto').find('img').attr('src',$('.pic').find('img').attr('src'));
		$('.overlay').show(400);
	});

	
	$('.close-pic').on('click',function(){
		$('.overlay').hide(400);
	});
	$(document).on('click',function(){
		$('.overlay').hide(400);
		
	});

	//上一张图片
	
	$('.prev').on('click',function(event){
		event.stopPropagation();

		if (n<=0) {
			n=$allimg.length;
			$picnum.eq(0).html(n+'/');
			$('.imgauto').find('img').attr('src',$allimg.eq(n).attr('src'));
		}
		--n;
		$('.imgauto').find('img').attr('src',$allimg.eq(n).attr('src'));
		$picnum.eq(0).html(n+1+'/');
		
		console.log(n);
	});
	//下一张图片
	$('.next').on('click',function(event){
		event.stopPropagation();
		++n;
		$picnum.eq(0).html(n+'/');
		
		$('.imgauto').find('img').attr('src',$allimg.eq(n).attr('src'));
		
		if (n>=$allimg.length) {
			n=0;
			$('.imgauto').find('img').attr('src',$allimg.eq(n).attr('src'));
		}
		console.log('下一张'+n);
	});


	//详情页的tab选项切换
	var $tab = $('.tab');
	var $tablist = $('.tablist');
	$('.tab-list').on('click','li',function(){
		var index = $(this).index();
		console.log(index);
		$tab.removeClass('active');
		$(this).find('span').addClass('active');
		$tablist.hide();
		$tablist.eq(index).show();

	});
	//-----------------------------------------------

});