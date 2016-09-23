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
		if (pricestr=='0'||pricestr=='￥0.00'||pricestr=='0.00'||pricestr=='') {
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
		delprice = delprice*$(this).prev().prev().find('.gnumber').text();
		nowpric -= delprice;
		//console.log($(this).prevAll('.save-price').html());
		$pricetoal.html('￥'+nowpric+'.00');
		$(this).parent('.goodsDiv').remove();
		if ($('.goodsDiv').length<=0) {
			$pricetoal.html('');
			$('.cart-num').html('').css('opacity','0');
			$('.goto').hide();
			$('.sidebar-goods-text').html('亲！购物车很空！');
		}
	});

	//购物车商品【--】
	$('.sidebar-goods').on('click','.minus',function(){
		var n1 = $(this).next('.gnumber').text()
		var addprice = parseInt($pricetoal.text().slice(1,-1));
		var thisprice =parseInt( $(this).parent().next().text().slice(1,-1));
		if ($(this).next('.gnumber').text()==1) {
			return ;
		}
		n1-= 1;
		addprice-=thisprice;
		$pricetoal.html('￥'+addprice+'.00');
		$(this).next('.gnumber').text(n1);

	});

	//购物车商品【++】
	$('.sidebar-goods').on('click','.add',function(){
		var addprice = parseInt($pricetoal.text().slice(1,-1));
		var thisprice =parseInt( $(this).parent().next().text().slice(1,-1));
		var n1 = $(this).prev('.gnumber').text()
		n1++;
		addprice+=thisprice;
		$pricetoal.html('￥'+addprice+'.00');
		$(this).prev('.gnumber').text(n1);
	});
	//---------------------------------
	//去购物车结算||cookie的使用
	//获取cookie数据
	var $tfoot = $('.goods-table table').find('tfoot');
	var $jiesuanPrice = $('.jiesuan-price').find('strong');
	var str = getCookie("arr");
	// 用于存储所有的商品
	var arr = [];
	if (str != "")
	{
		arr=eval(str);
		
		var $tbody = $('.goods-table table').find('tbody');
		$.each(arr,function(idx,val){
			var $tr = $('<tr/>');
			var $td1 = $('<td/>');
			var $td2 = $('<td/>');
			var $td3 = $('<td/>');
			var $td4 = $('<td/>');
			var $td5 = $('<td/>');
			var $td6 = $('<td/>');
			
			$td1.addClass('tb-first').html('<a href="###">'+'<img src='+val.img+'>'+val.product+'</a>').appendTo($tr);
			$td2.html('--').appendTo($tr);
			$td3.html(val.price).appendTo($tr);
			$td4.addClass('tb-four').html('<button class="tbminus">'+'-'+'</button>'+'<input class="input-num" type="text" value="'+val.gnumber+'"'+'>'+'<button class="tbadd">'+'+'+'</button>').appendTo($tr);
			$td5.addClass('tb-five').html(val.price).appendTo($tr);
			$td6.addClass('tb-last').html('<a href="###">'+'加入我的收藏'+'</a>'+'<button class="btndel">'+'删除'+'</button>').appendTo($tr);

			$tfoot.find('span').html(val.pricetoal);
			$jiesuanPrice.html(val.pricetoal);
			$tr.appendTo($tbody);
		});
		
		
	};

	$('.goto').on('click','a',function(){
		var $allgoodsDiv = $('.goodsDiv');
		$.each($allgoodsDiv,function(idx,val){
			//console.log(val);
			var $_img = $(val).find('a').find('img');
			var $_text = $(val).find('a').eq(1);
			var $_price = $(val).find('.save-price');	
			var $_gnumber = $(val).find('.gnumber');
			var obj = {} ;
			obj.img = $_img.attr('src');
			obj.price = $_price.text();
			obj.product = $_text.html();
			obj.pricetoal = $pricetoal.text();
			obj.gnumber = $_gnumber.text();
			arr.push(obj);
			console.log(JSON.stringify(arr));
			// 将数组的内容设置到 cookie 中呢？
			// cookie 的名字是 arr, 内容是数组中的商品，过期时间是7天以后
			addCookie("arr",JSON.stringify(arr),7);//toSource()数组转为字符串
		});

		location.href = "goodscart.html";
	});
	//--------------------------------
	//购物车结算页的商品删除
	var $table = $('.goods-table table');
	//var $btndel = $('.tb-last').find('button');
	$table.on('click','.btndel',function(){

		var addprice = parseInt($jiesuanPrice.text().slice(1,-1));
		var thisprice =parseInt( $(this).parent().prev().text().slice(1,-1))*$(this).parent().prev().prev().find('.input-num').val();
		addprice-=thisprice ;

		$tfoot.find('span').html('￥'+addprice+'.00');
		$jiesuanPrice.html('￥'+addprice+'.00');

		$(this).parent().parent().remove();

		if ($table.find('tbody').find('tr').length<=0) {
			$tfoot.find('span').html('');
			$jiesuanPrice.html('');
		}
	});
	
	//购物车结算页商品【--】

	$table.on('click','.tbminus',function(){
		var n1 = $(this).next().val();
		var addprice = parseInt($jiesuanPrice.text().slice(1,-1));
		var thisprice =parseInt( $(this).parent().prev().text().slice(1,-1));
		if ($(this).next().val()==1) {
			return ;
		}
		n1-= 1;
		addprice -= thisprice; 
		$tfoot.find('span').html('￥'+addprice+'.00');
		$jiesuanPrice.html('￥'+addprice+'.00');
		$(this).next().val(n1);

	});

	//购物车结算页商品【++】
	$table.on('click','.tbadd',function(){
		var n1 = $(this).prev().val();
		var addprice = parseInt($jiesuanPrice.text().slice(1,-1));
		var thisprice =parseInt( $(this).parent().prev().text().slice(1,-1));
		n1++;
		addprice += thisprice; 
		$tfoot.find('span').html('￥'+addprice+'.00');
		$jiesuanPrice.html('￥'+addprice+'.00');
		$(this).prev().val(n1);
	});
	//----------------------------------------------
	//注册页的表单验证
	//电话号码 
	//  开始   第一个是1  第二个（3,4,5,6,7,8）   中间   结尾
	//   ^         1       [35678]                \d{9}   $
	//密码
	// 开始     任意字符   最少6位  最大16位   
	//            [\w\W]        {6,16} 
	var regtell = /^1[34578]\d{9}$/;
	var regpassword = /^[\w\W]{6,16}$/;
	var regspace = /^[/ ]*$/ ; //不能输入空格
	var $loginTips = $('.login-tips');
	var $waringText = $('.waring-text');
	var arr = [] ;//用于保存当前验证码.
	//获取验证码
	$('.login-box2').on('click','#sendcode',function(){
		arr = [];
		code = parseInt( Math.random()*10000);
		var str = $('#phonenum').val();
		if ( !(regtell.test(str)) ) {
			$loginTips.show(200);
			$waringText.html('请输入正确的手机号！');
		}else {

			alert('您的验证码为：'+ code);
			arr.push(code); //手机号输入正确后，将验证码压入数组
			$loginTips.hide(200);
			$waringText.html('');
		}
	});

	//$('.submit')提交注册
	$('.login-box2').on('click','#submit',function(){
		var str1 = $('#phonenum').val();
		var str2 = $('#password').val();
		var str3 = $('#logincode').val();
		var code = arr[0]; //取出验证码

		if (regspace.test(str1) || regspace.test(str2) || regspace.test(str3) ) {
			$loginTips.show(200);
			$waringText.html('所有选项不能为空或者空格！');
		}else if ( !(regtell.test(str1)) ) {
			$loginTips.show(200);
			$waringText.html('请输入正确的手机号！');
		}else if ( !(regpassword.test(str2)) ){
			$loginTips.show(200);
			$waringText.html('密码长度不够，或已超出范围！');
		}else if (str3 != code) {
			$loginTips.show(200);
			$waringText.html('验证码不正确！');
		}else {
			$loginTips.hide(200);
			$waringText.html('');
			// 调用cookie函数，实现添加 cookie
				addCookie("username", str1, 7);
				addCookie("password", str2, 7);
			alert('注册成功！');
			arr = [];  //注册成功之后清空数组内容
			location.href = "login.html";
		}
		
	});

	//-------------------------------------------------
	//登录表单验证
	var reguserid = /^[0-9a-zA-Z\u4e00-\u9fa5_]{3,16}$/   //("ad723隐藏true");//true
	
	$('#login').on('click',function(){
		console.log(2323);
		var userid = $('#userid').val();
		var password = $('#loginpassword').val(); 
		if (regspace.test(userid) || regspace.test(password)) {
			$loginTips.show(200);
			$waringText.html('所有选项不能为空！');
		}else if ( !(reguserid.test(userid)) ) {
			$loginTips.show(200);
			$waringText.html('用户名不正确！');
		}else if ( !(regpassword.test(password)) ) {
			$loginTips.show(200);
			$waringText.html('密码长度不够或者过长！');
		}else {
			$loginTips.hide(200);
			$waringText.html('');

			if ($('#savePwd')[0].checked)//如果7天免登陆复选框被选中
			{
				// 调用cookie函数，实现添加 cookie
				addCookie("username", userid, 7);
				addCookie("password", password, 7);
			}
			alert('登录成功！');
			location.href = "../index.html";

		}

	});


	//联系与关注--------------------------------------
	
	$('.footer-1').on('mouseenter','.erweima',function(){
		var index = $(this).index();
		$(this).parent().next().find('.erweimaimg').eq(index).stop(true,true).show(200);
	});

	$('.footer-1').on('mouseleave','.erweima',function(){
		$('.erweimaimg').stop(true,true).hide(200);
	});

});