(function () {

  var _queue = [], _timeout, _waiting = false;

  /**
   */

  function _interval (fn, ms) {

    var timeout;

    function tick () {
      timeout = setTimeout(function () {
        _run(function () {
          fn();
          tick();
        })
      }, ms);
    }

    tick();

    return {
      dispose: function () {
        if(timeout) {
          clearTimeout(timeout);
        }
      }
    }
  }

  /**
   */

  function _run (fn) {
    _queue.push(fn);

    if (!_waiting) {
      _runQueue();
    }
  }

  /**
   */

  function _runQueue () {

    _waiting = false;
    _timeout = undefined;

    for (var i = 0; i < _queue.length; i++) {
      _queue[i]();
    }

    _queue = [];
  }

  /**
   */

  function _wait () {
    _waiting = true;
    if (_timeout) clearTimeout(_timeout);
    _timeout = setTimeout(_runQueue, boo.waitTimeout);
  }

  /**
   */


  var boo = {
    interval    : _interval,
    run         : _run,
    wait        : _wait,
    waitTimeout : 1000
  };

  if (typeof process !== "undefined") {
    module.exports == boo;
  }

  if (typeof window !== "undefined") {
    window.boo = boo;

    $(document).ready(function () {

      $("body, html").

        // wait on scroll
        scroll(boo.wait).

        // wait on mouse down - TODO - should be on capture
        mousedown(boo.wait).

        // wait if the user is interacting with the page
        mousemove(boo.wait);
    });
  }


})();