/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('should have a URL defined', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });

        it('should have a non empty name', function() {
            allFeeds.forEach(function(feed) {
              expect(feed.name).toBeDefined();
              expect(feed.name.length).toBeGreaterThan(0);
            });
        });
    });


    describe('The menu', function() {

        it('should have a hidden menu', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        it('should toggle menu on click', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });
    });

    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it('should have at least one feed', function() {
            expect($('.feed').find('.entry').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
              loadFeed(1, done);
            });
        });

        it('should change the displayed content', function() {
            expect($('.header-title').text()).toEqual(allFeeds[1].name);
        });
    });
}());
