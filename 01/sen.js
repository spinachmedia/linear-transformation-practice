$(function () {
  var canvas = document.getElementById('canvas');

  var params = {
    width: 600,
    height: 600,
    type: Two.Types.svg
  };

  var two = new Two(params).appendTo(canvas);

  var drawCanvas = function () {
    //基準になる線を描画
    var tate = two.makeLine(300, 0, 300, 600);
    tate.stroke = "#ffa5a5"

    var yoko = two.makeLine(0, 300, 600, 300);
    yoko.stroke = "#ffa5a5"

    two.update();
  }

  var getXY = function (x, y) {
    var resultX = x + 300;
    var resultY = -y + 300;
    return {
      x: resultX,
      y: resultY
    };
  }
  var circles = [];
  var init = function () {

    var point = getXY(50, 50);
    circles = [];


    var circle1 = two.makeCircle(point.x, point.y, 2);
    var circle2 = two.makeCircle(point.x + 10, point.y, 2);
    var circle3 = two.makeCircle(point.x + 20, point.y, 2);

    var circle4 = two.makeCircle(point.x, point.y + 10, 2);
    var circle5 = two.makeCircle(point.x + 10, point.y + 10, 2);
    var circle6 = two.makeCircle(point.x + 20, point.y + 10, 2);

    var circle7 = two.makeCircle(point.x, point.y + 20, 2);
    var circle8 = two.makeCircle(point.x + 10, point.y + 20, 2);
    var circle9 = two.makeCircle(point.x + 20, point.y + 20, 2);


    circles.push({
      x: 50,
      y: 50
    });
    circles.push({
      x: 60,
      y: 50
    });
    circles.push({
      x: 70,
      y: 50
    });

    circles.push({
      x: 50,
      y: 60
    });
    circles.push({
      x: 60,
      y: 60
    });
    circles.push({
      x: 70,
      y: 60
    });

    circles.push({
      x: 50,
      y: 70
    });
    circles.push({
      x: 60,
      y: 70
    });
    circles.push({
      x: 70,
      y: 70
    });
    drawCanvas();
  }

  $("#done").click(function () {
    done();
  });

  $("#clear").click(function () {
    two.clear();
    init();
  });
  
  $("#left-top").on("input change",function(e){
    $("#a").html($("#left-top").val());
    done();
  });
  $("#left-bottom").on("input change",function(e){
    $("#c").html($("#left-bottom").val());
    done();
  });
  $("#right-top").on("input change",function(e){
    $("#b").html($("#right-top").val());
    done();
  });
  $("#right-bottom").on("input change",function(e){
    $("#d").html($("#right-bottom").val());
    done();
  });
  
  
  var done = function(){
      two.clear();
      circles.forEach(function (item, index, array) {
        var b = [
          [parseFloat($("#left-top").val()), parseFloat($("#right-top").val())],
          [parseFloat($("#left-bottom").val()), parseFloat($("#right-bottom").val())]
        ];
        var a = [item.x, item.y];
        var result = math.multiply(a, b);
        var point = getXY(result[0], result[1]);
        var test = two.makeCircle(point.x, point.y, 2);
        test.fill = '#000000';
        console.log(point);
        two.update();
      });
      drawCanvas();
  }
  
  init();
});