window.onload = function() {
    var wrap = document.getElementById("wrap");
    var images = document.getElementsByTagName("img");
    var length = images.length;
    var deg = 360 / length;

    for (var i = 0; i < length; i++) {
        images[i].style.transform = "rotateY(" + deg * i + "deg) translateZ(240px)";
        images[length - i - 1].style.transition = "1s " + 0.2 * i + "s";
    }

    // 点击坐标
    var clickX, clickY;
    // 移动坐标
    var moveX, moveY;
    var minusX, minusY;
    // 旋转角度
    var rotateX = 0,
        rotateY = -20;
    var timer = null;
    // 鼠标按下事件
    document.onmousedown = function(e) {
        clickX = e.clientX;
        clickY = e.clientY;
        // 鼠标移动
        this.onmousemove = function(e) {
            moveX = e.clientX;
            moveY = e.clientY;
            // 移动距离
            minusX = moveX - clickX;
            minusY = moveY - clickY;
            // 旋转角度，避免旋转太快故* 0.1
            rotateX += minusX * 0.1;
            rotateY -= minusY * 0.1;
            // 中心物体旋转
            wrap.style.transform = "rotateX(" + rotateY + "deg) rotateY(" + rotateX + "deg)"

            clickX = moveX;
            clickY = moveY;
        }

        // 鼠标释放
        this.onmouseup = function() {
            this.onmousemove = null;

            // 旋转惯性
            timer = setInterval(function() {
                minusX *= 0.99;
                minusY *= 0.98;

                rotateX += minusX * 0.2;
                rotateY -= minusY * 0.1;


                wrap.style.transform = 'rotateX(' + rotateY + 'deg) rotateY(' + rotateX + 'deg) ';

                if (Math.abs(minusX) < 0.1 && Math.abs(minusY) < 0.1) {
                    clearInterval(timer);
                }
            }, 10);
        }
    }
}
