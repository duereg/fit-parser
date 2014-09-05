if(!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
}

if(!String.prototype.ltrim) { 
  String.prototype.ltrim=function(){return this.replace(/^\s+/,'');};
}

if(!String.prototype.rtrim) { 
  String.prototype.rtrim=function(){return this.replace(/\s+$/,'');};
}

if(!String.prototype.fulltrim) { 
  String.prototype.fulltrim=function(){return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ');};
}  

if(!String.prototype.isEmpty) { 
  String.prototype.isEmpty = function() {   
    return ((typeof this === 'undefined') || (this === null) || (this.length === 0));   
  };
} 

if(!String.prototype.isBlank) { 
  String.prototype.isBlank=function(){ return /^\s*$/.test(this); };
}

module.exports = String;