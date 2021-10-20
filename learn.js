const factory = function(a,b,c){
    return {
       name: a,
       age: b,
       school: c,
       concat: function(){
           return a+b+c;
       }
    }
}

console.log(factory("tiifu",23,"anglican"))
console.log(factory("glover",31,"presby sec"))