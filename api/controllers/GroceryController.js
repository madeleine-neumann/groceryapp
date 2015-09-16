/**
 * GroceryController
 *
 * @description :: Server-side logic for managing groceries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'new': function (req, res) {
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    req.session.flash = {};
  },

  create : function (req, res, next) {
    // Create a Grocery with the params sent from the sign-up form
    Grocery.create( req.params.all(), function grocery (err, grocery) {
      // if there's an error
      console.log(err)
      if (err) {
        req.session.flash = {
          err : err
        }

        return res.redirect('/grocery/new');
      }
      // After succesfuly creating the grocery, redirect to show action
      //res.json(grocery);

      res.redirect('/grocery/show/' + grocery.id);
    });
  },

  show : function (req, res, next) {
    Grocery.findOne(req.param('id'), function foundGrocery( err, grocery ) {
      if (err) return next(err);
      if (!grocery) return next();

      res.view({
        grocery : grocery
      });
    });
  },

  index : function (req, res, next) {
    // Get an array of all grocerys in the Grocery collection(table)
    Grocery.find( function foundGrocery(err, grocerys) {
      if (err) return next(err);

      // pass the array down to the /grocery/index.ejs page
      res.view({
        grocerys : grocerys
      });
    });
  },

  edit : function (req, res, next) {
    Grocery.findOne( req.param('id'), function foundGrocery( err, grocery ) {
      if (err) return next(err);
      if (!grocery) return next('Grocery doesn\'t exist');

      res.view({
        grocery : grocery
      });
    });
  },

  update : function (req, res, next) {
    Grocery.update( req.param('id'), req.params.all(), function usreUpdate( err ) {
      if (err) {
        return res.redirect('/grocery/edit/' + req.param('id'));
      }

      res.redirect('/grocery');
    });
  },

  destroy : function (req, res, next) {
    Grocery.findOne( req.param('id'), function foundGrocery (err, grocery) {
      if (err) return next(err);
      if (!grocery) return next('Grocery doesn\'t exist');

      Grocery.destroy( req.param('id'), function groceryDestroyed( err ) {
        if (err) return next(err);
      });

      res.redirect('/grocery');
    });
  }

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GroceryController)
   _config: {}
   */

};


