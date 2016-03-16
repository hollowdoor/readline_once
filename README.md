readline-once
=============

Install
-------

`npm install --save readline-once`

Examples
--------

With normal strings.

```javascript
var rlonce = require('readline-once')();

rlonce('first name? ', true).then(function(val){
    console.log('first name = '+val)

    return rlonce('last name? ').then(function(val){
        console.log('last name = '+val)
    });

}).catch(function(e){
    console.log('error! ', e);
});
```

With an array.

```javascript
var rlonce = require('readline-once')();

rlonce(['first name? ', 'last name? ']).then(function(fullname){
    console.log('full name = '+fullname.join(' '));
}).catch(function(e){
    console.log(e);
});
```

API
---

### rlonce(question|array, require) -> Promise

Ask a **question**, or pass an **array of questions**.

The **require** argument forces the question(s) to be asked again if it's not filled out.

About
-----

Sometimes it's nice to just have a one shot readline call.

This function will also work nicely with coroutines, and async await.
