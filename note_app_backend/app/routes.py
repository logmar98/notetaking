from flask import jsonify, request
from app import app, db
from app.models import User, Note
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = generate_password_hash(data['password'])
    new_user = User(username=username, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    if user and check_password_hash(user.password, data['password']):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token)
    return jsonify({"message": "Invalid credentials"}), 401

@app.route('/notes', methods=['GET', 'POST'])
@jwt_required()
def manage_notes():
    if request.method == 'POST':
        data = request.get_json()
        user_id = get_jwt_identity()
        new_note = Note(title=data['title'], content=data['content'], hashtags=data.get('hashtags'), pinned=data.get('pinned', False), user_id=user_id)
        db.session.add(new_note)
        db.session.commit()
        return jsonify({"message": "Note added successfully"})

    user_id = get_jwt_identity()
    notes = Note.query.filter_by(user_id=user_id).order_by(Note.pinned.desc(), Note.timestamp.desc()).all()
    return jsonify([{"id": note.id, "title": note.title, "content": note.content, "hashtags": note.hashtags, "pinned": note.pinned} for note in notes])

@app.route('/notes/<int:note_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def update_delete_note(note_id):
    note = Note.query.get_or_404(note_id)
    user_id = get_jwt_identity()
    if note.user_id != user_id:
        return jsonify({"message": "Unauthorized"}), 403

    if request.method == 'PUT': 
        data = request.get_json()
        note.title = data['title']
        note.content = data['content']
        note.hashtags = data.get('hashtags')
        note.pinned = data.get('pinned', note.pinned)
        db.session.commit()
        return jsonify({"message": "Note updated successfully"})
    

    db.session.delete(note)
    db.session.commit()
    return jsonify({"message": "Note deleted successfully"})
