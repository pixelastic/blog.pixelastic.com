window.Steppe = (function() {
  var $ = Zepto;
  var _private;
  var defaultOptions = {
    mode: 'dropdown',
    output: null,
    find: function(input, callback) {
      callback();
    },
    render: function(suggestion) {
      return '<div class="steppe-suggestion">' + suggestion + '</div>';
    },
    val: function(suggestion) {
      return suggestion.toString ? suggestion.toString() : null;
    }
  };
  var KEYCODES = {
    UP: 38,
    DOWN: 40
  };

  function moveCaretAtEnd() {
    _.defer(function() {
      var length = _private.input.val().length;
      _private.input[0].setSelectionRange(length, length);
    });
  }

  function isSpecialKeyPressed(event) {
    return _.contains(_.values(KEYCODES), event.keyCode);
  }

  function renderWrapper() {
    if (_private.suggestions.length > 0) {
      _private.options.output.show();
    } else {
      _private.options.output.hide();
    }
  }

  function displaySuggestions(userSuggestions) {
    userSuggestions = userSuggestions || [];
    _private.suggestions = userSuggestions;

    var content = _.map(userSuggestions, _private.options.render).join('');
    _private.options.output.html(content);
    renderWrapper();
  }

  function selectNextSuggestion() {
    if (_.isEmpty(_private.suggestions)) {
      return;
    }
    var currentSelectedIndex = _private.selectedIndex;
    if (currentSelectedIndex === null) {
      currentSelectedIndex = 0;
    } else {
      currentSelectedIndex++;
    }
    selectSuggestion(currentSelectedIndex);
  }

  function selectPreviousSuggestion() {
    if (_.isEmpty(_private.suggestions)) {
      return;
    }
    var currentSelectedIndex = _private.selectedIndex;
    if (currentSelectedIndex === null) {
      currentSelectedIndex = _private.suggestions.length - 1;
    } else {
      currentSelectedIndex--;
    }
    selectSuggestion(currentSelectedIndex);
  }

  function keyboardSelect(keycode) {
    if (keycode === KEYCODES.DOWN) {
      selectNextSuggestion();
    }
    if (keycode === KEYCODES.UP) {
      selectPreviousSuggestion();
    }
  }

  function selectSuggestion(index) {
    // Handle going over bounds
    if (index < 0) {
      index = _private.suggestions.length - 1;
    }
    if (index > _private.suggestions.length - 1) {
      index = 0;
    }

    _private.selectedIndex = index;
    _private.selected = _private.suggestions[index];
    _private.value = _private.options.val(_private.selected);
    _private.input.val(_private.value);

    moveCaretAtEnd();

    var children = _private.options.output.children();
    children.removeClass('steppe-suggestion-selected');
    $(children[index]).addClass('steppe-suggestion-selected');
  }

  function onInput() {
    var newValue = _private.input.val();
    if (_private.value === newValue) {
      return;
    }

    _private.value = _private.input.val();
    _private.selected = null;
    _private.selectedIndex = null;

    // We make sure to never render results that are too old. We count the
    // number of find we launch, and keep track of the last find we displayed.
    // We never display a result older than the latest we've displayed.
    var firedFindIndex = ++_private.firedFindCount;
    _private.options.find(_private.value, function(suggestions) {
      if (firedFindIndex < _private.lastRenderedFind) {
        return;
      }
      _private.lastRenderedFind = firedFindIndex;
      displaySuggestions(suggestions);
    });
  }

  function onKeyDown(event) {
    // Triggered on every keypress, but we're only interested in special keys
    // (up and down)
    if (!_private.value) {
      return;
    }
    if (!isSpecialKeyPressed(event)) {
      return;
    }

    keyboardSelect(event.keyCode);
  }

  function onMouseWheel(event) {
    if (event.wheelDelta < 0) {
      selectNextSuggestion();
    } else {
      selectPreviousSuggestion();
    }
    event.preventDefault();
  }

  function onFocusOut() {
    _.delay(function() {
      _private.options.output.hide();
    }, 100);
  }

  function init(initInput, initOptions) {
    _private = {
      input: $(initInput),
      value: null,
      suggestions: [],
      selected: null,
      selectedIndex: null,
      firedFindCount: 0,
      lastRenderedFind: 0,
      options: _.defaults({}, initOptions, defaultOptions)
    };
    this._private = _private;

    // Dropdown mode
    if (_private.options.mode === 'dropdown') {
      initDropdownMode();
    }

    // Fulltext mode
    if (_private.options.mode === 'fulltext') {
      initFulltextMode();
    }

    // Disable native browser dropdown suggestion list
    _private.input.attr('autocomplete', 'off');

    _private.input.on('input', onInput);
  }

  function initDropdownMode() {
    _private.input.on('keydown', onKeyDown);
    _private.input.on('mousewheel', onMouseWheel);
    _private.input.on('focusout', onFocusOut);
    _private.input.on('focus', renderWrapper);

    // default suggestion wrapper if none set
    if (!_private.options.output) {
      _private.options.output = $('<div class="steppe-wrapper"></div>');
    }
    _private.input.after(_private.options.output.hide());
  }

  function initFulltextMode() {
    var output = _private.options.output;
    // an output element must be set
    if (!output || output.length === 0) {
      throw new TypeError('You must pass an \'output\' element when in fulltext mode');
    }
  }

  return {
    init: init
  };
})();
