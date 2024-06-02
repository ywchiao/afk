/**
 *  @file       ajax.js
 *  @brief      The ajax module.
 *  @author     Yiwei Chiao (ywchiao@gmail.com)
 *  @date       12/15/2016 created.
 *  @date       12/16/2016 last modified.
 *  @version    0.1.0
 *  @copyright  MIT, (C) 2016 Yiwei Chiao
 *  @details
 *
 *  The ajax module.
 */

let getXHR = (resolve, reject) => {
  let xhr = new XMLHttpRequest();

  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      resolve(xhr.response);
    } else {
      reject(xhr.statusText);
    }
  };

  xhr.onerror = () => {
    reject(xhr.statusText);
  };

  return xhr;
};

export default {
  post(url, args) {
    let promise = new Promise((resolve, reject) => {
      let xhr = getXHR(resolve, reject);

      xhr.open("post", url);
      // for Firefox;
      xhr.setRequestHeader("Accept", "application/json");
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(JSON.stringify(args));
    });

    return promise;
  },

  get(url, args) {
    let promise = new Promise((resolve, reject) => {
      let xhr = getXHR(resolve, reject);
      let query = [];

      for (var key in args) {
        if (args.hasOwnProperty(key)) {
          let k = encodeURIComponent(key);
          let v = encodeURIComponent(args[key]);

          query.push(`${k}=${v}`);
        }
      }

      url += query.length ? "?" + query.join("&") : "";
      xhr.open("get", url);
      xhr.setRequestHeader("Accept", "application/json");
      xhr.send(null);
    });

    return promise;
  },
};

// ajax.js
