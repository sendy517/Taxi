const { getClient } = require('./get-client');

(async () => {
  const client = await getClient();
  const id = process.argv[2] ?? '2';
  const phone = process.argv[3] ?? '1234567890'; // Добавлены другие аргументы по мере необходимости
  const first_name = process.argv[4] ?? 'Денис';
  const last_name = process.argv[5] ?? 'Назаркин';
  const middle_name = process.argv[6] ?? 'Романович';
  const user_type = process.argv[7] ?? '2';
  const birthday = process.argv[8] ?? '2000-01-01';
  try {
    const insertRow = await client.query(
      'INSERT INTO "users" (id, phone, first_name, last_name, middle_name, user_type, birthday) VALUES ($1, $2, $3, $4, $5, $6, $7);',
      [id, phone, first_name, last_name, middle_name, user_type, birthday]
    );
    console.log(`Inserted ${insertRow.rowCount} row`);
  } catch (error) {
    console.error('Error inserting row:', error);
  } finally {
    await client.end();
  }
})();