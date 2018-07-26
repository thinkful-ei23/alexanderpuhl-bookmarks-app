'use strict';
/* global $, store */

const bookmarkList = (function(){

  function getBookmarkIdFromElement(bookmark){
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id')
  }

  function generateBookmarkElement(bookmark){
    let bookmarkTitle = `<h2 class="list-title">${bookmark.title}</h2>`;
    let bookmarkURL = `<a href="${bookmark.url}" class="button">Visit Site</a>`;
    let bookmarkDescription = `<p>${bookmark.desc}</p>`;
    let bookmarkRating = `<p>${bookmark.rating}</p>`;

    return `
      <li class="js-bookmark-element" data-item-id="${bookmark.id}">
        <h2 class="list-title">${bookmarkTitle}</h2>
        <div class="ratings-display">
          <p>${bookmarkRating}</p>
        </div>
      </li>
    `;
  }

  function generateBookmarkString(bookmarkList){
    const bookmarks = bookmarks.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  function render(){
    console.log('\'render\' ran');

    let bookmarks = store.bookmarks;
    const bookmarkListBookmarksString = generateBookmarkString(bookmarks);

    //insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListBookmarksString);
  }



  function handleNewBookmarkSubmit(){
    
  }

  function handleDeleteBookmarkClicked(){
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = 
    });
  }

  function handleEditBookmarkSubmit(){

  }



  function bindEventListeners(){
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleEditBookmarkSubmit();

  }

  return {
    render: render,
    bindEventListeners: bindEventListeners
  };
})();