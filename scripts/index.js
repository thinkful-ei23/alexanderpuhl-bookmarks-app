'use strict';
/* global $, api */


$(document).ready(function() {

});


api.createBookmark('google', 'https://google.com', 'website for finding stuff on the internet', '5', (newItem) => {
  api.getBookmarks((items) => {
    console.log(items);
  });
});