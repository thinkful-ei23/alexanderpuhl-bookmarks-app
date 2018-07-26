'use strict';
/* global $, bookmarks, store, api */


$(document).ready(function() {
  bookmarks.bindEventListeners();
  bookmarks.render();
  api.getBookmarks((items) => {
    items.forEach((item) => store.addBookmark(bookmark));
    bookmarks.render();
  });
});


api.createBookmark('google', 'https://google.com', 'website for finding stuff on the internet', '5', (newItem) => {
  api.getBookmarks((items) => {
    console.log(items);
  });
});