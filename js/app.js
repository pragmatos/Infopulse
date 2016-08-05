(function(){
    "use strict";
    function Manager(){
        this.model = new app.ProjectsModel([{name:"test"}]);
    }

    var manager = new Manager();

    console.log(manager.model);
})();