// Description:
//   Obtiene info de despacho de un producto a través de Chilexpress
//
//  Dependencies:
//    chilexpress
//
// Commands:
//   hubot chilexpress <CODIGO SEGUIMIENTO>
//
// Author:
//   @juanbrujo

var chilexpress = require('chilexpress');

module.exports = function(robot) {
  robot.respond(/chilexpress\s?(.*)/i, function(msg) {

    var codigo = msg.match[1];
    msg.send(':mailbox_closed: buscando...');
    chilexpress(codigo).then(function(data) {
  
      var title = data.shipping.product;
      if (data.history.length > 0) title = data.history[0].activity
      if( $('.search-results .wigdet-content').length) { // existe
        msg.send('¡Encontré! ' + title + ': ' + data.status);
      } else {
        msg.send('Orden no existe.');
      }
  
    }).catch(function(err) {
      robot.emit('error', err);
      return msg.reply('Ocurrió un error con la búsqueda');
    });
  
  });
};
