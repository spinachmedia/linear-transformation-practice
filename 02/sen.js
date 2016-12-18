$(function () {
    var canvas = document.getElementById('canvas');

    var params = {
        width: 600,
        height: 600,
        type: Two.Types.svg
    };

    var two = new Two(params).appendTo(canvas);

    //学習データ
    var datas = [
        [1, 20],
        [1, 40],
        [1, 60]
    ];

    var dataResults = [
        154,
        304,
        454
    ];

    //パラメータ、初期値。（重み）
    var params = [0, 0];



    //学習率
    var alpha = 0.1;

    //学習データ数
    var m = datas.length;

    var drawCanvas = function () {
        console.log("描画開始");
        two.clear();

        //学習データの描画
        datas.forEach(function (data, index, array) {
            two.makeCircle(data[1], dataResults[index], 3);
        });

        //仮説関数の描画
        //仮説関数から、始点と終点を取得
        var y = function (x) {
            var result = 0;
            for (var i = 0; i < params.length; i++) {
                result = result + params[i] * x;
            }
            //            console.log("yyyyy");
            //            console.log(result);
            //            
            return result;
        }
        two.makeLine(0, y(0), 200, y(200));

        //仮説関数の描画
        two.update();
        console.log("描画終了");
    }


    //仮説関数
    //学習データの1行と、パラメータを使用して結果を返す。
    var h_func = function (pp, dd) {
        //        console.log("h_func");
        //        console.log("pp:" + pp + ",dd:" + dd);
        var result = 0;
        for (var i = 0; i < dd.length; i++) {
            //            console.log(pp[i] + ":" + dd[i]);
            result = result + pp[i] * dd[i];
        }
        //        console.log(result);
        return result;
    }

    //コスト関数
    var cost_func = function (p, d) {
        //        console.log("cost_func");
        var result = 0;
        for (var i = 0; i < m; i++) {
            //            console.log(i + "行目の処理");
            var tmp = (h_func(p, d[i]) - dataResults[i]);
            result = result + tmp * tmp;
        }
        //        console.log(result / (2 * m) + "：二乗平均の結果");
        console.log("　　つまり、θの初期値が以下である場合");
        console.log(" 　[" + p + "]");
        console.log("　　コスト関数は" + result / (2 * m) + "である。");
        return (result / (2 * m)).toFixed(6);;
    }

    //勾配効果関数的コスト関数
    var m_cost_func = function (j, p, d) {
        console.log("m_cost_func");
        var result = 0;
        for (var i = 0; i < m; i++) {
            //            console.log(i + "行目の処理");
            //            console.log("p:" + p + ",d[" + i + "]:" + d[i]);
            //            console.log("d[i][j]:" + d[i][j]);
            var tmp = (h_func(p, d[i]) - dataResults[i]) * d[i][j];
            console.log(tmp);
            result = result + tmp;
        }
        //        console.log("勾配降下、微分の結果：");
        //        console.log(result / (2 * m));
        return (result / m).toFixed(6);
    }

    //勾配効果関数
    var m_func = function (p, d) {
        console.log("m_func");
        var tmp = [];
        for (var j = 0; j < params.length; j++) {
            //            console.log(j + "列目の処理");
            console.log(params[j] + "-(" + alpha + "* (" + (1 / m) + ") *" + m_cost_func(j, params, datas));
            tmp[j] = params[j] - (alpha / m * m_cost_func(j, params, datas));
            tmp[j] = tmp[j].toFixed(6);
        }
        params = tmp;
        console.log("勾配降下の結果：");
        console.log(params);
    }




    //メイン処理
    var counter = 0;
    var before_result = 0;
    var nextFlg = true;

    var main = function () {
        console.log(counter + "回目の試行");
        console.log("==================");
        var result = 0;
        if (counter > 50) {
            console.log("規定の試行回数を超過しました。");
            console.log("最適化が完了しました。");
            console.log("勾配降下による最適解は以下です。");
            console.log("params = ");
            console.log(params);
            nextFlg = false;
        }
        //コスト関数を実行し、結果を出力
        //        console.log("コスト関数を実行");
        result = cost_func(params, datas);
        if (result == 0) {
            console.log("最適化が完了しました。");
            console.log("勾配降下による最適解は以下です。");
            console.log("params = ");
            console.log(params);
            nextFlg = false;
        }
        console.log("-------------");
        console.log("勾配降下を実行");
        m_func(params);
        counter++;
        drawCanvas();
        if (nextFlg) {
            setTimeout(main, 100);
        }
    }

    setTimeout(main, 100);

});