/**
 *  @file       drawing_pad.js
 *  @brief      code regarding drawing_pad.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/29/2016 created.
 *  @date       12/02/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
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

  /**
   *  _貼地磚_ 函式
   *
   * @callback
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  let tiling = (e) => {
    let x = Math.floor(e.offsetX / 32) * 32;
    let y = Math.floor(e.offsetY / 32) * 32;

    // 將目前選定的 tile 貼到地圖格子裡
    if (tileset.tile.node instanceof HTMLCanvasElement) {
      c2d.drawImage(tileset.tile.node, x, y);
    }
  };

  // 設定繪圖圖紙的寬高
  canvas.width = 640;
  canvas.height = 320;

  /**
   * 滑鼠 click；在當下位置，_貼_ 上目前選定的地磚
   *
   * @callback
   * @param 'click' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  canvas.addEventListener('click', tiling)

  /**
   * 滑鼠按鈕在 _畫布_ (canvas) 上按下；開始 _貼地磚_ (tiling)
   *
   * @callback
   * @param 'mousedown' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  canvas.addEventListener('mousedown', (e) => {
    // 加上 drawing_pad 的 'mousemove' 事件處理程序；
    // 開始跟著滑鼠的移動貼地磚
    canvas.addEventListener('mousemove', tiling);
  });

  /**
   * 滑鼠按鈕在 _畫布_ (canvas) 上放開；停止 _貼地磚_ (tiling)
   *
   * @callback
   * @param 'mouseup' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  canvas.addEventListener('mouseup', (e) => {
    // 移除 TilesetPane 的 'mousemove' 事件處理程序；
    // 停止跟著滑鼠的移動貼地磚
    canvas.removeEventListener('mousemove', tiling);
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
