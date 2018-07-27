'use strict';
/* global $, store, api */

const bookmarkList = (function(){

  function generateBookmarkElement(bookmark){
    let bookmarkTitle = `<h2 class="list-title">${bookmark.title}</h2>`;
    let bookmarkDescription = `<p>${bookmark.desc}</p>`;
    let bookmarkRating = `<p>${bookmark.rating}</p>`;
    let bookmarkURL = `<a href="${bookmark.url}" class="button">Visit Site</a>`;
    let bookmarkDelete = '<button class="bookmark-item-delete js-bookmark-delete">Delete Bookmark</button>';

    if(bookmark.expanded === true) {
      return `
      <li class="bookmark-element js-bookmark-element" data-bookmark-id="${bookmark.id}">
        ${bookmarkTitle}
        <div class="ratings-display">
          ${bookmarkDescription}
          ${bookmarkRating}
          ${bookmarkURL} ${bookmarkDelete}
        </div>
      </li>
      `;
    }else {
      return `
      <li class="bookmark-element js-bookmark-element" data-bookmark-id="${bookmark.id}">
        ${bookmarkTitle}
        <div class="ratings-display">
          ${bookmarkRating}
        </div>
      </li>
    `;
    }
  }

  function generateBookmarkString(list){
    const result = list.filter(item => item.rating >= store.ratingFilter);
    const bookmarks = result.map((bookmark) => generateBookmarkElement(bookmark));
    return bookmarks.join('');
  }

  function render(){
    console.log('\'render\' ran');
    $('.js-add-bookmark-button').show();
    $('.required-message').hide();

    if(store.adding) {
      $('#bookmark-form').show();
      $('.js-add-bookmark-button').hide();
    } else {
      $('#bookmark-form').hide();
      $('.js-add-bookmark-button').show();
    }

    if(store.submitError) {
      $('.required-message').show();
    } else {
      $('.required-message').hide();
    }

    let bookmarks = store.bookmarks;
    const bookmarkListBookmarksString = generateBookmarkString(bookmarks);
    $('.js-bookmark-list').html(bookmarkListBookmarksString);
  }

  function handleAddBookmarkClicked(){
    $('.js-add-bookmark-button').click(function () {
      // console.log('current status of store.adding: ' + store.adding);
      // console.log('handleAddBookmarksClicked ran');
      store.addingBookmark();
      // console.log('current status of store.adding: ' + store.adding);
      render();
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
        store.submitErrorDeactivated();
        store.addBookmark(newBookmark);
        store.addingBookmark();
        render();
      }, () => {
        store.submitErrorActivated();
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
      api.deleteBookmark(id, () => {
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleSortBookmarks(){
    $('#rating-select').change(function () {
      store.setRatingFilter(this.value);
      render();
    });
  }

  function handleDisplayDetailedView(){
    $('.js-bookmark-list').on('click', '.list-title', event => {
      const id = getBookmarkIdFromElement(event.currentTarget);
      store.toggleExpanded(id);
      render();
    });
  }

  function bindEventListeners(){
    console.log('ran bindEventListeners');
    handleAddBookmarkClicked();
    handleCancelAddBookmark();
    handleNewBookmarkSubmit();
    handleDeleteBookmarkClicked();
    handleDisplayDetailedView();
    handleSortBookmarks();
  }

  return {
    render: render,
    bindEventListeners: bindEventListeners
  };
})();