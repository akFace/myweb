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
	//-----------飞（加）入购物车------------------------------------
	//利用时间委托才能查找到ajax请求回来的数据
	var $pricetoal = $('.h4-2').find('span')
	console.log($pricetoal.text());
	var $goodstoal = $('.h4-1').find('span')
	var m = 0 ;//商品数量
	var pricetoal = 0 ;//购物车商品总价
	var oldprice;//元购物车盒子的总价

	$('.list').on('click','button',function(){
		$('.cart-num').css('opacity','1');
		$('.goto').show();
		var $sidecart = $('.ico-siadecart');

		//console.log( $(this).parents('div').prevAll('.content-img').find('img') );
		var $thisImg = $(this).parents('div').prevAll('.content-img').find('img') ;
		var $minimg = $(this).parents('div').prevAll('.content-img').find('a').clone() ;
		var $clonetitle = $(this).parents('div').prevAll('.content-title').find('h2').clone() ;
		var $cloneprice = $(this).parents('div').prevAll('.price-box').find('.save-price').clone() ;
		var $cloneImg = $thisImg.clone();
		var price = $(this).parents('div').prevAll('.price-box').find('.save-price').text() ;
		//console.log(parseInt(price.slice(1,-1)));
	    price = parseInt(price.slice(1,-1));

	    var pricestr = $pricetoal.text()
		if (pricestr=='0'||pricestr=='￥0.00'||pricestr=='0.00') {
			console.log(oldprice);
			oldprice=0;
			pricetoal = price+oldprice;
			$pricetoal.html('￥'+pricetoal+'.00');
		}else {
			oldprice = parseInt(pricestr.slice(1,-1) );
			pricetoal+=price;//总价格
			$pricetoal.html('￥'+pricetoal+'.00');
		}
		
		++m;
		$goodstoal.html(m);
		$('.cart-num').html(m);
		//console.log( $(this).parents('div').prevAll('.content-img').find('img') .width());
		$cloneImg.css({
			position:'absolute',
            width:$thisImg.width(),
            borderRadius:'50%',
            left:$thisImg.offset().left,
            top:$thisImg.offset().top
		}).appendTo('body');

		$cloneImg.animate({
			left:$sidecart.offset().left,
            top:$sidecart.offset().top + $sidecart.outerHeight(),
            width:10,
            opacity:0
		},800,function(){
			$cloneImg.remove();
			var $goodsDiv = $('<div/>');
			var $p3 = $('<p/>');
			var $span1 = $('<span/>');
			var $span2 = $('<span/>');
			var $span3 = $('<span/>');
			var $strong = $('<strong/>');
			$('.sidebar-goods-text').html('');

			$span1.addClass('minus').html('-').appendTo($p3);
			$strong.addClass('gnumber').html('1').appendTo($p3);
			$span2.addClass('add').html('+').appendTo($p3);

			$goodsDiv.addClass('goodsDiv clearfix').appendTo('.sidebar-goods');
			$minimg.appendTo($goodsDiv);
			$clonetitle.appendTo($goodsDiv);
			$p3.appendTo($goodsDiv);
			$cloneprice.appendTo($goodsDiv);
			$span3.addClass('icon-del').appendTo($goodsDiv);

		});

	});

	//侧边购物车删除商品按钮
	$('.sidebar-goods').on('click','.icon-del',function(){
		var nowpric =parseInt( $pricetoal.html().slice(1,-1) );
		--m;
		$goodstoal.html(m);
		$('.cart-num').html(m);
		var delprice = $(this).prevAll('.save-price').html()
		delprice = parseInt(delprice.slice(1,-1));
		nowpric -= delprice;
		//console.log($(this).prevAll('.save-price').html());
		$pricetoal.html('￥'+nowpric+'.00');
		$(this).parent('.goodsDiv').remove();
		if ($('.goodsDiv').length<=0) {
			$('.cart-num').html('').css('opacity','0');
			$('.goto').hide();
			$('.sidebar-goods-text').html('亲！购物车很空！');
		}
	});

	//去结算||cookie的使用

});