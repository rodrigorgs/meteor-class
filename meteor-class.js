Todos = new Meteor.Collection("todos")

if (Meteor.isClient) {
  // client code
  Template.todo_list.todos = function(){
    var filter = Session.get('filter');
    if ( !filter ) return Todos.find();

    return Todos.find({desc: {$regex: '^.*'+filter+'.*$', $options: 'i'}});
  }

  Template.todo_list.todosCount = function(){
    return Todos.find().fetch().length;
  }

  Template.todo_list.events = {
    'keyup #todo_filter': function(evt){
      Session.set('filter', evt.target.value.trim());
    }
  }

  Template.todo_info.events = {
    'change input': function(evt){
      Todos.update(this._id, {$set: {done: !!evt.target.checked}});
    }
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
