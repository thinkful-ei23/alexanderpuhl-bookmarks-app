'use strict';
/* global $, store */

const bookmarkList = (function(){



  function generateBookmarkElement(bookmark){
    let bookmarkTitle = `<h2 class="list-title">${bookmark.title}</h2>`;
    let bookmarkURL = `<a href="${bookmark.url}" class="button">Visit Site</a>`;
    let bookmarkDescription = `<p>${bookmark.desc}</p>`;
    let bookmarkRating = `<p>${bookmark.rating}</p>`;

    return `
      <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
        ${bookmarkTitle}
        <div class="ratings-display">
          ${bookmarkRating}
        </div>
        <button class="bookmark-item-delete js-bookmark-delete">Delete Bookmark</button>
      </li>
    `;
  }

  function generateBookmarkString(list){
    const bookmarks = list.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  function render(){
    console.log('\'render\' ran');

    let bookmarks = store.bookmarks;
    // console.log(bookmarks);
    const bookmarkListBookmarksString = generateBookmarkString(bookmarks);
    console.log(bookmarkListBookmarksString);

    //insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListBookmarksString);
  }



  function handleNewBookmarkSubmit(){
    
  }

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  function handleDeleteBookmarkClicked(){
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      //get the index of the item in store.bookmarks
      const id = getBookmarkIdFromElement(event.currentTarget);
      // Use the found id to delete the bookmark
      store.findAndDelete(id);
      // render the updated shopping list
      render();
    });
  }

  function handleEditBookmarkSubmit(){

  }



  function bindEventListeners(){
    console.log('ran bindEventListeners');
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleEditBookmarkSubmit();

  }

  return {
    render: render,
    bindEventListeners: bindEventListeners
  };
})();