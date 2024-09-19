# Note-Taking App

This is a full-stack note-taking application built with React for the frontend and Python Flask for the backend. Users can register, log in, and manage notes with features like create, edit, delete, pin, and search.

## Features
- **User Authentication**: Secure registration and login
- **Note Management**: Create, edit, delete, and pin notes
- **Search**: Search for notes by keywords
- **Responsive Design**: Fully functional across different screen sizes

## Technology Stack
### Frontend:
- **React**: Frontend library for building the user interface
- **Axios**: For making API requests
- **React Router**: For navigation
- **CSS**: For styling

### Backend:
- **Flask**: Python backend framework
- **SQLAlchemy**: ORM for database management
- **Flask-JWT-Extended**: For authentication using JWT

## Installation
### Frontend:

Clone the repository:
   ```bash
   git clone https://github.com/logmar98/notetaking.git
   cd note_app_frontend
   npm install
   npm start
   ```

### Backend:

Clone the repository:
   ```bash
   git clone https://github.com/logmar98/notetaking.git
   cd note_app_backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   flask run
   ```