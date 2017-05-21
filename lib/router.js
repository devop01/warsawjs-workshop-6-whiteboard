import { Random } from 'meteor/random';

Router.configure({
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    loadingTemplate: 'loading'
});

Router.route('/', function () {
    this.render('home', {});
});
Router.route('/whiteboard/', function () {
    //Session.set('sessionId', this.params.id);
    const sessionId = Random.id();
    Whiteboards.insert({_id: sessionId, _date: new Date()});
    this.redirect('/whiteboard/' + sessionId);
});
Router.route('/whiteboard/:id', function () {
    Session.set('sessionId', this.params.id);
    this.render('whiteboard', {});
});
Router.route('/sortUp', function () {
    Session.set('sortType', -1);
    this.redirect('/');
});
Router.route('/sortDown', function () {
    Session.set('sortType', 1);
    this.redirect('/');
});