window.onload = function () {
    //DOM
    var prev = document.getElementsByClassName('banner-control-left')[0]
    var next = document.getElementsByClassName('banner-control-right')[0]
    var bannerImageNums = document.getElementsByClassName("banner-image").length
    var bannerWrap = document.getElementsByClassName("banner-wrap")[0]
    var bannerContent = document.getElementsByClassName("banner-content")[0]
    var bannerImages = document.getElementsByClassName("banner-image")
    var bannerSwitchs = document.getElementsByClassName("banner-pagination-switch")
    var browserWidth
    var bannerWidth
    var rightMost
    var leftMost = 0
    var switchOnNum = 1
    //设置大小
    function setWidth(params) {
        browserWidth = document.documentElement.clientWidth
        bannerWidth = bannerImageNums * browserWidth
        rightMost = -bannerWidth + browserWidth

        bannerWrap.style.width = browserWidth + 'px'
        bannerContent.style.width = bannerWidth + 'px'
        bannerContent.style.left = -browserWidth + 'px'
        for (let i = 0; i < bannerImageNums; i++) {
            bannerImages[i].style.width = browserWidth + 'px'
        }
    }
    setWidth();
    window.onresize = setWidth;

    //轮播实现
    bannerContent.addEventListener("transitionend", slideChange);
    bannerContent.style.transition = 'left 1s';
    function slideChange() {
        var nowLeft = parseInt(bannerContent.style.left);
        if (nowLeft == leftMost) {
            bannerContent.style.transition = '';
            bannerContent.style.left = rightMost + browserWidth + 'px';
        }
        else if (nowLeft == rightMost) {
            bannerContent.style.transition = '';
            bannerContent.style.left = leftMost - browserWidth + 'px';
        }
        prev.onclick = function () {
            switchOnNum--;
            if (switchOnNum < 1) {
                switchOnNum = bannerSwitchs.length;
            }
            switchOn()
            slide(browserWidth);
        }
        next.onclick = function () {
            switchOnNum++;
            if (switchOnNum > bannerSwitchs.length) {
                switchOnNum = 1;
            }
            switchOn()
            slide(-browserWidth);
        }
    }

    function slide(offset) {
        var nowLeft = parseInt(bannerContent.style.left);
        next.onclick = prev.onclick = false;

        if (nowLeft == leftMost || rightMost) {
            bannerContent.style.transition = 'left 1s';
        }
        bannerContent.style.left = nowLeft + offset + 'px';
    }
    prev.onclick = function () {
        switchOnNum--;
        if (switchOnNum < 1) {
            switchOnNum = bannerSwitchs.length;
        }
        switchOn()
        slide(browserWidth);
    }
    next.onclick = function () {
        switchOnNum++;
        if (switchOnNum > bannerSwitchs.length) {
            switchOnNum = 1;
        }
        switchOn()
        slide(-browserWidth);
    }
    //自动轮播
    function autoSlide() {
        next.onclick();
        setTimeout(autoSlide,5000)
    }
    setTimeout(autoSlide,5000)

    //switch控制
    function switchOn() {
        for (var i = 0; i < bannerSwitchs.length; i++) {
            bannerSwitchs[i].classList.remove('switch-on');
        }
        bannerSwitchs[switchOnNum - 1].classList.add('switch-on');
    }
    //为switch绑定点击事件
    for (var i = 0; i < bannerSwitchs.length; i++) {
        bannerSwitchs[i].onclick = function () {
            if (this.classList.contains('switch-on')) {
                return;
            }
            var newOnNum = this.getAttribute('index')
            var offset = (newOnNum - switchOnNum) * browserWidth;
            slide(-offset);
            switchOnNum = newOnNum;
            switchOn()
        }
    }
    //controler显示控制
    bannerWrap.onmouseover = function () {
        prev.style.display='inline';
        next.style.display='inline';
    }
    bannerWrap.onmouseout = function () {
        prev.style.display='none';
        next.style.display='none';
    }
}

