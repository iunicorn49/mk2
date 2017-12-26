// 获取后台数据开始
;(function() {
  // banner start
  $.ajax({
    url: '/php/banner.php',
    type: 'post',
    dataType: 'json',
    async: false,
    error: function() {
      console.log('banner,error');
    },
    success: function(data) {
      var bannerContainer = document.querySelector('.banner-img-box');
      var banners = template('template-banner-img', {list: data.result});
      bannerContainer.innerHTML = banners;
      var spotContainer = document.querySelector('.banner-spot');
      var spots = template('template-banner-spot', {list: data.result});
      spotContainer.innerHTML = spots;
    }
  });  //  ajax banner end
  // card start
  $.ajax({
    url: '/php/cards.php',
    type: 'post',
    dataType: 'json',
    async: false,
    error: function() {
      console.log('cards,error');
    },
    success: function(data) {
      console.log(data);
      var cardBox = document.querySelector('.card-box');
      var cards = template('template-card', {list: data.result});
      cardBox.innerHTML = cards;
    }
  });  //  ajax card end
})();
// 获取后台数据结束

// 轮播图
;(function() {
  window.onload = function() {
    // 页面初始化
    var allA = document.querySelectorAll('a');
    killEvent(allA, 'click');  //  禁用事件
    var imgs = document.querySelectorAll('.banner-img-box li a');
    var imgBox = document.querySelector('.banner-img-box');
    imgBox.style.width = (imgs.length + 1) * 100 + '%';  //  根据banner数量来设置整个容器的宽度
    var winWidth = window.innerWidth;  //  屏幕宽度, 用于调整蒙版宽度
    var index = 0;  //  标记
    imgWidth(imgs);  //  设置 a 标签宽度
    window.onresize = function() {
      winWidth = window.innerWidth;
      imgWidth(imgs);  //  设置 a 标签宽度
      allBanner.style.left = - index * winWidth + 'px';
    }

    var btnRight = document.querySelector('.banner-btn-right');
    var btnLeft = document.querySelector('.banner-btn-left');
    var allBanner = document.querySelector('.banner-img-box');
    console.log(imgs);
    btnRight.onclick = function() {
      if (index >= imgs.length - 1) {
        index = 0;
        allBanner.style.left = 0;
      }
      index++;
      bannerChange(index);
      spotChange(index);
    }

    btnLeft.onclick = function() {
      if (index <= 0) {
        index = imgs.length - 1;
        allBanner.style.left = - index * winWidth + 'px';
      }
      index--;
      bannerChange(index);
      spotChange(index);
    }
    // 使 <a> 标签的宽度等于浏览器窗口宽度
    function imgWidth(imgs) {
      for (var i = 0; i < imgs.length; i++) {
        imgs[i].style.width = winWidth + 'px';
      }
    }
    // 轮播图滑动特效
    function bannerChange(index) {
      var target = - index * winWidth;
      clearInterval(allBanner.timer);
      allBanner.timer = setInterval(function () {
        var leader = allBanner.offsetLeft;
        var step = (target - leader)/10;  //  每一步都会越来越小
        step = step > 0 ? Math.ceil(step) : Math.floor(step);  //  判断正负数，包装最小步数为1px
        leader += step;
        allBanner.style.left = leader + 'px';
        if (leader === target) {
          clearInterval(allBanner.timer);
        }
      },10)
    }  //  bannerChange end

    // 圆点
    var spots = document.querySelectorAll('.banner-spot-item');
    spots.forEach(function(item, i) {
      item.addEventListener('click', function() {
        index = i;
        var condition = allBanner.offsetLeft === - ([imgs.length - 1]) * winWidth;
        if (condition) allBanner.style.left = 0;
        bannerChange(index);
        spotChange(index);
      });  //  addEventListener end
    });  //  foreach end
    //  改变圆点
    function spotChange(index) {
      spots.forEach(function(item, i) {
        item.classList.remove('banner-spot-item-active');
      })  //  foreach end
      if (index >= spots.length) index = 0;
      spots[index].classList.add('banner-spot-item-active');
    }  //  spotChange end

    // banner区域焦点特效
    var bannerSection = document.querySelector('.banner');
    var bannerBtns = document.querySelectorAll('.banner-btn');
    var bannerSpot = document.querySelector('.banner-spot');
    bannerSection.onmouseenter = function() {
      bannerSpot.style.opacity = .5;
      bannerBtns.forEach(function(item) {
        item.style.opacity = .5;
      });  //  foreach end
    }
    bannerSection.onmouseleave = function() {
      bannerSpot.style.opacity = .2;
      bannerBtns.forEach(function(item) {
        item.style.opacity = .1;
      });  //  foreach end
    }
  }  //  window.onload end
})();
// 轮播图结束

// 瀑布流开始
;(function(window) {
  window.addEventListener('load', function() {
    waterfall();
    window.addEventListener('resize', function() {
      waterfall();
    })
  })
  function waterfall() {
    var cards = document.querySelectorAll('.card');  //所有卡片
    var cardBox = document.querySelector('.card-box');  //容器
    var space = 15;  //间距
    var wid = cards[0].offsetWidth;  //单个卡片宽度
    var cols = Math.floor(window.innerWidth / wid);  //卡片列数
    cardBox.style.width = cols * wid + (cols - 1) * space + 'px';  //设置容器宽度
    var arr = [];  //存放top定位
    for (var i = 0; i < cards.length; i++) {
      if (i < cols) {
        arr.push(cards[i].offsetHeight + space);
        for (var j = 0; j < cols; j++) {
          cards[j].style.top = space + 'px';
          cards[j].style.left = j * (wid + space) + 'px';
        }  //  for j end
      } else {
        var min = Math.min(...arr);
        var index = getIndex(arr, min);
        cards[i].style.top = (min + space) + 'px';
        cards[i].style.left = index * (wid + space) + 'px';
        arr[index] += cards[i].offsetHeight + space;
        var max = Math.max(...arr);
        cardBox.style.height = max + 'px';
      }  //  if end
    } // for i end
  }
  window.waterfall = waterfall;
})(window);
// 瀑布流结束
