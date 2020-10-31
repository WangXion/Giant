
// 实现网站自动跳转电脑PC端与手机端不同页面
let fenbian = document.body.clientWidth;
if (fenbian < 640) {
    window.location.href = "../GiantH5/index.html"
}
//加载完毕后渲染
window.onload = function() {
        //内容切换
        $(".right li").click(function() {
            $(this).addClass("active").siblings().removeClass("active"); //导航切换
        })
    }
    //拿到传过来的唯一值title
let id = window.location.search;
let detailsTitle = id.split(/\D/);
let detailsTitles = detailsTitle[4];
$.ajax({
    type: "post",
    url: "http://cms.zjjcjc888.com/api/index/detail/id/" + detailsTitles,
    dataType: "json",
    success: function(certificateponse) {

        let certificate = certificateponse.data
        if (certificate.pre == null) {
            let mainhtml = ""
            let description = certificate.description;
            let title = certificate.title;
            let r_title = certificate.r_title;
            let pre = certificate.pre;
            let next = certificate.next;
            mainhtml +=
                `
		   <div class="main-item">
		   <div class="name">${title}</div>
		   <p class="time">${r_title }</p>
		   <div class="tex">
			 &nbsp;&nbsp;&nbsp;&nbsp;${description}
		   </div>
		   <div class="other">
		   
		   <div class="left">
		  <div class="update">

		   <p> <a href="" class="xiayit"  style="border:none">${next.title}</a></p>
		  </div>
			 <a href="#"onclick="javascript:history.go(-1)">返回</a>
		   </div>
		 
		   </div>
	
	   </div>
		   
		   `
            $(".main").html(mainhtml)

        } else if (certificate.next == null) {
            let mainhtml = ""
            let description = certificate.description;
            let title = certificate.title;
            let r_title = certificate.r_title;
            let pre = certificate.pre;
            let next = certificate.next;
            mainhtml +=
                `
		   <div class="main-item">
		   <div class="name">${title}</div>
		   <p class="time">${r_title }</p>
		   <div class="tex">
			 &nbsp;&nbsp;&nbsp;&nbsp;${description}
		   </div>
		   <div class="other">
		   
		   <div class="left">
		  <div class="update">
		  <p><a href="" class="shangyit" style="border:none">${pre.title}</a></p>

		  </div>
			 <a href="#"onclick="javascript:history.go(-1)">返回</a>
		   </div>
		 
		   </div>
	
	   </div>
		   
		   `
            $(".main").html(mainhtml)
        } else {
            let mainhtml = ""
            let description = certificate.description;
            let title = certificate.title;
            let r_title = certificate.r_title;
            let pre = certificate.pre;
            let next = certificate.next;
            mainhtml +=
                `
		   <div class="main-item">
		   <div class="name">${title}</div>
		   <p class="time">${r_title }</p>
		   <div class="tex">
			 &nbsp;&nbsp;&nbsp;&nbsp;${description}
		   </div>
		   <div class="other">
		   
		   <div class="left">
		  <div class="update">
		   <p><a href="" class="shangyit" style="border:none">${pre.title}</a></p>
		   <p> <a href="" class="xiayit"  style="border:none">${next.title}</a></p>
		  </div>
			 <a href="#"onclick="javascript:history.go(-1)">返回</a>
		   </div>
		 
		   </div>
	
	   </div>
		   
		   `
            $(".main").html(mainhtml)
        }

    }

});