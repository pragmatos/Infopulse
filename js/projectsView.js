(function(window){
    'use strict';

    function View(model){
        this.model = model;

        this.$newProject = document.querySelector('#newProject');
        this.$submitProject = this.$newProject[6];
        console.log(this.$newProject);
    }

    View.prototype.bind = function(eventName, handler){
        var that = this;
        switch (eventName) {
            case 'newProject':
                that.$newProject.addEventListener('submit', function(e){
                    var project = {},
                        length = that.$newProject.length-1;
                    e.preventDefault();
                    if(that.$newProject.checkValidity()){
                        for(var i = 0; i < length; i++){
                                project[that.$newProject[i].name] = that.$newProject[i].value;
                                that.$newProject[i].value = "";
                        }
                        that.$submitProject.disabled = true;
                    }

                    handler(project);
                });
                that.$newProject.addEventListener('change', function(e){
                    if(that.$newProject.checkValidity()){
                        that.$submitProject.disabled = false;
                    }
                });
                break;
        }
    }

    window.app = window.app || {};
    window.app.ProjectsView = View;
})(window);