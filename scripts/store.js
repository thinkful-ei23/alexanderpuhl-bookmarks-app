'use strict';
/* global $ */

const store = (function(){

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
    this.expanded = !this.expanded;
  };

  const setRatingFilter = function(rating){
    this.ratingFilter = rating;
  };

  return {
    bookmarks: [],
    adding: false,
    ratingFilter: 1,

    addBookmark,
    findById,
    findAndUpdate,
    findAndDelete,
    toggleExpanded,
    setRatingFilter
  };
})();