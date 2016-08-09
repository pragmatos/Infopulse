(function(window){
    'use strict';

    function View(model){
        this.model = model;

        this.$projects = document.querySelector('.dashboard tbody');
        this.$newProject = document.querySelector('#newProject');
        this.$submitProject = this.$newProject['add'];
    }
    View.prototype.bind = function(eventName, handler){
        var that = this;
        switch (eventName) {
            case 'newProject':
                that._bindAddProjectEvents(handler);
                break;
            case 'deleteProject':
                that._bindRemoveItem(handler);
                break;
        }
    }
    View.prototype.render = function(command, parameter){
        var that = this;
        var commands = {
            addNewProject: function(){
                that._appendProject(parameter);
            },
            removeProject: function(){
                that._removeProject(parameter);
            }
        }
        commands[command]();
    }
    View.prototype._removeProject = function(id){
        var tr = document.querySelector('tr[data-id="'+id+'"]');
        this.$projects.removeChild(tr);
    }
    View.prototype._appendProject = function(project){
        var printObj = {
            name: project.name,
            dueDate: project.dueDate,
            createdDate: project.createdDate,
            members: project.members,
            type: project.type,
            status: this.model.isActive(project),
            customer: project.customer
        },
            row = this.$projects.insertRow(),
            cell,
            index = 0;
        for(var key in printObj){
            cell = row.insertCell(index);
            cell.innerText = printObj[key];
            index++;
        }
        cell = row.insertCell(index);
        cell.innerHTML = '<button data-id="'+project.id+'" class="delete-project"></button>';
        row.setAttribute("data-id",project.id);
        if(!printObj['status']){
            row.classList.add('overdue');
        }

    }
    View.prototype._bindAddProjectEvents = function(handler){
        var that = this;
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
                handler(project);
            }

        });
        that.$newProject.addEventListener('change', function(e){
            if(that.$newProject.checkValidity()){
                that.$submitProject.disabled = false;
            }
        });
    }
    View.prototype._bindRemoveItem= function(handler){
        var that = this;
        that.$projects.addEventListener('click', function(e){
            if(e.target.getAttribute('data-id')){
                handler(parseInt(e.target.getAttribute('data-id')));
            }

        });
    }

    window.app = window.app || {};
    window.app.ProjectsView = View;
})(window);