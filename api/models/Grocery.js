/**
* Grocery.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    item: {
      type: 'string',
      require: true
    },
    linkToItem: {
      type: 'string',
      require: false
    },
    nameOfNeeder: {
      type: 'string',
      require: false
    }

  }
};

