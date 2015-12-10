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
        
        
        for(var x=0; x< this.collection0.length; x++){
            
            if(this.collection0[x] == undefined){ continue; }
            
          for(var t=0; t<this.collection1.length; t++){
              
           if(this.collection1[t] == undefined){ continue; }
           if( (this.collection1[t].from.indexOf(this.collection0[x].from) > -1) || (this.collection1[t].subject.indexOf(this.collection0[x].subject) > -1 )){
                delete this.collection1[t];   
                
            }
            
          }
            
        } 
        
        return this.collection1;       
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
    
    layout: function( arrayMsgs ){
        for(var i=0; i< arrayMsgs.length; i++){
            $(".result").append(tmpl.replace("FROM",arrayMsgs[i].from).replace("SUBJECT",arrayMsgs[i].subject) ); 
        }
    },
    
    filterView: function( arrayCorrect ){
            for(var i=0; i< arrayCorrect.length; i++){
            $(".result").append(tmpl.replace("FROM",arrayCorrect[i].from).replace("SUBJECT",arrayCorrect[i].subject) ); 
        }   
    }
};

var controller = {
    
    getInit: function(){
        return MailModel.init();
    },
      
    getViewInit: function( arrayMsgs ){
        return view.layout( arrayMsgs );
    },
    
    getModelFilter: function(){
        return MailModel.filter();
    },
    
    getFilterView: function( arrayCorrect ){
        return view.filterView( arrayCorrect );
    },
    
    getModelFilterCorrect: function(){
        return MailModel.filterArrayCorrect();
    },
    
    
};
         
            
$(document).ready(function(){
     
    controller.getInit();
    controller.getViewInit( msgs );
    
    $(".btn-filter").click(function(){
        $(".btn-filter").attr("disabled","disabled");
        $(".result").html("");
        controller.getModelFilter(); 
        controller.getFilterView( controller.getModelFilterCorrect() );
    });
     
});