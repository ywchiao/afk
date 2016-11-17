/**
 *  @file       afk.js
 *  @brief      The entry file of afk.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       11/11/2016 created.
 *  @date       11/17/2016 last modified.
 *  @version    0.1.0
 *  @copyright  The MIT License.
 *              Copyright (c) 2016, Yiwei Chiao.
 *              All rights reserved.
 *  @section DESCRIPTION
 *
 *  The entry file of afk.
 */

var init = () => {
    let tilesetPane = document.getElementById('afk_tileset_pane');
    let tilesetPaneHeader = document.getElementById('afk_tileset_pane_header');
    let desktop = document.getElementById('afk_desktop');

    /**
     * 滑鼠事件發生時的座標；初始化為 tilesetPane 的左上角座標
     */
    let anchor = {
        left: 30,
        top: 120
    };

    /**
     * TilesetPane 的移動處理程序
     *
     * @returns {undefined}
     */
    let moveTilesetPane = (e) => {
        tilesetPane.style.top =
            parseInt(tilesetPane.style.top) + e.clientY - anchor.top + 'px';

        tilesetPane.style.left =
            parseInt(tilesetPane.style.left) + e.clientX - anchor.left + 'px';

        anchor.left = e.clientX;
        anchor.top = e.clientY;
    }

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

    /**
     * TilesetPane 拖曳 (drag) 開始
     *
     * @function
     * @param 'mousedown' : DOM 事件名
     * @param e : DOM event 物件
     * @returns {undefined}
     */
    tilesetPaneHeader.addEventListener('mousedown', (e) => {
        anchor.left = e.clientX;
        anchor.top = e.clientY;

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
     * Tileset (Tile 貼圖) 的相關資料
     */
    let tilebook = {
        page: 0,    // 目前頁碼
        tiles: 30,  // 一頁的 tile 個數
        tile: {     // tile 的尺寸; 32x32, 64x64 .. 等
            width: 32,
            height: 32,
        },
        source: 'afk_sprite_sheet',
    };

    /**
     * TilesetPane 的繪製程序
     *
     * @param tilebook : 存放目前 tileset 的相關資訊
     * @returns {undefined}
     */
    let drawTilesetPane = (tilebook) => {
        let canvas_tiles = document.getElementById("afk_tileset_page");
        let c2d = canvas_tiles.getContext("2d");
        let tileset = document.getElementById(tilebook.source);
        let pagemark = document.getElementById("afk_tileset_pagemark");

        canvas_tiles.width = 170;
        canvas_tiles.height = 200;

        let line_tiles = Math.floor(tileset.width / 34);

        for (idx = 0; idx < tilebook.tiles; idx ++) {
            tile_idx = (tilebook.page * tilebook.tiles) + idx;

            width = (tile_idx % line_tiles) * 34;
            height = Math.floor(tile_idx / line_tiles) * 34;

            c2d.drawImage(
                tileset,
                width, height,
                tilebook.tile.width, tilebook.tile.height,
                (idx % 5) * 34, Math.floor(idx / 5) * 34,
                tilebook.tile.width, tilebook.tile.height
            );
        }

        // 更新 tilesetPane 的頁碼標示
        pagemark.textContent = (tilebook.page + 1) + '/' + (5 + 1);
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
        (tilebook.page > 0) ? tilebook.page -= 1 : 0;

        // 繪製 tilesetPane 的目前頁
        drawTilesetPane(tilebook);
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
        (tilebook.page < 5) ? tilebook.page += 1 : 5;

        // 繪製 tilesetPane 的目前頁
        drawTilesetPane(tilebook);
    });

    // 繪製 tilesetPane 的目前頁
    drawTilesetPane(tilebook);

    tilesetPane.style.top = anchor.top + 'px';
    tilesetPane.style.left = anchor.left + 'px';
} // init

// afk.js
