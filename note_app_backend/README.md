```markdown
# Note-Taking App - Backend

This is the backend for the Note-Taking app, built with Python Flask and SQLAlchemy.

## Features
- User authentication (login and register)
- CRUD operations for notes (Create, Read, Update, Delete)
- Pin and search notes
- JWT-based authentication for secure access

## Technology Stack
- **Flask**: Python microframework for the backend
- **SQLAlchemy**: ORM for database interactions
- **Flask-JWT-Extended**: For handling JWT-based authentication
- **Flask-CORS**: For enabling Cross-Origin Resource Sharing

## Getting Started

### Prerequisites
- Python
- Flask
- SQLAlchemy
- A virtual environment (recommended)

### Installation

Clone the repository:
   ```bash
   git clone https://github.com/logmar98/note-taking-app.git
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   flask run
   ```

### API Endpoints:
-POST /api/auth/register: Register a new user
-POST /api/auth/login: Log in a user
-POST /api/notes: Create a new note
-GET /api/notes: Fetch all notes
-PUT /api/notes/:id: Edit a note
-DELETE /api/notes/:id: Delete a note