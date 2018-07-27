'use strict';
/* global $, api */

const store = (function(){

  const addingBookmark = function(){
    this.adding = !this.adding;
  };

  const addBookmark = function(bookmark){
    this.bookmarks.push(bookmark);
  };

  const findById = function(id){
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndUpdate = function(id, newData){
    let foundElement = this.bookmarks.find(bookmark => bookmark.id === id);
    Object.assign(foundElement, newData);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const toggleExpanded = function(){
    this.bookmarks.expanded = !this.bookmarks.expanded;
  };

  const setRatingFilter = function(rating){
    // console.log('Inside store.setRatingFilter, value is: ' + rating);
    this.ratingFilter = rating;
    // console.log('value of this.ratingFilter inside setRatingFilter() is : ' + this.ratingFilter);
  };

  const toggleSubmitError = function(){
    this.submitError = true;
  };

  return {
    bookmarks: [],
    adding: false,
    ratingFilter: 1,
    submitError: false,

    addingBookmark,
    addBookmark,
    findById,
    findAndUpdate,
    findAndDelete,
    toggleExpanded,
    setRatingFilter,
    toggleSubmitError
  };
})();