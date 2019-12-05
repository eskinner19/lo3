'use strict';

// YOU KNOW WHAT TO DO //

/**
 * identity: returns any input value without changing it
 * 
 * @param {Anything} anything: any value that will be returned
 * @return {Anything} the value that was input
 * 
 * Examples:
 *   _.identity(5) === 5
 *   _.identity({a: "b"}) === {a: "b"}
 **/
 
function identity(anything) {
    return anything;
}

module.exports.identity = identity;

/**
 * typeOf: takes a value and returns it's data type as a string
 *
 * @params: {Anything} value: any value that will be taken as an input
 * @returns: {String} returns the name of the data type as a string
 * 
 * Examples:
 * _.typeOf(134) -> "number"
 * _.typeOf("javascript") -> "string"
 **/
 
function typeOf (value) {
    if (Array.isArray(value)) {
        return 'array';
    } else if (value === null) {
        return "null";
    } else {
        return typeof value;
    }
}

module.exports.typeOf = typeOf;

/** first:  takes an array, a number (X), and returns the first X amount of items in an array
 *          if X is not passed into number, the first element is returned
 *          
 * 
 * @param {Array} array: the array over which to iterate.
 * @param {Number} number: the number of items in the array to return
 * @returns: X number of items in an array starting at array[0]
 * 
 * Examples:
 *   _.first("ponies", 1) -> []
 *   _.first(["a", "b", "c"], "ponies") -> "a"
 */

function first (array, number) {
    var result = [];
    if (Array.isArray(array) !== true) {
        return [];
    } else if (number === undefined || typeof number !== 'number') {
        return array[0];   
    } else if (array.length < number) {
        return array;
    } else {
        for (let i = 0; i <= number -1; i++) {
            result.push(array[i]);
        } return result;
    }
}

module.exports.first = first;

/**
 * last: takes an array, a number (X), and returns the last X amount of items in an array
 *          if X is not passed into number, the last element is returned
 *          
 * 
 * @param {Array} array: the array over which to iterate.
 * @param {Number} number: the number of items in the array to return
 * 
 * @returns: X number of items in an array starting at array.length-1
 * Examples:
 *   _.last("ponies", 2) -> []
 *   _.last(["a", "b", "c"], "ponies") -> "c"
 **/

function last (array, number) {
    var result = [];
    if (Array.isArray(array) !== true  || number < 0) {
        return [];
    } else if (number === undefined || typeof number !== 'number') {
        return array[array.length-1];
    } else if (array.length < number) {
        return array;
    } else {
        for (let i = array.length - number; i < array.length; i++) {
            result.push(array[i]);
        } return result;
    }
};

module.exports.last = last;

/**
 * each: Designed to loop over a collection, Array or Object, and applies the 
 * action Function to each value in the collection.
 * 
 * @param {Array or Object} collection: The collection over which to iterate.
 * @param {Function} action: The Function to be applied to each value in the 
 * collection
 * 
 * Examples:
 *   _.each(["a","b","c"], function(e,i,a){ console.log(e)});
 *      -> should log "a" "b" "c" to the console
 */
 
function each(collection, action) {
    if(Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i++) {
            action(collection[i], i, collection);
        }
    } else {
        for (var key in collection) {
            action(collection[key], key, collection);
        }
    }
}
module.exports.each = each;

/** indexOf: determines what the position of a provided value is assigned to within an array. If the array does not contain the value, -1 is returned.
 * 
 * @param {Array} array: The array over which to iterate.
 * @param {Anything} Value: a value to check for in the array
 * 
 * returns: If the array contains the Value, the function retuns the first indexed position in the array where value exists
 *          If the array does not contain the value, the function returns -1
 * Examples:
 *   _.indexOf(["a","b","c"], "c") -> 2
 *   _.indexOf(["a","b","c"], "d") -> -1
*/

function indexOf (array, value) {
    if (Array.isArray(array) !== true) {
        return -1;
    } else {
        for (let i = 0; i < array.length -1; i++) {
            if (array[i] === value) {
                return i;
            }  
        }
    } return -1;
}

module.exports.indexOf = indexOf;

/**
 * filter: returns an array containing values that pass a given test
 * 
 * @param {Array} array: an array of various values
 * @param {Function} action: a function that acts as a test 
 * @return {Array} an array of all values from a given array that passed a given action 
 * Examples:
 *   _.filter([1,2,3,4,5], function(x){return x%2 === 0}) -> [2,4]* 
 */

