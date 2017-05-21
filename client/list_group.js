import Whiteboards from "../lib/whiteboards";

Template.list_group.events({
   'click .delete': function () {
       Whiteboards.remove(this._id);
   }
});

Template.list_group.helpers({
    Whiteboards: function () {
        return Whiteboards.find().fetch();
    }
});