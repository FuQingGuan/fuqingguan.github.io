/**
 * animate__flipInX                 翻转 X
 * animate__slideInRight            向右滑入
 * animate__lightSpeedInLeft        左光速
 * animate__lightSpeedInRight       右光速
 * animate__backInUp                备份
 * animate__fadeInTopRight          淡入右上角
 * animate__fadeInDownBig           淡入淡出大
 *
 */

// 给首页文章卡片套上动画
var arr = document.getElementsByClassName("recent-post-item");
for(var i = 0;i<arr.length;i++){
    arr[i].classList.add("wow"); //必要项，添加wow.js标记
    arr[i].classList.add("animate__flipInX"); //必要项，添加样式动画
}

// 给侧栏卡片套上动画
var arr = document.getElementsByClassName("card-widget");
for(var i = 0;i<arr.length;i++){
    arr[i].classList.add("wow");
    arr[i].classList.add("animate__slideInRight");
}

// 给时间轴标题套上动画
var arr = document.getElementsByClassName("article-sort-title");
for(var i = 0;i<arr.length;i++){
    arr[i].classList.add("wow");
    arr[i].classList.add("animate__lightSpeedInLeft");
}

// 给时间轴卡片套上动画
var arr = document.getElementsByClassName("article-sort-item");
for(var i = 0;i<arr.length;i++){
    arr[i].classList.add("wow");
    arr[i].classList.add("animate__lightSpeedInRight");
}


// 标签动画
var arr = document.getElementsByClassName("tag-cloud-list is-center");
for (var i = 0; i < arr.length; i++) {
    arr[i].classList.add("wow");
    arr[i].classList.add("animate__backInUp");
}

// 分类动画
var arr = document.getElementsByClassName("category-list");
for (var i = 0; i < arr.length; i++) {
    arr[i].classList.add("wow");
    arr[i].classList.add("animate__fadeInTopRight");
}

// 友链动画
var arr = document.getElementsByClassName("flink-list-item");
for (var i = 0; i < arr.length; i++) {
    arr[i].classList.add("wow");
    arr[i].classList.add("animate__fadeInDownBig");
}


// 初始化函数 动画效果预览: https://animate.style/
var wow = new WOW({
    // 当用户滚动时显示隐藏框的类名称
    boxClass: 'wow',
    // 触发 CSS 动画的类名称（动画库默认为"animate.css"库）
    animateClass: 'animate__animated',
    // 定义浏览器视口底部与隐藏框顶部之间的距离。
    // 当用户滚动并到达此距离时，将显示隐藏的框。
    offset: 0,
    // 在移动设备上打开/关闭wow.js。
    mobile: false,
    // 在页面上检查新的 wow.js元素。
    live: true
})
wow.init();