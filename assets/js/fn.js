;(function(window) {
  // 禁止默认事件 开始
  function killEvent(targets, action) {
    if (!targets || !action) {
      console.log('killEvent => error');
      return;
    }
    if (targets.length === undefined) targets = [targets];  //  如果目标不是数组, 则扔进数组里
    targets.forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
      });  //  addeventlistener end
    });  //  foreach end
  }  //  kill event end
  window.killEvent = killEvent;
  // 禁止默认事件 结束

  // 瀑布流用
  function getIndex(arr, min) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === min) return i;
    }
  }
  window.getIndex = getIndex;
  // 瀑布流用结束
})(window);
