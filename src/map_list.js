/**
 *  @file       map_list.js
 *  @brief      code regarding map_list.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       12/16/2016 created.
 *  @date       12/16/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  code regarding map_list.
 */
'use strict';

import http from './ajax.js';

/**
 * DrawingPad 的初始化程序
 *
 * @function
 * @param {object} tileset 目前使用中的 tileset 物件
 * @param {object} tilemap 目前繪製中的 TileMap 物件
 * @returns {undefined}
 */
export default (list) => {
  let list_box = document.createElement('div');
  let ul_list = document.createElement('ul');

  for (var i = 0; i < list.length; i ++) {
    let item = document.createElement('li');

    item.textContent = list[i];

    ul_list.appendChild(item);
  }

  list_box.appendChild(ul_list);

  document.getElementById('afk_btn_tiles').appendChild(list_box);
}

// map_list.js
