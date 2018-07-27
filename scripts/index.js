'use strict';
/* global $, bookmarkList, store, api */

$(document).ready(function() {
  console.log('document is ready');
  bookmarkList.bindEventListeners();
  console.log('finished running bindEventListeners');
  console.log('Moving onto api.getBookmarks');
  api.getBookmarks((bookmarks) => {
    bookmarks.forEach((bookmark) => bookmark.expanded = false);
    bookmarks.forEach((bookmark) => store.addBookmark(bookmark));
    bookmarkList.render();
  });
});