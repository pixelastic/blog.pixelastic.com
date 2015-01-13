window.Steppe = (function() {
  var $ = Zepto || jQuery;
  var _private;
  var defaultOptions = {
    find: function(input, callback) {
      callback();
    },
    render: function(suggestion) {
      return '<div class="steppe-suggestion">' + suggestion + '</div>';
    },
    val: function(suggestion) {
      return suggestion.toString();
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
      _private.suggestionWrapper.show();
    } else {
      _private.suggestionWrapper.hide();
    }
  }

  function displaySuggestions(userSuggestions) {
    _private.suggestions = userSuggestions;

    var content = _.map(userSuggestions, _private.options.render).join('');
    _private.suggestionWrapper.html(content);
    renderWrapper();
  }

  function selectNextSuggestion() {
    var currentSelectedIndex = _private.selectedIndex;
    if (currentSelectedIndex === null) {
      currentSelectedIndex = 0;
    } else {
      currentSelectedIndex++;
    }
    selectSuggestion(currentSelectedIndex);
  }

  function selectPreviousSuggestion() {
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

    var children = _private.suggestionWrapper.children();
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
    _private.options.find(_private.value, displaySuggestions);
  }

  function onKeyDown(event) {
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
    _private.suggestionWrapper.hide();
  }

  function init(initInput, initOptions) {
    _private = {
      input: $(initInput),
      value: null,
      suggestions: [],
      selected: null,
      selectedIndex: null,
      options: _.defaults({}, initOptions, defaultOptions),
      suggestionWrapper: $('<div class="steppe-wrapper"></div>')
    };
    this._private = _private;

    // Disable native browser dropdown suggestion list
    _private.input.attr('autocomplete', 'off');

    _private.input.on('input', onInput);
    _private.input.on('keydown', onKeyDown);
    _private.input.on('mousewheel', onMouseWheel);
    _private.input.on('focusout', onFocusOut);
    _private.input.on('focus', renderWrapper);

    _private.input.after(_private.suggestionWrapper.hide());
  }

  return {
    init: init
  };
})();
