'use strict';
/* global $, store, api */

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
          ${bookmarkDescription}
          ${bookmarkURL} <button class="bookmark-item-delete js-bookmark-delete">Delete Bookmark</button>
          ${bookmarkRating}
        </div>
      </li>
      `;
    

    // return `
    //   <li class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
    //     ${bookmarkTitle}
    //     <div class="ratings-display">
    //       ${bookmarkRating}
    //     </div>
    //     <button class="bookmark-item-delete js-bookmark-delete">Delete Bookmark</button>
    //   </li>
    // `;
  }

  function generateBookmarkString(list){
    const bookmarks = list.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }







  function render(){
    console.log('\'render\' ran');
    $('.js-add-bookmark-button').show();
    
    if(!store.adding) {
      $('#bookmark-form').hide();
    } else {
      $('#bookmark-form').show();
    }

    let bookmarks = store.bookmarks;
    // console.log(bookmarks);
    const bookmarkListBookmarksString = generateBookmarkString(bookmarks);
    //insert that HTML into the DOM
    $('.js-bookmark-list').html(bookmarkListBookmarksString);
  }




  function handleAddBookmarkClicked(){
    $('.js-add-bookmark-button').click(function () {
      console.log('current status of store.adding: ' + store.adding);
      console.log('handleAddBookmarsClicked ran');
      store.addingBookmark();
      console.log('current status of store.adding: ' + store.adding);
      render();
      // $('.js-add-bookmark-button').hide();
      // $('#bookmark-form').show();
    });
  }

  function handleCancelAddBookmark(){
    $('.js-form-cancel-button').click(function(){
      console.log('Inside handleCancelAddBookmark function');
      console.log('current status of store.adding before running store.addBookmark(): ' + store.adding);
      store.addingBookmark();
      console.log('current status of store.adding after running store.addBookmark(): ' + store.adding);
      render();
    });
  }



  function handleNewBookmarkSubmit(){
    $('#bookmark-form').submit(function (event) {
      event.preventDefault();
      const newBookmarkTitle = $('.js-title-entry').val();
      const newBookmarkURL = $('.js-url-entry').val();
      const newBookmarkDescription = $('.js-description-entry').val();
      const newBookmarkRating = $('input[name="rating"]:checked').val();

      // put commands here to clear out form after submit
      $('.js-title-entry').val('');
      $('.js-url-entry').val('');
      $('.js-description-entry').val('');

      api.createBookmark(newBookmarkTitle, newBookmarkURL, newBookmarkDescription, newBookmarkRating, (newBookmark) => {
        store.addBookmark(newBookmark);
        store.addingBookmark();
        render();
      });
    });
  }

  function getBookmarkIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.js-bookmark-element')
      .data('bookmark-id');
  }

  function handleDeleteBookmarkClicked(){
    $('.js-bookmark-list').on('click', '.js-bookmark-delete', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      api.deleteBookmark(id, (bookmark) => {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleEditBookmarkSubmit(){

  }



  function bindEventListeners(){
    console.log('ran bindEventListeners');
    handleAddBookmarkClicked();
    handleCancelAddBookmark();
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleEditBookmarkSubmit();

  }

  return {
    render: render,
    bindEventListeners: bindEventListeners
  };
})();