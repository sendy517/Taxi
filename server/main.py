import psycopg2
from dotenv import load_dotenv
import os

# Загрузка переменных окружения из файла .env
dotenv_path = os.path.join(os.path.dirname(__file__), 'connection.env')
load_dotenv(dotenv_path)

# Подключение к базе данных
try:
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        dbname=os.getenv("DB_NAME"),
        port=os.getenv("DB_PORT")
    )


    # Создание курсора
    cur = conn.cursor()

    # Выполнение SQL-запроса для получения версии сервера
    cur.execute("SELECT version();")

    # Получение результата
    version = cur.fetchone()
    print("Подключение к серверу успешно. Версия сервера PostgreSQL:", version[0])

    # Закрытие курсора и подключения
    cur.close()
except psycopg2.OperationalError as e:
    print(f"Ошибка при подключении к базе данных: {e}")
finally:
    if conn:
        conn.close()