function filter (array, action) {
    
    var result = [];
    each(array, function(value, index, collection) {
        if (action(value, index, collection) === true) {
            result.push(value);
        }});
    return result;
}

module.exports.filter = filter;

/** reject: returns an array whose values, when passed into a function as parameters, returned false
 * 
 * @param {Array} array: an array of various values
 * @param {Function} action: a function that acts as a test 
 * 
 * @return {Array} an array of all values from a given array that did not resolve to "true" for a provided function 
 * Examples:
 *   _.reject([1,2,3,4,5], function(e){return e%2 === 0}) -> [1,3,5]
**/

function reject (array, action) {
   // debugger;
    var result = [];
    
    _.filter(array, function(value, index, collection) {
        if (!action(value, index, collection)) {
            result.push(value);
        }});
        return result;
}

module.exports.reject = reject;

/** partition: evaluates an array, passes the array values into a function, and pushes the value to a sub array depending on it's truthy/falsey value
 *      Array: contains subarrays
 *          subarray1: an array containing values that returned 'true' for a given test
 *          subarray2: an array containing values that returned 'false' for a given test
 * 
 * @param {Array} array: an array of various values
 * @param {Function} action: a function that acts as a test 
 * 
 * @return {Array} an array with two sub-arrays:
 *      0) An array that contains all the values for which <function> returned something truthy
 *       1) An array that contains all the values for which <function> returned something falsy
 * 
 * Examples:
 *   _.partition([1,2,3,4,5], function(element,index,arr){
 *     return element % 2 === 0;
 *   }); -> [[2,4],[1,3,5]]
**/

function partition (array, action) {
//     var result = [];
//         result.push(_.filter(array, action));
//         result.push(_.reject(array, action));
        
//     return result;
// };

return [filter(array, action), reject(array, action)];
}

module.exports.partition = partition;

/** unique: takes an array, removes any duplicate values from the array, and returns an array with only unique values.
 * 
 * @param {Array} array: an array of various values
 * 
 * @return {Array} an array of all elements from input array with duplicate elements removed
 * Examples:
 *   _.unique([1,2,2,4,5,6,5,2]) -> [1,2,4,5,6]
 */

function unique (array) {
    var result = [];
    each(array, function(element, index, collection) {
        if (result.indexOf(element) === -1) {
            result.push(element);
    }});
    return result;
}

module.exports.unique = unique;

/** map: takes a collection, passes each value within the collection into a function, pushes the results of each value to a new array, then returns that results array
 * 
 * @param {Array or Object} collection: an collection of various values
 * @param {Function} action: a function that receives info depending on collection type:
 *         if <collection> is an array:
 *            function receives the element, it's index, <collection>
 *        if <collection> is an object:
 *            the value, it's key, <collection>
 * 
 * @return {Array} a new array with the value of each function call
 *
 * 
 * Examples:
 *   _.map([1,2,3,4], function(e){return e * 2}) -> [2,4,6,8]
 */

function map (collection, action) {
    var result = [];
    each(collection, function(element, index, collection) {
        result.push(action(element, index, collection));
    });
    return result;
}

module.exports.map = map;

//1) Return an array containing the value of property for every element in array

/** pluck:  Takes an array of objects and a property.
 *          Grabs the values of <property> for each element in the array.
 *          Pushes the values of <property> to a result array
 *          Returns result array 
 * 
 * @param {Array} array: an array containing objects
 * @param {Property} action: a function that receives info depending on collection type:
 * 
 * @returns: an array that contains every value of <property> within <array>
 * 
 * Examples:
 *   _.pluck([{a: "one"}, {a: "two"}], "a") -> ["one", "two"]
*/
function pluck (array, property) {
    var result = [];
    map(array, function(element, index, collection) {
       result.push(element[property]);
    });
    return result;
}

module.exports.pluck = pluck;

/** contains: iterates over an arary of objects. If array contains value, return true, else, return false.
* 
* @param {Array}: An array: an array to iterate over
* @param {Anything}: A value: a value to use in comparing against the provided <array>.
* 
* @returns {Boolean} boolean: true or false
* 
* Examples:
*   _.contains([1,"two", 3.14], "two") -> true
*/
function contains (array, value) {
    var result;
    (indexOf(array, value) !== -1) ? result = true : result = false;
    return result;
    }

