(function(window){
    'use strict';

    function Controller (model, view){
        var that = this;
        that.model = model;
        that.view = view;
    }

    window.app = window.app || {};
    window.app.ProjectsController = Controller;
})(window);