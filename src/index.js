/**
 *  @file       index.js
 *  @brief      The entry file of afk.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/11/2016 created.
 *  @date       12/08/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  The entry file of afk.
 */
'use strict';

import initTilesetPane from './tileset_pane.js';
import initDrawingPad from './drawing_pad.js';

// 載入 TileMap 類別
import TileMap from './tile_map.js';

/**
 * afk 程式進入點
 *
 * @callback
 * @param 'load' : DOM 事件名
 * @returns {undefined}
 */
window.addEventListener('load', () => {
  let desktop = document.getElementById('afk_desktop');

  /**
   * Tileset (Tile 貼圖) 的相關資料
   */
  let tileset = {
    page: 0,        // 目前頁碼
    tiles: [],      // 一頁能放的 tiles
    tile: {         // tile 的尺寸; 32x32, 64x64 .. 等
      width: 32,
      height: 32,
      node: null
    },
    source: 'afk_tileset_01',
  };

  // 設定 Tile 地圖的基本描述：長，寬，和名稱
  let map_desc = {
    width: 20,
    height: 10,
    name: 'scene_1'
  };

  // 產生一個新的 TileMap 物件
  let scene_1 = new TileMap(map_desc);

  /**
   * 滑鼠游標移動追踪
   *
   * @callback
   * @param 'mousemove' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  desktop.addEventListener('mousemove', (e) => {
    document.getElementById('afk_cursor_x').textContent = e.clientX;
    document.getElementById('afk_cursor_y').textContent = e.clientY;
  });

  // 初始化 TilesetPane
  initTilesetPane(tileset);

  // 初始化 DrawingPad
  initDrawingPad(tileset, scene_1);
});

// index.js
