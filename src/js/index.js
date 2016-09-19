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
	//导航下拉菜单
	var $navlist = $('.navlist');
	$navlist.on('mouseenter',function(){
		$(this).find('.navhide').fadeIn();
	});
	$navlist.on('mouseleave',function(){
		$(this).find('.navhide').fadeOut();
	});

});
