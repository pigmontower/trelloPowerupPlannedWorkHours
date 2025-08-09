/*
  Trello Power-Up: Show "予定工数" custom field as a card badge.
  - Capabilities required: card-badges
  - No buttons or settings UIs are implemented.
*/

(function () {
  'use strict';

  var ICON_PATH = './images/clock.svg';
  var TARGET_CUSTOM_FIELD_NAME = '予定工数';

  /**
   * Resolve the numeric hours from a customFieldItem.
   */
  function parseHoursFromCustomFieldItem(customFieldItem) {
    if (!customFieldItem || !customFieldItem.value) return null;
    var value = customFieldItem.value;
    // Trello custom field values are strings even for number types
    if (value.number != null) {
      var n = parseFloat(value.number);
      return isNaN(n) ? null : n;
    }
    if (value.text != null) {
      var t = parseFloat(value.text);
      return isNaN(t) ? null : t;
    }
    return null;
  }

  /**
   * Build a badge object from hours.
   */
  function buildHoursBadge(hours) {
    return {
      text: hours + 'h',
      icon: ICON_PATH,
      color: 'blue'
    };
  }

  window.TrelloPowerUp.initialize(
    {
      'card-badges': function (t, opts) {
        // Strategy:
        // 1) Get card customFieldItems and board customFields definitions
        // 2) Locate the custom field definition named "予定工数"
        // 3) Find the corresponding item on the card and display as hours badge
        return Promise.all([
          t.card('id', 'name', 'customFieldItems'),
          t.board('id', 'name', 'customFields')
        ]).then(function (results) {
          var card = results[0] || {};
          var board = results[1] || {};
          var customFieldItems = card.customFieldItems || [];
          var customFields = board.customFields || [];

          // Find the custom field definition with the target name
          var estimateFieldDef = null;
          for (var i = 0; i < customFields.length; i++) {
            var f = customFields[i];
            if (f && f.name === TARGET_CUSTOM_FIELD_NAME) {
              estimateFieldDef = f;
              break;
            }
          }

          if (!estimateFieldDef) {
            return [];
          }

          // Find the item on this card for that custom field definition
          var estimateItem = null;
          for (var j = 0; j < customFieldItems.length; j++) {
            var it = customFieldItems[j];
            if (it && it.idCustomField === estimateFieldDef.id) {
              estimateItem = it;
              break;
            }
          }

          var hours = parseHoursFromCustomFieldItem(estimateItem);
          if (hours != null && hours > 0) {
            return [buildHoursBadge(hours)];
          }
          return [];
        });
      }
    },
    {
      // Helpful when debugging failures in development
      helpfulStacks: true
    }
  );
})();

window.TrelloPowerUp.initialize({
  // カードバッジの表示
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'estimatedHours')
      .then(function(estimatedHours) {
        if (estimatedHours && estimatedHours > 0) {
          return [{
            text: `${estimatedHours}h`,
            icon: './images/clock.svg',
            color: 'blue'
          }];
        }
        return [];
      });
  },

  // カードボタンの表示
  'card-buttons': function(t, options) {
    return [{
      icon: './images/clock.svg',
      text: '予定工数設定',
      callback: function(t) {
        return t.modal({
          title: '予定工数設定',
          url: './settings.html',
          height: 200
        });
      }
    }];
  },

  // 設定画面の表示
  'show-settings': function(t, options) {
    return t.modal({
      title: '予定工数Power-Up設定',
      url: './settings.html',
      height: 300
    });
  }
}); 