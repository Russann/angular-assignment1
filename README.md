# angular-assignment1

This is your first real coding assignment. You will be using an external API to
build a dynamic list of U.S. Congress members. You will do this by using
[AngularJS](https://angularjs.org/) to build dynamic view that will interface
with this API. You will also implement a simple design to the page using
[bootstrap](http://getbootstrap.com/). You will install client-side dependencies
using [bower](http://bower.io/). `bower` is like `npm`, but for client-side
libraries like angular, bootstrap, or jQuery.

# Installation

1. Fork the repo to your personal github account

1. Clone your version of the repo to your computer.

1. Install server dependencies

  * Navigate to your project directory in the terminal. You can do this through
    the desktop app by right-clicking on your repo and selecting `Open in
    Terminal`.

    Otherwise, you can open up the Terminal app and `cd` (change
    directory) to your project. If you open up your project folder in the
    Finder/Explorer, you should be able to type `cd ` (that's a space at the end
    there), and drag your project folder from the Finder into the Terminal
    window.

  * Run `npm install`

1. Install client-side dependencies

  * Install `bower` as a global npm module by running `npm install -g bower`
  * Install the client dependencies. The `--save` flag will update your
    `bower.json` file with the dependencies and their versions.

    ```sh
    bower install --save angular bootstrap
    ```

    Note that this created a folder in your project called `bower_components/`.
    This is like the `node_modules/` directory, but for your client-side
    dependencies.

1. Start your server by running `npm start`

1. Visit your browser at [http://localhost:8000](http://localhost:8000)

# Instructions

You must implement the API described here to implement a tool that allows a user
to search for Representatives and Senators by name, by state, and by zip. The
API documentation is located
[here](http://dgm-representatives.herokuapp.com/docs).

There should functionality to do the following:

* Search Senators and Representatives by zip code (both at the same time)
* Search Senators by last name or by state
* Search Representatives by last name or by state

## Angular help

First you must declare an angular app:

```js
// client/js/app.js
angular.module('RepsApp', []);
```

Next, make a Representative search controller. This will handle our application
data and logic:

```js
// client/js/reps-controller.js
angular
  .module('RepsApp')
  .controller('RepsController', [function () {
    var self = this;
    // This will keep track of the list of members to display
    self.members = [];
  }]);
```

In our html, we can now start to hook everything up:

```html
// client/index.html
...
<html ng-app="RepsApp">
  <head>...</head>
  <body>
    <div ng-controller="RepsController as reps">

      <ul><!-- This is going to be the display the list of congress members -->
        <li ng-repeat="member in reps.members">
          {{member.name}}
        </li>
      </ul>
    </div>
    ...
  </body>
</html>
```

Now we should hit that api to get the data.

```js
// client/js/reps-controller.js
angular
  .module('RepsApp')
  .controller('RepsController', ['$http', function ($http) { // Make sure to add this $http service
    var self = this;
    self.members = [];

    // This is a method we'll call to update the members data
    self.searchByZip = function (zip) {
      $http
        .get('http://dgm-representatives.herokuapp.com/all/by-zip/' + zip)
        .then(function (res) {
          self.members = res.data;
        });
    };
  }]);
```

Now we need some way to trigger this to actually search.

```html
...
<div ng-controller="RepsController as reps">
  <label>
    Search By Zip
    <input ng-model="reps.search.zip" />
    <button type="button" ng-click="reps.searchByZip(reps.search.zip)">Search</button>
  </label>

  <ul>
    <li ng-repeat="member in reps.members">
      {{member.name}}
    </li>
  </ul>
</div>
...
```

Now, you can put stuff into the input, click the button, and it will go get the
data for you! All you need to do now is hook up the other controls for searching
for the representatives and senators by name and by state.

I brushed over a lot of stuff there. We went over this in class, but if you need
extra help trying to understand angular, this free tutorial goes over most
everything we're going to cover and did a decent job at doing it:

[https://www.codeschool.com/courses/shaping-up-with-angular-js](https://www.codeschool.com/courses/shaping-up-with-angular-js)
