$(function(){
	
	//首页轮播图--------------------------------------------
	var $bannerUl = $('.banner-list');
	var $Li = $bannerUl.find('li');
	$Li.eq(0).clone().appendTo($bannerUl);
	$Li = $bannerUl.find('li');
	var $Liwidth = $Li.outerWidth();
	var $Libtn = $('.banner-btn').find('li');
	$bannerUlwidth = $Li.length*$Liwidth;
	$bannerUl.css('width',$bannerUlwidth);
	var i = 0 ;
	var t = 3000;
	var timer ;
	//设置初始初始样式
	$Libtn.eq(0).css('background','#ff5073');

    $('.banner-btn').on('click','li',function(){
    	clearInterval(timer);
    	i = $(this).index()-1;
    	bannermove();
    	timer = setInterval(bannermove,t);
    });

    $bannerUl.on('mouseenter',function(){
    	clearInterval(timer);
    });
    $bannerUl.on('mouseleave',function(){
    	timer = setInterval(bannermove,t);
    });

    timer = setInterval(bannermove,t);
	function bannermove(){
		i++ ;
		$Libtn.css('background','#ffffff');
		$Libtn.eq(i).css('background','#ff5073');
		iLeft = -1*i*$Liwidth ;

		$bannerUl.animate({
			left:iLeft,
		},function(){
			if (i>=$Li.length-1) {
				i=0;
				$bannerUl.css('left','0');
				$Libtn.eq(0).css('background','#ff5073');
			}
		});

	}

	//首页菜单-----------------------------------------------
	var $productlist = $('.product-list');

	$productlist.on('mouseenter',function(){
		$(this).css('background','#ffffff');
		$(this).find('.mian-color').css('color','#333');
		$(this).find('ul').show();
	});
	$productlist.on('mouseleave',function(){
		$(this).css('background','transparent');
		$('.product2').css('background','rgba(0,0,0,0.5)');
		$(this).find('.mian-color').css('color','#ffffff');
		$(this).find('ul').hide();
	});
	//导航下拉菜单-------------------------------------------
	var $navlist = $('.navlist');
	$navlist.on('mouseenter',function(){
		$(this).find('.navhide').fadeIn();
	});
	$navlist.on('mouseleave',function(){
		$(this).find('.navhide').fadeOut();
	});

	//购物车弹出效果-----------------------------------------
	$('#cart-panel').on('click',function(){
		$('.sidebar-box').animate({
			right:'41px'
		});
	});
	$('.close-cart').on('click',function(){
		$('.sidebar-box').animate({
			right:'-321px'
		});
	});
	//个人中心弹出效果-------------------------------------
	var $pophover = $('.pophover');
	var $pophover2 = $('.pophover2');
	var $tips = $('.tips');
	var $tips2 = $('.tips2');
	$pophover.on('mouseenter',function(){
		var num = $(this).index();
		$tips.eq(num).show();
		
		$tips.eq(num).animate({
			display:'block',
			opacity:'1',
			left:'-92px',
		});
	});
	$pophover.on('mouseleave',function(){
		$tips.css({
			display:'none',
			opacity:'0',
			left:'-150px',
		});
	});

	//返回顶部和在线客服
	$pophover2.on('mouseenter',function(){
		var num = $(this).index();
		console.log(num);
		$tips2.eq(num).show();
		$tips2.eq(num).animate({
			display:'block',
			opacity:'1',
			left:'-92px',
		});
	});

	$pophover2.on('mouseleave',function(){
		$tips2.css({
			display:'none',
			opacity:'0',
			left:'-150px',
		});
	});

	//返回顶部
	$(window).on('scroll',function(){
		var scrollTop = $(window).scrollTop();
		if (scrollTop>=400) {
			$('.display-none').show(200);
		}else {
			$('.display-none').hide(200);
		}
	});
	$('.display-none').on('click',function(){
		$('html,body').animate({
			scrollTop:0
		});
	});

	//加入购物车




});
