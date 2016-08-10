(function(window){
    'use strict';

    function View(element, model) {
        this.$form = element;
        this.model = model;
        this.$submitNewProject = this.$form['add'];
        this.$rightPanel = document.querySelector('.new-project');
        this.$buttonRightPanel = document.querySelector('.add-project');
        this.project = {};


        this.$form.addEventListener('change', this.checkValid.bind(this));
        this.$buttonRightPanel.addEventListener('click', this._openRightPanel.bind(this));
    }
    View.prototype._getProject = function(){
        var length = this.$form.length-1;
        for(var i = 0; i < length; i++){
            this.project[this.$form[i].name] = this.$form[i].value;
        }
        this.project['dueDate'] = this.model.convertDate(this.project['dueDate']);
        this.project['createdDate'] = this.model.convertDate(this.project['createdDate']);
        return this.project;
    };
    View.prototype.checkValid = function(){
        if(this.$form.checkValidity()){
            this.$submitNewProject.disabled = false;
        }
    };
    View.prototype.onSubmit = function(handler){
        this.$form.addEventListener('submit', function(e) {
            e.preventDefault();
            handler(this._getProject());
            this._clearForm();
            this._closeRightPanel();
        }.bind(this));
    };
    View.prototype._printSelect = function(selector, data){
        var select = document.querySelector(selector),
            li;
        select.innerHTML = '';
        data.forEach(function(item){
            li = document.createElement('li');
            li.innerText = item.name;
            li.setAttribute('data-value', item.name);
            select.appendChild(li);
        });
    };
    View.prototype._closeRightPanel = function(){
        this.$rightPanel.classList.remove('show');
    };
    View.prototype._openRightPanel = function(){
        this.$rightPanel.classList.add('show');
        this.model.getTypes(function(data){
            this._printSelect('#types', data);
        }.bind(this));
        this.model.getCustomers(function(data){
            this._printSelect('#customers', data);
        }.bind(this));
        this._setCurrentDay();
    };
    View.prototype._setCurrentDay = function(){
        this.$form['createdDate'].value = this.model.getCurrentDate();
    };
    View.prototype._clearForm = function(){
        for(var i = 0; i < this.$form.length-1; i++){
            this.$form[i].value = "";
        }
    };

    window.app = window.app || {};
    window.app.ViewNewProject = View;
})(window);