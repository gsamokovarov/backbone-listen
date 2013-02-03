$(document).ready(function() {

  var view;

  module("Backbone.Listen", {

    setup: function() {
      view = new Backbone.View;
    }

  });

  test("listen declaratively listens to objects", 2, function() {
    var View = Backbone.View.extend({
      listen: {
        model: {'change': 'modelChange'},
        eventable: {'custom': 'eventableCustom'}
      },

      initialize: function() {
        this.eventable = _.extend({}, Backbone.Events);
      },

      modelChange: function() {
        ok(true);
      },

      eventableCustom: function() {
        ok(true);
      }
    });

    var view = new View({model: new Backbone.Model});
    view.model.trigger('change');
    view.eventable.trigger('custom');
  });

  test("listen can be a function", 1, function() {
    var View = Backbone.View.extend({
      listen: function() {
        return {model: {'change': 'modelChange'}};
      },

      modelChange: function() {
        ok(true);
      }
    });

    var view = new View({model: new Backbone.Model});
    view.model.trigger('change');
  });

  test("listen binds the objects to the proper context", 1, function() {
    var View = Backbone.View.extend({
      listen: {
        model: {'change': 'modelChange'}
      },

      initialize: function() {
        this.context = this;
      },

      modelChange: function() {
        ok(this.context && this.context === this);
      }
    });

    var view = new View({model: new Backbone.Model});
    view.model.trigger('change');
  });

  test("listen complains on undefined functions", 1, function() {
    var View = Backbone.View.extend({
      listen: {
        model: {'change': 'modelChange'}
      }
    });

    try {
      var view = new View({model: new Backbone.Model});
    } catch (e) {
      equal('' + e, 'Error: Method "modelChange" does not exist');
    }
  });

  test("listen complains on undefined properties", 1, function() {
    var View = Backbone.View.extend({
      listen: {
        model: {'change': 'modelChange'}
      }
    });

    try {
      var view = new View();
    } catch (e) {
      equal('' + e, 'Error: Property "model" does not exist');
    }
  });

});
