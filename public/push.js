/*
* @Author: yankang
* @Date:   2019-10-27 16:34:08
* @Last Modified by:   yankang
* @Last Modified time: 2019-10-29 18:22:57
*/
document.querySelector('#push').addEventListener('click', function () {
  if (Notification.permission == "granted") {
      var notification = new Notification("Hi，小伙：", {
          body: '请开下门，你的外卖送到了',
          icon: './logo192.png'
      });
      var text = document.querySelector('#text');
      notification.onclick = function() {
          text.innerHTML = '骑手李某某已于' + new Date().toTimeString().split(' ')[0] + '把外卖给送达！';
          notification.close();
      };
      setTimeout(function(){
          notification.close();
      },5000);
  }else {
      alert('bye bye')
  }
})