module.exports.contains = contains;

/** every:  Takes a collection and an action
 *          Passes each value within the collection to a function
 *          If the result of the function returns true for every return, the function every returns true
 *          If even one of the results from the function returns false, every returns false
 * 
* @param {Object or Array}: A collection to evaluate
* @param {Function} an action that calls every element within the collection:
*      if <collection> is an array:
*          current element, it's index, <collection>
*      if <collection> is an object:
*          current value, current key, <collection>
* 
* @returns: {Boolean} if every element in the arrary is true, returns true. If even one evaluation is false, returns false
* 
* Examples:
*   _.every([2,4,6], function(e){return e % 2 === 0}) -> true
*   _.every([1,2,3], function(e){return e % 2 === 0}) -> false
*/

function every (collection, action) {
  if (action) {
        var mapResult = map(collection, action);
        if (contains(mapResult, false)) {
            return false;
        } else {
            return true;
        }
  } else if (!action) {
    var mapResult2 = map(collection, function(value){ return value;});
        if (contains(mapResult2, false)) {
            return false;
        } else {
            return true;
        }
  }
}

module.exports.every = every;

/** some:   Takes a collection and an action
*          Passes each value within the collection to a function
*          If the result of the function returns true for one or more of the returns, the function some returns true
*          If the result of the function returns false for _all_ of the returns, the function some returns false
* 
* @param {Object or Array}: A collection to evaluate 
* @param {Function} an action that calls every element within the collection:
*      if <collection> is an array:
*          current element, it's index, <collection>
*      if <collection> is an object:
*          current value, current key, <collection>
* 
* @returns: {Boolean} if even one return value run against the function returns true, "some" returns true. If every value run against the function returns false, "some" returns false
* Examples:
*   _.some([1,3,5], function(e){return e % 2 === 0}) -> false
*   _.some([1,2,3], function(e){return e % 2 === 0}) -> true
*/
function some (collection, action) {

  if (action) {
        var mapResult = map(collection, action);
        if (contains(mapResult, true)) {
            return true;
        } else {
            return false;
        }
  } else if (!action) {
    var mapResult2 = map(collection, function(value){ return value;});
        if (contains(mapResult2, true)) {
            return true;
        } else {
            return false;
        }
  }
}

module.exports.some = some;

/** reduce: At a high level, passes every element to a function, which returns a value that is incorporated into the accumulated value.
 *          After every result has been passed into the function and incorportaed into the accumulated value, reduce returns a single value.
 *  
 *          Calls a function for every element in a collection and passes it the argumeents: previous result, element, index. 
 *          Uses the return value of the function as the previous result
 *          Iterates over every value within the collection
 * 
*   @param {Array}: an array that contains values
*   @param {Action}: a function that takes every element 
*   @param: {Seed} an optional value that equals "previous value" in the first iteration. If not provided, this defaults to the array[0] value
* 
*   @return: a single, acculumated value that is the result of all values of the collection which have been run through the function
* 
* Examples:
*   _.reduce([1,2,3], function(previousSum, currentValue, currentIndex){ return previousSum + currentValue }, 0) -> 6
*/

function reduce (array, action, seed) {
    for (var i = 0; i < array.length; i++) {
        if (seed !== undefined) {
            seed = action(seed, array[i], i);
        } else {
            seed = array[0];
            } 
    } return seed;
}

module.exports.reduce = reduce;

/** _.extend:   Takes the first object in the parameter
 *              Passes all subsequent object properties, into the first object
 *              Returns the first object, now with all properties of all objects
* 
* 
*   @param {Object} objects: a dynamic number of objects
* 
*   @returns: <object1> with the properties of all subsequent objects to it
*
* Examples:
*   var data = {a:"one"};
*   _.extend(data, {b:"two"}); -> data now equals {a:"one",b:"two"}
*   _.extend(data, {a:"two"}); -> data now equals {a:"two"}
*/
function extend (...args) {
    var object1 = args[0];

    for (let i = 1; i < args.length; i++) {
        var currentObject = args[i];
        for (var key in currentObject) {
            object1[key] = currentObject[key];
        }
    }
    return object1;
}

module.exports.extend = extend;