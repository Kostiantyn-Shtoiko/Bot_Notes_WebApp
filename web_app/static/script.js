// Fetch and render all notes on page load
window.onload = () => {
    loadNotes();
};

// Load notes from server
function loadNotes() {
    fetch('/notes')
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById('notesList');
            list.innerHTML = ''; // Clear existing list

            data.forEach(note => {
                const li = document.createElement('li');
                li.textContent = note.text;

                const delBtn = document.createElement('button');
                delBtn.textContent = 'Delete';
                delBtn.onclick = () => deleteNote(note.id);

                li.appendChild(delBtn);
                list.appendChild(li);
            });
        });
}

// Add new note
function addNote() {
    const input = document.getElementById('noteInput');
    const text = input.value.trim();

    if (text === '') return;

    fetch('/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
    .then(res => res.json())
    .then(data => {
        console.log('Server response::', data);
        if (data.status === 'success') {
            input.value = '';
            loadNotes();
        } else {
            alert('Error adding note: ' + data.message);
        }
    });
}

// Delete note by ID
function deleteNote(id) {
    fetch(`/notes/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        loadNotes();
    });
}
