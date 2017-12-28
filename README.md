# 程式邏輯

```javascript
// 偵測btnStart按鈕被按下後，開始執行程序式
$("#btnStart").on("click", function() {
  ...
  func.load_config(); // 讀取初始設定值
  func.thread(); // 主程式進入點
});

// 主程式為thread() 位於檔案function.js

var thread = (function () {
  ...
  $('#commonModal').modal('show');
};
  
// 按下玩家方塊時所觸發的事件
$('.choose-id').on('click', function(){
});
  
  
// 在modal上按下繼續鈕
$('.modalContinue').on('click', function(){
});
```
# Entry point
https://slincearm.github.io/WereWolves/index.html
