(function(window){
    'use strict';

    function View(element, model){
        this.$filter = element;
        this.model = model;
        this.filterParams = {};
        this.init();
    }
    View.prototype.onFilter = function(handler){
        var checkbox = document.querySelector('.group-checkbox');
        var that = this;
        this.$filter.addEventListener('change', function(e){
            that.filterParams = {};
            var types = [];
            for(var i = 0; i < that.$filter.length; i++){
                if(that.$filter[i].checked){
                    types.push(that.$filter[i].value);
                }
            }
            that.filterParams = {
                type: types,
                search: that.$filter['search'].value,
                searchDate: that.$filter['searchDate'].value
            };
            handler(that.filterParams);
        }.bind(this));
    };
    View.prototype._printCheckboxes = function(selector, data){
        var parent = document.querySelector(selector),
            tmp = '';
            parent.innerHTML = '';
        data.forEach(function(item){
            tmp+= '<input id="c'+item.id+'" type="checkbox" value="'+item.name.toUpperCase()+'"/>'+
                '<label for="c'+item.id+'">'+item.name+'</label>';
        });
        parent.innerHTML = tmp;
    };
    View.prototype.init = function(){
        this.model.getTypes(function(types){
            this._printCheckboxes('.group-checkbox',types);
        }.bind(this));
    };

    window.app = window.app || {};
    window.app.ViewFilterProjects = View;
})(window);