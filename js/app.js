(function(){
    "use strict";
    function Manager(name){
        var that = this;
        this.repository = new app.Repository(name);
        this.repository.init('data/data.json', function(){
            that.model = new app.ProjectsModel(that.repository);
            that.view = new app.MainView(that.model);
            that.controller = new app.ProjectsController(that.model, that.view);
            that.controller.printAllProjects();
        });
    }

    var manager = new Manager('customers');

    (function () {
        var dateElements = document.getElementsByClassName('date');
        Array.prototype.forEach.call(dateElements, function (element) {
            new Pikaday({
                field: element,
                format: "DD-MM-YYYY"
            })
        })
    })();
})();