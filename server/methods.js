Meteor.methods({
   clearCanvas: function(sessionId) {
       console.log('methods:clearCanvas');
       console.log('methods:clearCanvas', sessionId);
       Objects.remove({_sessionId: sessionId});
   }
});