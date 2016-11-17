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
    let tilesPane = document.getElementById('afk_tileset_pane');
    let desktop = document.getElementById('afk_desktop');

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

    tilesPane.style.top = 120 + 'px';
    tilesPane.style.left = 30 + 'px';
} // init

// afk.js
