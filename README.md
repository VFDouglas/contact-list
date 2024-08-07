# Contact List
Basic contact list made with Laravel, React and Docker

Installation guide:

Clone the project
```
git clone https://github.com/VFDouglas/contact-list.git
```
Enter the project:
```
cd contact-list
```
Create a `.env` file, but only if you're in a new project:
```
cp .env.example .env
```
Run the commands:
```
docker compose up --build -d
docker compose exec php composer install && php artisan key:generate
docker compose exec php npm install && npm run dev
```

You can access the app containers with the command:
```
# In this case PHP is the service name specified in the compose.yml file
docker compose exec php sh
```
Access the app in http://localhost:8080.
