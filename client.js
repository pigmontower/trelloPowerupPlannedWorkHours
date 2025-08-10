/*
  Trello Power-Up: Smoke test
  - Shows a simple TEST badge on cards
  - Shows an OK badge in card detail
*/
(function () {
  'use strict';
  window.TrelloPowerUp.initialize({
    'card-badges': function (_t) {
      return [{ text: 'TEST', color: 'blue' }];
    },
    'card-detail-badges': function (_t) {
      return [{ title: 'Power‑Up動作確認', text: 'OK', color: 'blue' }];
    }
  });
})();