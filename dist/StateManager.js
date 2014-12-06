define(['underscore', 'backbone'], function(_, backbone) {
  var StateManager;
  return window.foo = new (StateManager = (function() {
    var activeState, states;

    states = {};

    activeState = null;

    StateManager.prototype.router = new backbone.Router();

    StateManager.prototype.go = function(name, parameters, options) {
      var state;
      if (options == null) {
        options = {
          navigate: true
        };
      }
      if (!states[name]) {
        throw new Error('No State with name "' + name + "' found.");
      }
      state = states[name];
      state.activate(parameters);
      activeState = state;
      if (options.navigate && !state.abstract && state.route) {
        return this.router.navigate(state.generateRoute(parameters));
      }
    };

    StateManager.prototype.registerState = function(state) {
      var name;
      name = state.generateName();
      if (states[state.generateName()]) {
        throw new Error('State with name "' + name + '" already exists.');
      }
      states[state.generateName()] = state;
      if (state.route && !state.abstract) {
        return this.router.route(state.generateRouteString(), state.generateName(), function(parameters) {
          var _arguments;
          _arguments = arguments;
          parameters = _.object(_.map(state.generateRouteString().match(/:([a-zA-Z0-9\-_]+)/g), function(name, index) {
            return [name.substring(1), _arguments[index]];
          }));
          return state.activate(parameters);
        });
      }
    };

    StateManager.prototype.getState = function(name) {
      return states[name];
    };

    StateManager.prototype.clear = function() {
      if (activeState != null) {
        activeState.getParentChain()[0].deactivate();
      }
      return states = {};
    };

    function StateManager() {
      this.clear();
    }

    return StateManager;

  })());
});

//# sourceMappingURL=data:application/json;base64,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TCxXQUFXLENBQUUsY0FBYixDQUFBLENBQThCLENBQUEsQ0FBQSxDQUFFLENBQUMsVUFBakMsQ0FBQTtPQUFBO2FBQ0EsTUFBQSxHQUFTLEdBRko7SUFBQSxDQTNCUCxDQUFBOztBQStCYSxJQUFBLHNCQUFBLEdBQUE7QUFDWCxNQUFBLElBQUMsQ0FBQSxLQUFELENBQUEsQ0FBQSxDQURXO0lBQUEsQ0EvQmI7O3dCQUFBOztRQUZEO0FBQUEsQ0FGSCxDQUFBLENBQUEiLCJmaWxlIjoiU3RhdGVNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiZGVmaW5lIFtcbiAgJ3VuZGVyc2NvcmUnLCAnYmFja2JvbmUnXG5dLCAoXywgYmFja2JvbmUpIC0+XG4gIHdpbmRvdy5mb28gPSBuZXcgY2xhc3MgU3RhdGVNYW5hZ2VyXG4gICAgc3RhdGVzID0ge31cbiAgICBhY3RpdmVTdGF0ZSA9IG51bGxcbiAgICByb3V0ZXI6IG5ldyBiYWNrYm9uZS5Sb3V0ZXIoKVxuICAgIGdvOiAobmFtZSwgcGFyYW1ldGVycywgb3B0aW9ucyA9IHtuYXZpZ2F0ZTogdHJ1ZX0pIC0+XG4gICAgICB1bmxlc3Mgc3RhdGVzW25hbWVdXG4gICAgICAgIHRocm93IG5ldyBFcnJvciAnTm8gU3RhdGUgd2l0aCBuYW1lIFwiJyArIG5hbWUgKyBcIicgZm91bmQuXCJcbiAgICAgIHN0YXRlID0gc3RhdGVzW25hbWVdXG4gICAgICBzdGF0ZS5hY3RpdmF0ZSBwYXJhbWV0ZXJzXG4gICAgICBhY3RpdmVTdGF0ZSA9IHN0YXRlXG4gICAgICBpZiBvcHRpb25zLm5hdmlnYXRlICYmICFzdGF0ZS5hYnN0cmFjdCAmJiBzdGF0ZS5yb3V0ZVxuICAgICAgICBAcm91dGVyLm5hdmlnYXRlIHN0YXRlLmdlbmVyYXRlUm91dGUgcGFyYW1ldGVyc1xuXG4gICAgcmVnaXN0ZXJTdGF0ZTogKHN0YXRlKSAtPlxuICAgICAgbmFtZSA9IHN0YXRlLmdlbmVyYXRlTmFtZSgpXG4gICAgICBpZiBzdGF0ZXNbc3RhdGUuZ2VuZXJhdGVOYW1lKCldXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignU3RhdGUgd2l0aCBuYW1lIFwiJyArIG5hbWUgKyAnXCIgYWxyZWFkeSBleGlzdHMuJylcbiAgICAgIHN0YXRlc1tzdGF0ZS5nZW5lcmF0ZU5hbWUoKV0gPSBzdGF0ZVxuICAgICAgaWYgc3RhdGUucm91dGUgJiYgIXN0YXRlLmFic3RyYWN0XG4gICAgICAgIEByb3V0ZXIucm91dGUgc3RhdGUuZ2VuZXJhdGVSb3V0ZVN0cmluZygpLCBzdGF0ZS5nZW5lcmF0ZU5hbWUoKSwgKHBhcmFtZXRlcnMpLT5cbiAgICAgICAgICBfYXJndW1lbnRzID0gYXJndW1lbnRzXG4gICAgICAgICAgcGFyYW1ldGVycyA9IF8ub2JqZWN0IF8ubWFwIHN0YXRlLmdlbmVyYXRlUm91dGVTdHJpbmcoKS5tYXRjaCgvOihbYS16QS1aMC05XFwtX10rKS9nKSwgKG5hbWUsIGluZGV4KS0+XG4gICAgICAgICAgICBbbmFtZS5zdWJzdHJpbmcoMSksIF9hcmd1bWVudHNbaW5kZXhdXVxuICAgICAgICAgIHN0YXRlLmFjdGl2YXRlIHBhcmFtZXRlcnNcblxuICAgIGdldFN0YXRlOiAobmFtZSktPlxuICAgICAgc3RhdGVzW25hbWVdXG5cbiAgICBjbGVhcjogKCktPlxuICAgICAgYWN0aXZlU3RhdGU/LmdldFBhcmVudENoYWluKClbMF0uZGVhY3RpdmF0ZSgpXG4gICAgICBzdGF0ZXMgPSB7fVxuXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICBAY2xlYXIoKSJdfQ==