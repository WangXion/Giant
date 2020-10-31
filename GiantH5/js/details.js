// 实现网站自动跳转电脑PC端与手机端不同页面
let fenbian = document.body.clientWidth
if (fenbian > 640) {
    window.location.href = "../Giant/index.html"
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
                <p class="name">${title}</p>
                <p class="time">${r_title }</p>
                <p class="title">${description}</p>
                <p class="next">${next.title}</p>
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
                <p class="name">${title}</p>
                <p class="time">${r_title }</p>
                <p class="title">${description}</p>
                <p class="next">${pre.title}</p>
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
                <p class="name">${title}</p>
                <p class="time">${r_title }</p>
                <p class="title">${description}</p>
                <p class="next">${pre.title}</p>
                <p class="next">${next.title}</p>
            </div>
		   
		   `
            $(".main").html(mainhtml)
        }

    }

});