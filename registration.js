import express from 'express';
import bodyParser from 'body-parser';
import pkg from 'pg';

const { Pool } = pkg; // Importing the entire module and accessing Pool from it

// Получение пути к файлу "registration.js" через относительный путь
const scriptPath = 'registration.js';
const app = express();
const port = 3000;

// Подключение к базе данных PostgreSQL
const pool = new Pool({
    user: 'senid517',
    host: '77.221.143.210',
    database: 'taxi',
    password: 'xyi1234',
    port: 5433,
});

// Middleware для парсинга данных из тела запроса
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Обработчик POST-запроса для регистрации нового пользователя
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Хеширование пароля (подключи bcrypt или другую библиотеку для хеширования)
        const hashedPassword = hashFunction(password);

        // Вставка данных пользователя в базу данных
        const query = 'INSERT INTO users (first_name, phone, hashed_password) VALUES ($1, $2, $3)';
        const values = [username, email, hashedPassword];
        await pool.query(query, values);

        res.status(201).send('Пользователь успешно зарегистрирован');
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).send('Что-то пошло не так');
    }
});


// Обработчик GET запроса для файла JavaScript
app.get('/registration.js', (req, res) => {
    res.sendFile('D:/TAXI/registration.js'); // Отправляем файл JavaScript
});

// Middleware для обслуживания статических файлов из каталога "public"
app.use(express.static('public'));
// Обработчик GET запроса на страницу регистрации
app.get('/register', (req, res) => {
    res.sendFile('registration.html', { root: './' }); // Отправляем HTML файл с формой регистрации
});




// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});


document.getElementById('registrationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    // Получаем данные из формы
    const formData = new FormData(event.target);
    const formDataObject = {};
    formData.forEach((value, key) => {
        formDataObject[key] = value;
    });

    // Отправляем данные на сервер
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formDataObject)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Успешно:', data);
        } else {
            console.error('Ошибка при регистрации:', response.statusText);
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
});



