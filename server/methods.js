Meteor.methods({
   clearCanvas: function(sessionId) {
       Objects.remove({_sessionId: sessionId});
   }
});