/* global $ */
'use strict';

const api = (function () {
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/alex/bookmarks';

  const getBookmarks = function(callback) {
    console.log('inside the api.getBookmarks function');
    $.getJSON(`${BASE_URL}`, callback);
  };

  const createBookmark = function(title, url, desc, rating, callback){
    const newBookmark = {title, url, desc, rating};
    const data = JSON.stringify(newBookmark);
    $.ajax({
      url: `${BASE_URL}`,
      method: 'POST',
      contentType: 'application/json',
      data: data,
      success: callback,
      error: function() {
        console.log('Missing either Title or URL');
      }
    });
  };

  const updateBookmark = function(id, updateData, callback){
    const stringifiedData = JSON.stringify(updateData);
    $.ajax({
      url: `${BASE_URL}/id`,
      method: 'PATCH',
      contentType: 'application/json',
      data: stringifiedData,
      success: callback
    });
  };

  const deleteBookmark = function(id, callback){
    $.ajax({
      url: `${BASE_URL}/${id}`,
      type: 'DELETE',
      success: callback
    });
  };

  return {
    getBookmarks,
    createBookmark,
    updateBookmark,
    deleteBookmark
  };
})();