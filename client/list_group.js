import Whiteboards from "../lib/whiteboards";
import Objects from "../lib/objects";

Template.list_group.events({
   'click .delete': function () {
       Whiteboards.remove(this._id);
       Objects.remove({'_sessionId': this._id});
   }
});

Template.list_group.helpers({
    Whiteboards: function () {
        //var cmp = { asc: (x, y) => x >= y, dsc: (x, y) => x <= y };
        var sortType = Session.get('sortType') ? Session.get('sortType') : 1;
        console.log('sortType', sortType);
        //console.log(Whiteboards.find().fetch().sort(cmp[this._date || sortType]));
        return Whiteboards.find({}, {sort: { _date : sortType }});
        //return Whiteboards.find().fetch();
    },
    objectsCount: function () {
        return Objects.find({'_sessionId': this._id }).count()
        //return 999;
    }
});