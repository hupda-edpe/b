/**
 * a function that sorts an array of JSON objects
 */
// Sort an array of json objects
exports.jsonSort = function(jsonAttribute, reverse, primer){
    var key = primer ?
        function(x) {return primer(x[jsonAttribute])} :
        function(x) {return x[jsonAttribute]};
    reverse = !reverse ? 1 : -1;
    return function (a, b) {
        return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
};