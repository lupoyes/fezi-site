# Fezi Site - Restaurant Menu Application

A full-stack restaurant menu application built with Django REST Framework and Next.js, containerized with Docker.

## 🏗️ Architecture

- **Backend**: Django REST Framework + PostgreSQL
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose

## 🚀 Quick Start

### Prerequisites

- Docker Desktop
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd fezi-site
   ```

2. **Create environment files**
   ```bash
   # Copy example files and update with your values
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env.local
   cp .env.example .env
   ```

3. **Start the application**
   ```bash
   docker-compose up --build
   ```

4. **Run initial database setup**
   ```bash
   # Create and run migrations
   docker-compose run --rm backend python manage.py makemigrations
   docker-compose run --rm backend python manage.py migrate
   
   # Create superuser (optional)
   docker-compose run --rm backend python manage.py createsuperuser
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/
- **Database**: localhost:5432

## 📁 Project Structure

```
fezi-site/
├── backend/                 # Django REST API
│   ├── core/               # Django project settings
│   ├── api/                # API app (models, views, serializers)
│   ├── media/              # User uploaded files
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile         # Backend container config
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js 13+ app directory
│   │   └── components/    # React components
│   ├── package.json       # Node.js dependencies
│   └── Dockerfile         # Frontend container config
├── docker-compose.yml      # Development setup
├── docker-compose.prod.yml # Production setup
└── README.md
```

## 🛠️ Development

### Backend Commands

```bash
# Django shell
docker-compose exec backend python manage.py shell

# Create migrations
docker-compose run --rm backend python manage.py makemigrations

# Apply migrations
docker-compose run --rm backend python manage.py migrate

# Collect static files
docker-compose run --rm backend python manage.py collectstatic
```

### Frontend Commands

```bash
# Install new packages
docker-compose exec frontend npm install <package-name>

# Run tests
docker-compose exec frontend npm test

# Build for production
docker-compose exec frontend npm run build
```

### Database Management

```bash
# Access PostgreSQL directly
docker-compose exec db psql -U postgres -d fezi_db

# Backup database
docker-compose exec db pg_dump -U postgres fezi_db > backup.sql

# Restore database
docker-compose exec -T db psql -U postgres fezi_db < backup.sql
```

## 🚀 Production Deployment

```bash
# Build and run production containers
docker-compose -f docker-compose.prod.yml up --build -d

# Apply migrations in production
docker-compose -f docker-compose.prod.yml exec backend python manage.py migrate

# Collect static files
docker-compose -f docker-compose.prod.yml exec backend python manage.py collectstatic --noinput
```

## 📝 Environment Variables

### Backend (.env)
- `DEBUG`: Development mode (1 for development, 0 for production)
- `SECRET_KEY`: Django secret key
- `DATABASE_URL`: PostgreSQL connection string
- `ALLOWED_HOSTS`: Allowed hostnames
- `CORS_ALLOWED_ORIGINS`: Frontend URLs for CORS

### Frontend (.env.local)
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NODE_ENV`: Environment mode

## 🔧 API Documentation

The API provides endpoints for managing menu items:

- `GET /api/menu-item/`: List menu items with filtering
- `GET /api/menu-item/pages/`: Get pagination info
- `POST /api/menu-item/`: Create new menu item (admin only)
- `PUT /api/menu-item/{id}/`: Update menu item (admin only)
- `DELETE /api/menu-item/{id}/`: Delete menu item (admin only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

**Frontend can't connect to backend:**
- Check that `NEXT_PUBLIC_API_URL` uses `http://backend:8000` in Docker
- Ensure both containers are running: `docker-compose ps`

**Database connection errors:**
- Wait for database to be ready: `docker-compose logs db`
- Check environment variables in `.env` files

**Images not displaying:**
- Check media files are being served: `curl http://localhost:8000/media/`
- Verify media volume mount in docker-compose.yml

For more help, check the logs:
```bash
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```