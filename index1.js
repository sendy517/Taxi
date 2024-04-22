const http = require('http');
const url = require('url');
const { getClient } = require('./get-client');

// Это наша основная функция, которая обрабатывает обслуживание HTTP-запросов
(async () => {
  const client = await getClient(); // Как и в наших предыдущих примерах, нам нужен клиент базы данных.
  await setupTable(client);  // Убедитесь, что наша таблица базы данных настроена правильно.

  const server = http.createServer(); // Инициализация HTTP-сервера
  const address = { port: 8080, host: '0.0.0.0' };

   // функция обработчика запросов: каждый запрос к HTTP-серверу будет обрабатываться здесь
  let requestHandler = async function (req, res) {
 // Служебная функция, помогающая возвращать ответ в формате json и вести журнал запросов, мы также можем указать статус HTTP
 // приведенный здесь код позволяет сигнализировать об успешном выполнении запроса или дает подсказку, почему он не удался
    const jsonResponse = (responseObject, responseCode = 200) => {
      res.writeHead(responseCode, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responseObject));

      console.log(new Date(), '-- Handled request:', req.method, req.url, responseCode);
    };

    const requestUrl = new URL(req.url, 'http://localhost:8080'); // Разберем URL, с которого пришел запрос.
    const name = requestUrl.searchParams.get('name') ?? 'john'; // В основном нам нужен URL-адрес, чтобы проверить, было ли передано конкретное имя в качестве строки запроса

     // Здесь мы настраиваем простую маршрутизацию запроса, в зависимости от того, какой путь к URL-адресу был указан, мы обрабатываем запрос по-разному.
    try {
      if (requestUrl.pathname === '' || requestUrl.pathname === '/') {
         // URL-путь по умолчанию - мы запрашиваем все записи в нашей таблице без фильтрации
        const entries = await client.query('SELECT * FROM my_table;');
        jsonResponse(entries.rows);
      } else if (requestUrl.pathname === '/read') {
         // Читаем URL-путь - фильтруем по имени, которое было указано в строке запроса
        const entries = await client.query('SELECT * FROM my_table WHERE name = $1;', [name]);
        jsonResponse(entries.rows);
      } else if (requestUrl.pathname === '/add') {
        // Добавить URL-путь - в базу данных будет вставлена новая запись с указанным именем.
        let insertRow = await client.query('INSERT INTO my_table(name) VALUES($1);', [`${name}`]);
        jsonResponse({ success: true, message: `Inserted ${insertRow.rowCount} row with name '${name}'` });
      } else {
        // Если ни один из известных нам путей не будет возвращен, мы выдадим стандартный ответ "Не найден" с кодом HTTP-ответа 404
        jsonResponse("The requested route doesn't exist :(", 404);
      }
    } catch (e) {
 // Если во время обработки запроса происходит сбой, мы корректно устраняем ошибку, отправляя стандартный ответ
  // HTTP-код ответа 500, который расшифровывается как "Внутренняя ошибка сервера".
      jsonResponse(`Some error happened :(( -- (error: ${e.message})`, 500);
    }
  };
  server.on('request', requestHandler); // Здесь мы назначаем наш ранее определенный обработчик запросов экземпляру нашего сервера

  server.listen(address.port, address.host); // Заключительный шаг: запуск сервера и ожидание запросов.
  console.log(`Listening on: http://${address.host}:${address.port}`); // Введите URL-адрес в вашем браузере и проверьте, обработан ли запрос.
})();

async function setupTable(client) {  // Функция с той же функциональностью, что и в 'setup-table.js ' файл

  let createTableQuery = `
    CREATE TABLE IF NOT EXISTS my_table(
      id BIGSERIAL PRIMARY KEY NOT NULL ,
      name varchar,
      date TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
  `;
  return await client.query(createTableQuery);
}
