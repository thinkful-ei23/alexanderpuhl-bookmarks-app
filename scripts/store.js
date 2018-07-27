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
  
  const toggleExpanded = function(id){
    const foundElement = this.findById(id);
    foundElement.expanded = !foundElement.expanded;
  };

  const setRatingFilter = function(rating){
    this.ratingFilter = rating;
  };

  const submitErrorActivated = function(){
    this.submitError = true;
  };

  const submitErrorDeactivated = function(){
    this.submitError = false;
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
    submitErrorActivated,
    submitErrorDeactivated
  };
})();