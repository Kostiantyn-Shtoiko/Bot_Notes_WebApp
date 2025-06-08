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

# Update note by ID
@notes_bp.route('/notes/<int:note_id>', methods=['PUT'])
def update_note(note_id):
    data = request.get_json()
    new_text = data.get('text', '').strip()

    if not new_text:
        return jsonify({'status': 'error', 'message': 'Text is required'}), 400

    success = database.update_note(note_id, new_text)
    if success:
        return jsonify({'status': 'success'})
    else:
        return jsonify({'status': 'error', 'message': 'Note not found'}), 404
