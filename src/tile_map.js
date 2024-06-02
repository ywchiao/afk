/**
 *  @file       tile_map.js
 *  @brief      The tile_map structure.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       12/08/2016 created.
 *  @date       12/28/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  The tile_map data structure.
 */
"use strict";

/**
 * TileMap 類別。物件結構如下：
 *
 *   {
 *     name:   地圖名稱,
 *     width:  地圖寬度, 單位是 tile
 *     height: 地圖高度, 單位是 tile
 *     background: 背景圖片或顏色 (目前未使用)
 *     tiles: {
 *       00x00: { // tile 的 'x-座標' x 'y-座標'
 *         src: 貼圖來源的 tile sheet 名稱,
 *         x: 來源貼圖在 tile sheet 的 x 座標
 *         y: 來源貼圖在 tile sheet 的 y 座標
 *       },
 *       00x01: {
 *         ...
 *       },
 *       ...
 *     }
 *   }
 *
 * @returns {undefined}
 */
export default class {
  /**
   * TileMap 建構子
   *
   * @name constructor
   * @function
   * @param {object} map 地圖物件的基本描述：長，寬，和名稱
   * @returns {undefined}
   */
  constructor({ width, height, name, tiles = {} }) {
    this.width = width;
    this.height = height;
    this.name = name;
    this.tiles = tiles;
  }

  /**
   * 在 TileMap 裡設定某個 Tile 的貼圖描述
   *
   * @name setTile
   * @function
   * @param {number} dx 貼圖目標的左上角 x 座標
   * @param {number} dy 貼圖目標的左上角 y 座標
   * @param {string} tileset 來源貼圖的 tileset 名稱
   * @param {number} sx 來源貼圖在 tileset 裡的 x 座標
   * @param {number} sy 來源貼圖在 tileset 裡的 y 座標
   * @returns {undefined}
   */
  setTile(dx, dy, tileset, sx, sy) {
    let tile = {
      src: tileset,
      x: sx,
      y: sy,
    };

    let idx = dx + "x" + dy;

    this.tiles[idx] = tile;
  }

  /**
   * 依據 TileMap.tiles 裡的記錄，重繪 (repaint) 地圖
   *
   * @name repaint
   * @function
   * @returns {undefined}
   */
  repaint() {
    let canvas = document.getElementById("afk_drawing_paper");
    let ctx = canvas.getContext("2d");

    for (var idx in this.tiles) {
      let dest = idx.split("x");
      let tile = this.tiles[idx];
      let tilesheet = document.getElementById(tile.src);

      ctx.drawImage(
        tilesheet,
        tile.x,
        tile.y,
        32,
        32,
        parseInt(dest[0], 10),
        parseInt(dest[1], 10),
        32,
        32,
      );
    }
  }
}

// tile_map.js
