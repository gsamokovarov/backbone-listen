// backbone-listen 0.1.0
//
// (c) 2013 Genadi Samokovarov
// Licensed under the MIT license.

(function(Backbone) {

  var superView = Backbone.View;
  var superDelegateEvents = Backbone.View.prototype.delegateEvents;

  Backbone.View = Backbone.View.extend({

    // Hook up `listen` processing right into the constructor.
    constructor: function(options) {
      superView.call(this, options);
      this._setupListening();
    },

    // Take the value of the `listen` property and process it into
    // `listenTo` calls. `listen` should have the following form:
    //
    // `{object: {"event": "functionNameOrDeclaration"}}`
    //
    // `object` should have `Backbone.Events` mixed in and should be
    // available on `this` after `initialize` e.g. it can be created
    // in `initialize` or somewhere down the prototype chain.
    _setupListening: function() {
      var listen;
      if (!(listen = _.result(this, 'listen'))) return;
      this.stopListening();
      for (var prop in listen) {
        var object = this[prop];
        if (!object) throw new Error('Property "' + prop + '" does not exist');
        var events = listen[prop];
        for (var event in events) {
          var method = events[event];
          if (!_.isFunction(method)) method = this[events[event]];
          if (!method) throw new Error('Method "' + events[event] + '" does not exist');
          this.listenTo(object, event, method);
        }
      }
    }

  });

}).call(this, Backbone);
