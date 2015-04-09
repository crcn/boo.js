Boo.js is a library that runs a function when a user is inactive. This library was created to execute CPU intensive tasks that only run when the user is inactive. 

Example: http://jsfiddle.net/G56uE/5/

```javascript
var boo = require("boo");


// run this function every N MS
boo.interval(function () {
  
}, 100);


// run this function when a user is inactive
boo.run(function () {
  
});


// trigger wait for 1 second
boo.wait();
```

#### boo.interval(fn, ms)

runs a function every `ms` the user is inactive.

#### boo.wait()

resets the timer for executing functions.

#### boo.waitTimeout

wait timeout before running tasks. Default is `1000` ms.

#### boo.run(fn) 

task to run only when the user is inactive. This gets fired immediately if there's no user activity.
