// Description:
//   Obtiene info de despacho de un producto a través de Chilexpress
//
//  Dependencies:
//    cheerio
//    string
//
// Commands:
//   hubot chilexpress <CODIGO SEGUIMIENTO>
//
// Author:
//   @juanbrujo

var cheerio = require('cheerio');
var S       = require('string');

module.exports = function(robot) {
  robot.respond(/chilexpress\s?(.*)/i, function(msg) {

    var codigo = msg.match[1];
    var url = 'https://www.chilexpress.cl/Views/ChilexpressCL/Resultado-busqueda.aspx?DATA=' + codigo;

    msg.send(':mailbox_closed: buscando...');

    msg.robot.http(url).get()(function(err, res, body) {

      var $ = cheerio.load(body);

      if (res.statusCode !== 200 || body === 'ERROR') {
        return msg.reply('Ocurrió un error con la búsqueda');
      }

      var title = $('.search-results .wigdet-content ul > li > a > h4').text();
      var estado = $('.search-results .wigdet-content ul > li ul li').eq(3).text();

      if( $('.search-results .wigdet-content').length) { // existe
        msg.send('¡Encontré! ' + title + ': ' + estado);
      } else {
        msg.send('Orden no existe.');
      }
      
    });

  });
};
