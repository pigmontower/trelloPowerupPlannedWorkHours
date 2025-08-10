/*
  Trello Power-Up: Show "予定工数" custom field as a card badge.
  - Capabilities required: card-badges
  - No buttons or settings UIs are implemented.
*/

(function () {
  'use strict';

  var DEBUG = true; // 必要に応じて false に
  var ICON_PATH = 'https://pigmontower.github.io/trelloPowerupPlannedWorkHours/images/clock.svg';
  var TARGET_CUSTOM_FIELD_NAME = '予定工数';

  /**
   * Resolve the numeric hours from a customFieldItem.
   */
  function parseHoursFromCustomFieldItem(customFieldItem) {
    if (!customFieldItem || !customFieldItem.value) return null;
    var v = customFieldItem.value;
    // Trello custom field values are strings even for number types
    if (v.number != null) {
      var n = parseFloat(v.number);
      return isNaN(n) ? null : n;
    }
    if (v.text != null) {
      var t = parseFloat(v.text);
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
      'card-badges': function (t) {
        return Promise.all([
          t.card('id', 'name', 'customFieldItems'),
          t.board('id', 'name', 'customFields')
        ]).then(function ([card, board]) {
          var items = (card && card.customFieldItems) || [];
          var defs = (board && board.customFields) || [];

          // 1) 定義名「予定工数」と一致するフィールドを優先
          var estimateDef = defs.find(function (f) {
            return f && (f.name === TARGET_CUSTOM_FIELD_NAME || (f.name && f.name.trim() === TARGET_CUSTOM_FIELD_NAME));
          });

          var item = null;
          if (estimateDef) {
            item = items.find(function (it) { return it && it.idCustomField === estimateDef.id; });
          }

          // 2) 見つからない場合、数値として解釈できる最初のカスタムフィールドをフォールバック採用
          if (!item) {
            for (var i = 0; i < items.length; i++) {
              var h = parseHoursFromCustomFieldItem(items[i]);
              if (h != null && h > 0) { item = items[i]; break; }
            }
          }

          var hours = parseHoursFromCustomFieldItem(item);

          if (DEBUG) {
            // DevTools で Power-Up iframe（コンソール右上のコンテキスト選択で origin: pigmontower.github.io）を選んでログ確認
            console.log('[予定工数 badge dbg]', {
              card, defsCount: defs.length, itemsCount: items.length,
              estimateDef, chosenItem: item, hours
            });
          }

          return (hours != null && hours > 0) ? [buildHoursBadge(hours)] : [];
        });
      }
    },
    { helpfulStacks: true }
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