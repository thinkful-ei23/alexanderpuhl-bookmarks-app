/* global $ */
'use strict';

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/alex';

  const getBookmarks = function(callback) {
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBookmark = function(title, url, description, rating, callback){
    const newBookmark = {title, url, description, rating};
    const data = JSON.stringify(newBookmark);
    $.ajax({
      url: `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/json',
      data: data,
      success: callback
    });
  };

  return {
    getBookmarks,
    createBookmark
  };
})();