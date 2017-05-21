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
    }
});