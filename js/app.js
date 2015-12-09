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
        
        var ind= 0;
        
        for(var x=0; x< this.collection1.length; x++){
           if(this.collection1[x] == undefined){ continue; }
           if( (this.collection1[x].from.indexOf(this.collection0[ind].from) > -1) || (this.collection1[x].subject.indexOf(this.collection0[ind].subject) > -1 )){
                delete this.collection1[x];   
                ind++;
            }
           if(ind== this.collection0.length){ind = 0;}           
        } 
        
        return msgs;       
    },
    
    filterArrayCorrect: function(){
        
        var msgsCorrect = [];
        for(var l=0; l<this.collection1.length; l++){
            if( this.collection1[l] != undefined ){
                msgsCorrect.push({
                                    from: this.collection1[l].from,
                                    subject: this.collection1[l].subject             
                                 });
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

var tmpl= "<li> <strong> FROM </strong> </li> <p> SUBJECT </p>"; 

var view = {
    
    layout: function(){
        for(var i=0; i< controller.getLenghtMsgs(); i++){
            $(".result").append(tmpl.replace("FROM",controller.getMsgsFROM(i)).replace("SUBJECT",controller.getMsgsSUB(i)) ); 
        }
    },
    
    filterView: function(){
            for(var i=0; i< controller.getLenghtFilterMsgs(); i++){
            $(".result").append(tmpl.replace("FROM",controller.getMsgsFilteredFROM(i)).replace("SUBJECT",controller.getMsgsFilteredSUB(i)) ); 
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
    
    getMsgsFROM: function(position){
        return MailModel.collection1[position].from;
    },
    
    getMsgsSUB: function(position){
        return MailModel.collection1[position].subject;
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
    
    getMsgsFilteredFROM: function(position){
        var filterCORRECT= MailModel.filterArrayCorrect();
        return filterCORRECT[position].from;
    },
    
    getMsgsFilteredSUB: function(position){
        var filterCORRECT= MailModel.filterArrayCorrect();
        return filterCORRECT[position].subject;
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