/* your code should go here */


// You can modify this object, add functions that you need
var MailModel = {
  /**
   * Initialises the model with the "database" of filter rules
   * and messages. This function is already implemented.
   */
    
   init : function(){
     this.rules = rules;
     this.messages = msgs;
   }, 
    
    collection0: rules,
    collection1: msgs,
   /**
    * Filters out messages in the "database" that match the spam rules.
    * @return an array of messages, excluding those that match the filter rules.
    */
    filter : function(){
        
        for(var x=0; x< this.collection1.length; x++){
             if(this.collection1[x] == undefined){ continue; }
             if( (this.collection1[x].indexOf(this.collection0[0]) > -1) || (this.collection1[x].indexOf(this.collection0[1]) > -1 )){
                delete this.collection1[x];   
            }
            
        }   
        return msgs;       
    },
    
    filterArrayCorrect: function(){
        
        var msgsCorrect = [];
        for(var l=0; l<this.collection1.length; l++){
            if( this.collection1[l] != undefined ){
                msgsCorrect.push(this.collection1[l]);
            }else{
                continue;
            }
        }
        return msgsCorrect;
    }
 
};

// Example of usage:
// MailModel.init()
// MailModel.filter() 
//  -> ["carlo@gmail.com", "trentose2@googlegroups.com"]


// We suggest to use js patters. 
// you can add here your views and controllers if you decide to do so.

var tmpl= "<li> TEST </li>"; 

var view = {
    
    layout: function(){
        for(var i=0; i< controller.getLenghtMsgs(); i++){
            $(".result").append(tmpl.replace("TEST",controller.getMsgs(i)) ); 
        }
    },
    
    filterView: function(){
            for(var i=0; i< controller.getLenghtFilterMsgs(); i++){
            $(".result").append(tmpl.replace("TEST",controller.getMsgsFiltered(i)) ); 
        }   
    }
};

var controller = {
    
    getInit: function(){
        return MailModel.init();
    },
    
    getRules: function(position){
        return MailModel.collection0[position];
    },
    
    getMsgs: function(position){
        return MailModel.collection1[position];
    },
    
    getLenghtMsgs: function(){
        return MailModel.collection1.length;
    },
    
    getViewInit: function(){
        return view.layout();
    },
    
    getModelFilter: function(){
        return MailModel.filter();
    },
    
    getFilterView: function(){
        return view.filterView();
    },
    
    getMsgsFiltered: function(position){
        var filterCORRECT= MailModel.filterArrayCorrect();
        return filterCORRECT[position];
    },
    
    getLenghtFilterMsgs: function(){
        var LENGHTmsgs= MailModel.filterArrayCorrect();
        return LENGHTmsgs.length;
    }
    
};
         
            
$(document).ready(function(){
     
    controller.getInit();
    controller.getViewInit();
    
    $(".btn-filter").click(function(){
        $(".btn-filter").attr("disabled","disabled");
        $(".result").html("");
        controller.getModelFilter(); 
        controller.getFilterView();
    });
     
});