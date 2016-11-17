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
    let desktop = document.getElementById('afk_desktop');
    let tilesetPane = document.getElementById('afk_tileset_pane');
    let tilesetPaneHeader = document.getElementById('afk_tileset_pane_header');

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
    } // moveTilesetPane

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

    tilesetPane.style.top = anchor.top + 'px';
    tilesetPane.style.left = anchor.left + 'px';
} // init

// afk.js
