self.addEventListener('notificationclick', function(event) {
  console.log('messaging-sw');
  const target = event.notification.data.click_action || '/';
  event.notification.close();

  // этот код должен проверять список открытых вкладок и переключатся на открытую
  // вкладку с ссылкой если такая есть, иначе открывает новую вкладку
  event.waitUntil(clients.matchAll({
                                     type: 'window',
                                     includeUncontrolled: true
                                   }).then(function(clientList) {
    // clientList почему-то всегда пуст!?
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == target && 'focus' in client) {
        return client.focus();
      }
    }

    // Открываем новое окно
    return clients.openWindow(target);
  }));
});