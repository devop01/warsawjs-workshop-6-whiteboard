import { Random } from 'meteor/random';
import Objects from '../lib/objects';
import Whiteboards from '../lib/whiteboards';

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
      doc._sessionId = Session.get('sessionId');
      console.log(Session.get('sessionId'));
      Objects.insert(doc);
   });
   canvas.on('object:modified', function (event) {
      console.log(event);
      var _id = event.target._id;
      var object = event.target;
      var doc = object.toObject();
      Objects.update(_id, {$set: doc});
      // Objects.update(_id, {$push: {objects:doc}});
   });
   canvas.isDrawingMode = Session.get('drawingMode');
   Tracker.autorun(function () {
       canvas.isDrawingMode = Session.get('drawingMode');
       canvas.freeDrawingBrush.width = parseInt(Session.get('brushSize'));
       canvas.freeDrawingBrush.color = Session.get('brushColor') ? Session.get('brushColor') : '#000000';
   });
    Session.set('brushSize', 50);
    Session.set('sortType', 1);
    //console.log('sessionId', Session.get('sessionId'));
    //console.log(Whiteboards.find({'_id': Session.get('sessionId')}).fetch()[0]);
    var wbname = Whiteboards.find({'_id': Session.get('sessionId')}).fetch()[0].name;
    //console.log('wbname', wbname);
    if (!wbname) {
        wbname = 'startValue';
    }
    Session.set('whiteboardName', wbname);
    Objects.find({_sessionId: Session.get('sessionId')}).observeChanges({
        added: function (id, object) {
            fabric.util.enlivenObjects([object], function ([object]) {
                object._id = id;
                canvas.add(object);
            });
        },
        changed: function (id, changed) {
            console.log('id_LOG', id);
            console.log('changed_log', changed);
            var obj = canvas.getObjectById(id);
            obj.set(changed);
            canvas.renderAll();

        },
        removed: function() {
            canvas.clear();
        }
    });
});
fabric.Canvas.prototype.getObjectById = function (id) {
  return this.getObjects().find(function (object) {
      return object._id == id;
    });
};