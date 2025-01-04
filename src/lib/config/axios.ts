export var counter = (function() {
    var count = 0;
 
    return {
        increment: function() {
            count++;
        },
        decrement: function() {
            count--;
        },
        getCount: function() {
            return count;
        }
    };
})();
 
export const heelo = (() => {
    const date = new Date();
    return date;
    // return {
    //     getDate:()=>date,
    //     date1
    // }
})();
