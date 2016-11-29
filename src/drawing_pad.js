/**
 *  @file       drawing_pad.js
 *  @brief      code regarding drawing_pad.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/29/2016 created.
 *  @date       11/29/2016 last modified.
 *  @version    0.1.0
 *  @copyright  The MIT License.
 *  @details
 *
 *  code regarding drawing_pad.
 */
'use strict';

/**
 * DrawingPad 的初始化程序
 *
 * @name initDrawingPad
 * @function
 * @returns {undefined}
 */
export default (tileset) => {
  let canvas = document.getElementById('afk_drawing_paper');
  let c2d = canvas.getContext('2d');

  // 設定繪圖圖紙的寬高
  canvas.width = 640;
  canvas.height = 320;

  canvas.addEventListener('click', (e) => {
    let x = Math.floor(e.offsetX / 32) * 32;
    let y = Math.floor(e.offsetY / 32) * 32;

    // 將目前選定的 tile 貼到地圖格子裡
    if (tileset.tile.node instanceof HTMLCanvasElement) {
      c2d.drawImage(tileset.tile.node, x, y);
    }
  });

  // 將圖紙埴滿背景色
  c2d.fillStyle = 'mintcream';
  c2d.fillRect(0, 0, canvas.width, canvas.height);

  // 準備一支可以畫 _斷續線_ 的畫筆
  c2d.strokeStyle = 'black';
  // 斷續線由連續 4px，再空白 4px構成
  c2d.setLineDash([4, 4]);

  // 開始記録格線的 paths
  c2d.beginPath();

  // 畫 19 條鉛直斷續線
  for (var c = 1; c < 20; c ++) {
    c2d.moveTo(c * 32, 0);
    c2d.lineTo(c * 32, 320);
  }

  // 畫 9 條水平斷續線
  for (var r = 1; r < 10; r ++) {
    c2d.moveTo( 0, r * 32);
    c2d.lineTo(640, r * 32);
  }

  // 繪出格線
  c2d.stroke();      
} // initDrawingPad

// drawing_pad.js
