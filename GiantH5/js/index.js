
// 新闻ajax
$.ajax({
    type: "post",
    url: "http://cms.zjjcjc888.com/api/index/news_list",
    async: false, //解决ajax之后事件失效
    success: function(res) {
        let mainhtml = ""
        let mainhtml1 = ""
        let dongtaihtml = ""
        let {data} = res.data
        for (let i in data) {
            let id = data[i].id;
            let litpic = data[i].litpic;
            let r_title = data[i].r_title;
            let title = data[i].title;
            let create_time = data[i].create_time;
            let update_time = data[i].update_time;
            // 首页新闻
            mainhtml +=

                `  <ul data-id="${id}">
                        <li style="text-align: center;
                        line-height: 150px;"><img src="${litpic}" alt=""></li>
                        <li style="    margin-top: 22px;">
                            <p class="name">${title}</p>
                            <p class="biaoti">${r_title}</p>
                            <p class="time">${create_time}</p>
                        </li>
                    </ul>  	
        	   `

        }

        for (let i = 0; i < 4; i++) {
            let id = data[i].id;
            let litpic = data[i].litpic;
            let r_title = data[i].r_title;
            let create_time = data[i].create_time;
            let update_time = data[i].update_time;

            //   动态
            dongtaihtml +=
                ` <ul class="dongtai" data-id="${id}">
                        <li><img src="${litpic}" alt=""></li>
                        <li style=" margin-left: 8px;" class=" dg dtactive ">
                            <p>${r_title}</p>
                            <p>${create_time}</p>
                            <p>${update_time}</p>
                        </li>
                    </ul>
        				`
        }
        //分页
        mainhtml1 +=
            ` 
                    <div style="display: flex;">
                    <button id="bt0" class="oaBtn oaBtn1">1</button>
                    <button id="bt1" class="oaBtn">2</button>
                    <button id="bt2" class="oaBtn">3</button>
                    <button id="bt3" class="oaBtn">4</button>
                    <button id="bt4" class="oaBtn">5</button>
                    <button id="bt5" class="oaBtn">...13</button>

        `

        $(".news-item").html(mainhtml)
        $(".dt").html(dongtaihtml)
        $(".fenye").html(mainhtml1)


    }

});
// // 报告查询
function isagree(e) {
    let obj = $('#min').val();
    $.ajax({
        type: "get",
        url: "http://cms.zjjcjc888.com/api/index/detection_list/code/0/page/1",
        success: function(res) {
            let dataty = res.data.data
            let istruehtml = '';
            let isflasehtml = '';
            let newArr = dataty.filter(item => item.code == obj)
            if (newArr.length) {
                // alert("搜索成功，请稍后")
                istruehtml +=
                    `
                    <ul>
                    <li>报告编号: ${newArr[0].company}</li>
                    <li>送检公司: ${newArr[0].res}</li>
                    <li>报告结果:${newArr[0].status}</li>
                    <li style="color:#EE9191;"><img src="./img/fujian.png" alt="" style="width: 20px;"> 
                    <a href="${newArr[0].pdf}" style="color:#EE9191;" target="_blank">点击查看报告</a>
                    </li>
                </ul>	
                        `
                $('#punishformID')[0].reset();
                $('.neirong1').html(istruehtml)
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
                $('#punishformID')[0].reset();
                $('.neirong1').html(isflasehtml)

            }
        },
        error: function(error) {

            easyuiAlert(error);
        }
    });
}

// //留言
function isblack(e) {
    let nam = $('.nam').val();
    let call = $('.call').val();
    let eml = $('.eml').val();
    let description = $('#description').val();
    let fromval = [];
    fromval.push(nam, call, eml, description)
        // console.log(fromval)
    $.ajax({
        type: "post",
        url: "http://cms.zjjcjc888.com/api/index/apply/name/测试/email/123@qq.com/mobile/18588888888/desc/" + fromval,
        success: function(res) {
            alert("留言成功")
            $('#liuyan')[0].reset(); //清除提交之后的input
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


// //轮播 加载完毕后渲染
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

    //         //内容切换
    $(".baogao").click(function() {
        $(".sec").show().siblings().hide();
    })
    $(".nav li").click(function() {
        // $(this).addClass("active").siblings().removeClass("active"); //导航切换
        let index = $(this).index(); //获取自定义属性
        $(".ul>section").eq(index).show().siblings().hide();
    })

    //     //新闻页跳转详情
    $('.news-item ul').click(function() {
        window.location.href = "details.html?id=" + $(this).attr('data-id')
    })
        //     //新闻页跳转详情
        $('.dongtai').click(function() {
            window.location.href = "details.html?id=" + $(this).attr('data-id')
        })
        

    // 触摸tab变色
    $("#myTab li a").click(function() {
        $(this).removeClass('active')
        $(this).addClass("achmg").parent().siblings().children().removeClass('achmg')
    })
}

