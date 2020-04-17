const JSDOM = require('jsdom').JSDOM
const jsdom = new JSDOM('<!DOCTYPE html><html>...')
var localStorageMock = (function() {
  var store = {}

  return {
    getItem: function(key) {
      return store[key] || null
    },
    setItem: function(key, value) {
      store[key] = value.toString()
    },
    clear: function() {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

Object.defineProperty(document.documentElement, 'offsetHeight', {
  value: 1400,
})
