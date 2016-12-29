/**
 *  @file       drawing_pad.js
 *  @brief      code regarding drawing_pad.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/29/2016 created.
 *  @date       12/29/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  code regarding drawing_pad.
 */
'use strict';

import http from './ajax.js';
import TileMap from './tile_map.js';

/**
 * DrawingPad 的初始化程序
 *
 * @function
 * @param {object} tileset 目前使用中的 tileset 物件
 * @param {object} tilemap 目前繪製中的 TileMap 物件
 * @returns {undefined}
 */
export default (tileset, tilemap) => {
  let canvas = document.getElementById('afk_drawing_paper');
  let ctx = canvas.getContext('2d');

  // 取得 html 檔裡的地圖名稱 <input> 元素
  let txt_input = document.getElementById('afk_map_input');
  // 取得 html 檔裡的地圖名稱 <span> 元素
  let txt_title = document.getElementById('afk_map_title');

  let btn_sync = document.getElementById('afk_btn_sync');
  let btn_tiles = document.getElementById('afk_btn_tiles');

  // 取得並初始化伺服器端的地圖檔案列表
  http.get('map_list').then((list) => {
    let ul_maps = document.getElementById('afk_nav_maps');
    let map_list = JSON.parse(list);

    map_list.forEach((map) => {
      let li = document.createElement('li');

      li.textContent = map;

      li.addEventListener('click', (e) => {
        http.get(map).then((data) => {
          tilemap = new TileMap(JSON.parse(data));

          tilemap.repaint();
        });
      });

      ul_maps.appendChild(li);
    });
  });

  // 當使用者在 btn_tiles 上按下滑鼠，開始/關閉地圖檔案列表
  btn_tiles.addEventListener('click', (e) => {
    let ul_maps = document.getElementById('afk_nav_maps');

    if (ul_maps.dataset.openned === 'true') {
      document.getElementById('afk_cache').appendChild(ul_maps);

      ul_maps.dataset.openned = 'false';
    }
    else {
      btn_tiles.appendChild(ul_maps);

      ul_maps.dataset.openned = 'true';
    }
  });

  // 當使用者在 btn_sync 上按下滑鼠，將目前的地圖資料送去伺服存檔
  btn_sync.addEventListener('click', (e) => {
    http.post('save', tilemap);

    console.log(JSON.stringify(tilemap, null, 2));
  });

  // 當使用者在 _地圖名稱_ 上按下滑鼠時，代表要 _編輯_ 地圖名稱
  txt_title.addEventListener('click', (e) => {
    document.getElementById('afk_cache').appendChild(txt_title);
    document.getElementById('afk_map_caption').appendChild(txt_input);

    txt_input.value = tilemap.name;

    txt_input.focus();
  });

  /**
   * 設定地圖檔名稱
   *
   * @name set_map_name
   * @function
   * @returns {undefined}
   */
  let set_map_name = () => {
    document.getElementById('afk_cache').appendChild(txt_input);
    document.getElementById('afk_map_caption').appendChild(txt_title);

    txt_title.textContent = txt_input.value;

    tilemap.name = txt_input.value;
  };

  // 當 <input> 失去 _鍵盤焦點_ (focus) 時觸發；結束地圖名稱編輯
  txt_input.addEventListener('blur', (e) => {
    set_map_name();
  });

  // 當使用者按下 <Enter> 時，觸發；結束地圖名稱編輯
  txt_input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      set_map_name();
    }
  });

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

    let node = tileset.tile.node;

    // 將目前選定的 tile 貼到地圖格子裡
    if (node instanceof HTMLCanvasElement) {
      ctx.drawImage(node, x, y);

      // 設定 tilemap 的 tile 貼圖資訊；
      // 記錄 tileset 的檔案名稱和來源貼圖的 (x, y) 座標
      tilemap.setTile(
        x, y,
        tileset.source, node.dataset.x, node.dataset.y
      );
    } // fi

    console.log(JSON.stringify(tilemap));
  };

  // 設定繪圖圖紙的寬高
  canvas.width = 640;
  canvas.height = 320;

  // 滑鼠 click；在當下位置，_貼_ 上目前選定的地磚
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
  ctx.fillStyle = 'mintcream';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 準備一支可以畫 _斷續線_ 的畫筆
  ctx.strokeStyle = 'black';
  // 斷續線由連續 4px，再空白 4px構成
  ctx.setLineDash([4, 4]);

  // 開始記録格線的 paths
  ctx.beginPath();

  // 畫 19 條鉛直斷續線
  for (var c = 1; c < 20; c ++) {
    ctx.moveTo(c * 32, 0);
    ctx.lineTo(c * 32, 320);
  }

  // 畫 9 條水平斷續線
  for (var r = 1; r < 10; r ++) {
    ctx.moveTo( 0, r * 32);
    ctx.lineTo(640, r * 32);
  }

  // 繪出格線
  ctx.stroke();      
} // initDrawingPad

// drawing_pad.js
