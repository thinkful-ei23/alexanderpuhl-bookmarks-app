'use strict';
/* global $, bookmarkList, store, api */


$(document).ready(function() {
  console.log('document is ready');
  bookmarkList.bindEventListeners();
  console.log('finished running bindEventListeners');
  bookmarkList.render();
  console.log('finished running render');
  api.getBookmarks((items) => {
    items.forEach((item) => store.addBookmark(bookmark));
    bookmarkList.render();
  });
});


// api.createBookmark('google', 'https://google.com', 'website for finding stuff on the internet', '5', (newItem) => {
//   api.getBookmarks((items) => {
//     console.log(items);
//   });
// });