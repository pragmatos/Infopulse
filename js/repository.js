(function(window){
	"use strict";
	function Repository(data){
		this.projects = data.projects || [];
		this.types = data.types || [];
		this.customers = data.customers || [];
	}
	Repository.prototype.loadData = function(cb){
		var xml = new XMLHttpRequest();

        xml.open('GET', 'data/data.json', true);
        xml.onreadystatechange = function(){
            var json;
            if(xml.readyState === 4){

                try{
                    data = JSON.parse(this.responseText);
                }
                catch(e){
                    console.log(e);
                }
                cb(data);
            }
        };
        xml.send();
	}

	window.app = window.app || {};
    window.app.Repository = Repository;
})(window);