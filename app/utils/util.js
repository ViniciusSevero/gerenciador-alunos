module.exports.getClientAddress = function (req) {
    return (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
};

module.exports.convertDate = function(dateStr){
    var aux = dateStr.split('/');
    return parseInt(aux[2] + '' + aux[1] + '' + aux[0]);
}

module.exports.parseRegex = function(obj){
    if('$and' in obj){
        let arr = obj['$and'];
        if(arr.length > 0){
           let item = arr[0];
           for(let key in item){
               if(typeof item[key] === 'object'){
                   if('$regex' in item[key]){
                       item[key]['$regex'] = new RegExp(item[key]['$regex'],'i' );
                   }
               }
           }
        }
    }
}
