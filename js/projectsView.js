(function(window){
    'use strict';

    function View(){
        this.$project = document.querySelector('.project')
    }

    View.prototype.bind = function(eventName, handler){
        switch (eventName) {
            case 'newProject':console.log(this);
        }
    }

    window.app = window.app || {};
    window.app.ProjectsView = View;
})(window);