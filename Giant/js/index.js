// 实现网站自动跳转电脑PC端与手机端不同页面
// 新闻ajax
$.ajax({
    type: "post",
    url: "http://cms.zjjcjc888.com/api/index/news_list",
    dataType: "json",
    async: false, //解决ajax之后事件失效
    success: function(res) {
        // console.log(res)
        let mainhtml = "";
        let dongtaihtml = "";
        let {data} = res.data;
        for (let i in data) {
            let id = data[i].id;
            let litpic = data[i].litpic;
            let r_title = data[i].r_title;
            let title = data[i].title;
            let create_time = data[i].create_time;
            let update_time = data[i].update_time;
            mainhtml +=
                ` 
					<div class="xinwen" data-title="${id}">
					<div class="xinwen-item" style="margin-top: 52px;">
					<img src="${litpic}" alt="">
					<div class="left">
						<p>${create_time}</p>
						<p>${update_time}</p>
					</div>
					<div class="right">
						<p>${title}</p>
						<p>${r_title}</p>
					</div>
				</div>
			</div> 	
	   `

        }
        for (let i = 0; i < 4; i++) {
            let id = data[i].id;
            let litpic = data[i].litpic;
            let r_title = data[i].r_title;
            let create_time = data[i].create_time;
            let update_time = data[i].update_time;

            //    首页新闻
            dongtaihtml +=
                `
				<div class="dunji" data-title="${id}">
					<img src="${litpic}" alt="">
					<p>${r_title}</p>
					<p>${create_time}</p>
					<p>${update_time}</p>
				</div>
				`
        }
        //分页
        mainhtml +=
            ` 
		<div class="fenye">
		<div style="display: flex;margin-left: 258px;">
			<button id="bt0" class="oaBtn oaBtn1">1</button>
			<button id="bt1" class="oaBtn">2</button>
			<button id="bt2" class="oaBtn">3</button>
			<button id="bt3" class="oaBtn">4</button>
			<button id="bt4" class="oaBtn">5</button>
			<button id="bt5" class="oaBtn">...13</button>
		</div>
	</div>


`

        $(".xuan").html(mainhtml);
        $(".dongtai-item").html(dongtaihtml);
        $(".xuan").html(mainhtml);


    }

});
// 报告查询
function isagree(e) {
    let obj = $('#min').val();
    // console.log(typeof(obj))
    $.ajax({
        type: "get",
        url: "http://cms.zjjcjc888.com/api/index/detection_list/code/0/page/1",
        success: function(res) {
            let dataty = res.data.data;
                // console.log(res)
            let istruehtml = '';
            let isflasehtml = '';
            let newArr = dataty.filter(item => item.code == obj);
            if (newArr.length) {
                // alert("搜索成功，请稍后")
                istruehtml +=
                    `
				<ul>
				<li>报告编号: ${newArr[0].company}</li>
				<li>送检公司: ${newArr[0].res}</li>
				<li>报告结果:${newArr[0].status}</li>
				<li style="color:#EE9191;"><img src="./img/fujian.png" alt="" style="width: 20px;">
                <a href="${newArr[0].pdf}" style="color:#EE9191;" target="_blank"> 点击查看报告</a></li>
			    </ul>		
				`
                $('.neirong1').html(istruehtml);
                $('#punishformID')[0].reset();
            } else {
                // alert("该编号不存在，请核对后输入")	
                isflasehtml +=
                    `
				<ul style="font-size: 25px;
				text-align: center;
				line-height: 140px;
				">
				<li style="color: #FBD2B0;">暂无信息</li>
				</ul>
				`
                $('.neirong1').html(isflasehtml);
                $('#punishformID')[0].reset();

            }
        },
        error: function(error) {

            easyuiAlert(error);
        }
    });
}

//留言
function isblack(e) {
    let nam = $('.nam').val();
    let call = $('.call').val();
    let eml = $('.eml').val();
    let description = $('#description').val();
    let fromval = [];
    fromval.push(nam, call, eml, description);
        // console.log(fromval)
    $.ajax({
        type: "post",
        url: "http://cms.zjjcjc888.com/api/index/apply/name/测试/email/123@qq.com/mobile/18588888888/desc/" + fromval,
        success: function(res) {
            alert("留言成功")
            $('.smart-green')[0].reset(); //清除提交之后的input
            // console.log(res)
            // if (res.length) {

            // alert("留言成功")
            // $('.smart-green')[0].reset();//清除提交之后的input
            // }else{
            // 	alert("留言失败，请输入内容")
            // }

        },
        error: function(error) {

            easyuiAlert(error);
        }
    });
}


//轮播 加载完毕后渲染
window.onload = function() {

    let swiper = new Swiper(".swiper-container", {
        loop: true,
        slidesPerView: "auto",
        // loopedSlides: _this.bannerList.length,
        speed: 300,
        autoplay: {
            disableOnInteraction: false, //手动滑动之后不打断播放
            delay: 2000
        },
        // 如果需要前进后退按钮
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // 如果需要滚动条
        scrollbar: {
            el: '.swiper-scrollbar',
        },
        observer: true, //监听，当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper。
        pagination: {
            el: ".swiper-pagination"
        }
    });

    //主体
    $(".main .main-item li").hover(function() {
        $(this).addClass("active2").siblings().removeClass("active2");
    })
    $(window).ready(function() {
            //添加动画  服务 走进巨诚
            $(".label").bind("click touch", function() {
                //根据a标签的href转换为id选择器，获取id元素所处的位置，并高度减110px（这里根据需要自由设置）
                $('html,body').animate({
                    scrollTop: ($($(this).attr('href')).offset().top - 110)
                }, 1000);
            });

        })
        //内容切换
    $(".right li").click(function() {
            $(this).addClass("active").siblings().removeClass("active"); //导航切换
            let index = $(this).index(); //获取自定义属性
            $("#qiehuan>div").eq(index).show().siblings().hide();
        })
        //触摸在上面边框变色
    $(".dunji").hover(function() {
        $(this).addClass("activeqie").siblings().removeClass("activeqie")
    })
    $(window).ready(function() {
        $('.chu').hover(function() {
            $(this).children().stop().animate({
                top: "-280px"
            }, "300", "linear");

        }, (function() {

            $(this).parent().siblings().children().children().stop().animate({
                top: "180px"
            }, "300", "linear");
            $(this).parent().children().children().stop().animate({
                top: "180px"
            }, "300", "linear");

        }));
    });

    //新闻页跳转详情
    $('.xinwen').click(function() {
        window.location.href = "details.html?id=" + $(this).attr('data-title')
    })
    $('.dunji').click(function() {
        window.location.href = "details.html?id=" + $(this).attr('data-title')
    })


    //触摸在分页变色
    $(".oaBtn").hover(function() {
        $(this).addClass("oaBtn1").siblings().removeClass("oaBtn1")
    });
}



		
	
