/**
 *  @file       tileset_pane.js
 *  @brief      the code for TilesetPane.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/29/2016 created.
 *  @date       11/29/2016 last modified.
 *  @version    0.1.0
 *  @copyright  The MIT License.
 *  @details
 *
 *  The code for TilesetPane
 */
'use strict';

/**
 * TilesetPane 的初始化程序
 *
 * @name initTilesetPane
 * @function
 * @returns {undefined}
 */
export default (tileset) => {
  let canvas_tiles = document.getElementById('afk_tileset_page');
  let tilesetPane = document.getElementById('afk_tileset_pane');
  let tilesetPaneHeader = document.getElementById('afk_tileset_pane_header');

  /**
   * TilesetPane 的移動處理程序
   *
   * @returns {undefined}
   */
  let moveTilesetPane = (e) => {
    tilesetPane.style.top =
      parseInt(tilesetPane.style.top) + e.movementY + 'px';

    tilesetPane.style.left =
      parseInt(tilesetPane.style.left) + e.movementX + 'px';
  }

  /**
   * TilesetPane 拖曳 (drag) 開始
   *
   * @callback
   * @param 'mousedown' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  tilesetPaneHeader.addEventListener('mousedown', (e) => {
    // 加上 TilesetPane 的 'mousemove' 事件處理程序；
    // 開始追踪滑鼠的移動
    tilesetPane.addEventListener('mousemove', moveTilesetPane);
  });
      
  /**
   * TilesetPane 拖曳結束 (drop)
   *
   * @function
   * @param 'mouseup' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  tilesetPaneHeader.addEventListener('mouseup', (e) => {
    // 移除 TilesetPane 的 'mousemove' 事件處理程序；
    // 停止追踪滑鼠的移動
    tilesetPane.removeEventListener('mousemove', moveTilesetPane);
  });

  /**
   * TilesetPane 的繪製程序
   *
   * @param tileset : 存放目前 tileset 的相關資訊
   * @returns {undefined}
   */
  let drawTilesetPane = (tileset) => {
    let tilesheet = document.getElementById(tileset.source);
    let pagemark = document.getElementById("afk_tileset_pagemark");

    let line_tiles = Math.floor(tilesheet.width / 34);
    let tile_idx = (tileset.page * tileset.tiles.length);

    for (var idx = 0; idx < tileset.tiles.length; idx ++) {
      let tile = tileset.tiles[idx];
      let c2d = tile.firstChild.getContext("2d");

      c2d.drawImage(
        tilesheet,
        (tile_idx % line_tiles) * 34 + 2,
        Math.floor(tile_idx / line_tiles) * 34 + 2,
        tileset.tile.width, tileset.tile.height,
        0, 0,
        tileset.tile.width, tileset.tile.height
      );

      tile_idx += 1;
    }

    // 更新 tilesetPane 的頁碼標示
    pagemark.textContent = (tileset.page + 1) + '/' + (5 + 1);
  }

  /**
   * TilesetPane 換前一頁 (<) 事件處理程序
   *
   * @function
   * @param 'click' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  document.getElementById('afk_tileset_page_prev').addEventListener(
    'click', (e) => {
    (tileset.page > 0) ? tileset.page -= 1 : 0;

    // 繪製 tilesetPane 的目前頁
    drawTilesetPane(tileset);
  });

  /**
   * TilesetPane 換下一頁 (>) 事件處理程序
   *
   * @function
   * @param 'click' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  document.getElementById('afk_tileset_page_next').addEventListener(
    'click', (e) => {
    (tileset.page < 5) ? tileset.page += 1 : 5;

    // 繪製 tilesetPane 的目前頁
    drawTilesetPane(tileset);
  });

  /**
   * 追踪使用者選擇的 tile；並將 tile 編號顯示在狀態列
   *
   * @function
   * @param 'click' : DOM 事件名
   * @param e : DOM event 物件
   * @returns {undefined}
   */
  canvas_tiles.addEventListener('click', (e) => {
    document.getElementById('afk_tile_id').textContent = e.target.id;
    if (e.target instanceof HTMLCanvasElement) {
      tileset.tile.node = e.target;
    }
  });

  /**
   * Tileset 一頁可以放 _30_ 個 tiles。
   * 每個 tile 由一個 <div> 包一個 <canvas> 構成
   *   <canvas>  用來繪製 tile上的貼圖
   *   <div>   用來 a) 控制 tile的位置；
   *                b) 搭配 css 作出滑鼠移動時，外框的變化
   *
   * 產生出的 tile 節點：
   *
   *   * 程式內部，記錄在 tileset.tiles[] 陣列裡
   *   * HTML裡，視覺呈現上，放在 afk_tileset_page 下
   **/
  for (var i = 0; i < 30; i ++) {
    let tile = null;
    
    // 第一個 tile 節點，設定基本屬性
    if (i === 0) {
      let icon = document.createElement('canvas');

      // 設定 tile 貼圖的大小為 32x32
      icon.width = 32;
      icon.height = 32;

      tile = document.createElement('div');

      // 將 tile 貼圖的 <canvas> 加入成為對應 <div> 的子節點
      tile.appendChild(icon);

      // 設定 <div> 的 css class 屬性，好利用 css 的特效
      tile.className = 'afk_highlight_border';

      // 設定 tile 大小為 32x32
      tile.width = 32;
      tile.height = 32;

      // 設定 tile 的 css 位置屬性以 parent node 為參考點
      tile.style.position = 'absolute';
    }
    // 其餘 tile 節點，全部都是第一個節點的 clone (複製品)
    else {
      tile = tileset.tiles[0].cloneNode(true);
    }

    // 設定 <canvas> 的 id；也就是 tile_id
    tile.firstChild.id = 'tile_' + ('0' + i).slice(-2);
    
    // 設定 tile 的位置
    tile.style.left = ((i % 5) * 40) + 'px';
    tile.style.top = (Math.floor(i / 5) * 40) + 'px';

    // tile 全部記録在 tileset.tiles 裡
    tileset.tiles[i] = tile;

    // 增添到 HTML DOM 裡，好在畫面呈現
    canvas_tiles.appendChild(tile);
  } // od

  // 設定 TilesetPane 的初始位置
  tilesetPane.style.top = '120px';
  tilesetPane.style.left = '30px';

  // 繪製 tilesetPane 的目前頁
  drawTilesetPane(tileset);
} // initTilesetPane

// tileset_pane.js
