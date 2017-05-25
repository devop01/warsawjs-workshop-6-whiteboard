import Whiteboards from '../lib/whiteboards';

Template.whiteboard_panel.events({
   'change #drawingMode': function (event) {
       //console.log(event.target.checked);
       Session.set('drawingMode', event.target.checked);
   },
    'change #brushSize': function (event) {
        //console.log(event.target.value);
        Session.set('brushSize', event.target.value);
    },
    'change #brushColor': function (event) {
        //console.log(event);
        //console.log(event.target.value);
        Session.set('brushColor', event.target.value);
    },
    'change #whiteboardName': function (event) {
        console.log(event);
        //console.log(event.target.value);
        Session.set('whiteboardName', event.target.value);
        //console.log(Whiteboards.find({_id: Session.get('sessionId')}).fetch());
        //console.log(Whiteboards.find({_id: Session.get('sessionId')}).fetch());
        //console.log(Session.get('sessionId'));
        //console.log(Whiteboards.find().fetch());
        var _id = Session.get('sessionId');
        var wb = Whiteboards.find({_id: _id});
        wb.name = event.target.value;
        Whiteboards.update(_id, {$set: wb});
        Session.set('whiteboardName', wb.name);
    },
    'click #clearCanvas': function (event) {
        var _id = Session.get('sessionId');
        console.log('clearCanvas', _id);
        Meteor.call('clearCanvas', _id);
    }
});

Template.whiteboard_panel.helpers({
   brushSize: function () {
     return Session.get('brushSize')
   },
    brushColor: function () {
        return Session.get('brushColor')
    },
    drawingMode: function () {
        return Session.get('drawingMode')
    },
    whiteboardName: function () {
       return Session.get('whiteboardName')
    }
});