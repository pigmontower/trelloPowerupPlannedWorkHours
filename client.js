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