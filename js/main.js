(function () {

  var winWidth = $(window).width();
  if(winWidth<750){
    // console.log('aaa');
    var fs = winWidth/7.5;
    $('html').css('fontSize',`${fs}`)
    $('body').css('height',`${$(window).height()}`)
  }

  function ajax(url,fn) {
    var xmr = new XMLHttpRequest;
    xmr.open('GET',url);
    xmr.send();
    xmr.onreadystatechange = function(){
					if(xmr.readyState==4&& xmr.status ==200){
						fn(xmr)
					}
        }

  }
  // var inputSearch = document.querySelector('.search');

  var inp = document.querySelector('.search');
  inp.onkeydown = function (e) {
    var url ,url2;
    var ct;
    if(e.key == 'Enter' && e.key != ""){
      ct = inp.value;
      url =`https://free-api.heweather.net/s6/weather/now?location=${ct}&key=fb872062b9814c60afee79b8dbe3e095`;
      url2 = `https://free-api.heweather.net/s6/weather/lifestyle?location=${ct}&key=fb872062b9814c60afee79b8dbe3e095`
      // console.log(url);


      ajax(url,function (xhr) {
        var jsonObj;
        var main;
         jsonObj = JSON.parse(xhr.responseText);
         main = jsonObj.HeWeather6[0];
         var imgUrl = `https://cdn.heweather.com/cond_icon/${main.now.cond_code}.png`;
         $('.city').html(`${main.basic.location}`);
         $('.tmp').html(`${main.now.tmp}℃`);
         $('.wind').html(`${main.now.wind_dir}`);
         $('.logo').html(`<img src="${imgUrl}"> <div>${main.now.cond_txt}</div>`);
      });
      ajax(url2,function (xhr) {
        // console.log('aaa');
        var jsonObj2;
        var main2;
        jsonObj2 = JSON.parse(xhr.responseText);
        main2 = jsonObj2.HeWeather6[0];
        var location = main2.basic.location;
        var txt = main2.lifestyle[0].txt;
        // console.log(main2);
        // console.log(location);
        // console.log(txt);
        $('.fun').html(`${txt}`);
      })
    }
  }
})
();
