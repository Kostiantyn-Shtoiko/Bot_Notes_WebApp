from flask import Blueprint, render_template, request, jsonify
import database

# Create blueprint
notes_bp = Blueprint('notes', __name__)

# Serve the main page
@notes_bp.route('/')
def index():
    return render_template('index.html')

# Get all notes
@notes_bp.route('/notes', methods=['GET'])
def get_notes():
    notes = database.get_all_notes()
    return jsonify(notes)

# Add new note
@notes_bp.route('/notes', methods=['POST'])
def add_note():
    data = request.get_json()
    text = data.get('text')
    if text:
        database.add_note(text)
        return jsonify({'status': 'success'})
    return jsonify({'status': 'error', 'message': 'Empty note'}), 400

# Delete note by ID
@notes_bp.route('/notes/<int:note_id>', methods=['DELETE'])
def delete_note(note_id):
    database.delete_note(note_id)
    return jsonify({'status': 'deleted'})