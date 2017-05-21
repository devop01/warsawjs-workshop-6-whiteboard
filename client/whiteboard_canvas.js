import { Random } from 'meteor/random';
import Objects from '../lib/objects';

Template.whiteboard_canvas.onRendered(function () {
   const canvas = new fabric.Canvas('whiteboard', {
       selection: false,
       renderOnAddOrRemove: true
   });
   canvas.on('object:added', function (event) {
      console.log(event);
      var object = event.target;
      if (object._id) {
          return;
      }
      var doc = object.toObject();
      doc._id = Random.id();
      Objects.insert(doc);
   });
   canvas.isDrawingMode = Session.get('drawingMode');
   Tracker.autorun(function () {
       canvas.isDrawingMode = Session.get('drawingMode');
       canvas.freeDrawingBrush.width = parseInt(Session.get('brushSize'));
       canvas.freeDrawingBrush.color = Session.get('brushColor') ? Session.get('brushColor') : '#000000';
   });
    Session.set('brushSize', 50);

    Objects.find().observeChanges({
        added: function(id, object) {
            fabric.util.enlivenObjects([object], function ([object]) {
                object._id = id;
                canvas.add(object);
            });
        },
        changed: function() {

        },
        removed: function() {

        }
    });
});
fabric.canvas.prototype.getObjectsById = function (id) {
  return this.getObjects().find(function (object) {
      return object._id == id;
    });
};