/**
 *  @file       index.js
 *  @brief      The entry file of afk.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/11/2016 created.
 *  @date       11/29/2016 last modified.
 *  @version    0.1.0
 *  @copyright  The MIT License.
 *  @details
 *
 *  The entry file of afk.
 */
'use strict';

import initTilesetPane from './tileset_pane.js';
import initDrawingPad from './drawing_pad.js';

/**
 * afk 程式進入點
 *
 * @name init
 * @function
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

  /**
   * 滑鼠游標移動追踪
   *
   * @function
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

  // 初始化 DragingPad
  initDrawingPad(tileset);
});

// index.js
