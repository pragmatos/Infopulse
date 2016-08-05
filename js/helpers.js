(function(window){
    "use strict";
    var methods;
    function getJSON(url, callback){
        var xml = new XMLHttpRequest(),
            data;
        xml.open('GET', url, true);
        xml.onreadystatechange = function(){
            if(xml.readyState === 4){

                try{
                    data = JSON.parse(this.responseText);
                }
                catch(e){
                    console.log(e);
                }
                callback(data);
            }
        };
        xml.send();
    }
    methods = {
        $json: getJSON,
        data: "sdd"
    }

    window.app = window.app || {};
    window.app.Lib = methods;
})(window);