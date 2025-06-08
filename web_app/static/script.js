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

                const contentWrapper = document.createElement('div');
                contentWrapper.style.flex = '1';
                contentWrapper.style.display = 'flex';
                contentWrapper.style.alignItems = 'center';
                contentWrapper.style.gap = '10px';

                const textSpan = document.createElement('span');
                textSpan.textContent = note.text;

                const inputField = document.createElement('input');
                inputField.type = 'text';
                inputField.value = note.text;
                inputField.style.display = 'none';
                inputField.style.flex = '1';

                contentWrapper.appendChild(textSpan);
                contentWrapper.appendChild(inputField);

                const editBtn = document.createElement('button');
                editBtn.textContent = 'Edit';
                editBtn.style.backgroundColor = 'orange';

                editBtn.onclick = () => {
                    const isEditing = inputField.style.display === 'inline';

                    if (isEditing) {
                        const updatedText = inputField.value.trim();
                        if (updatedText !== '') {
                            updateNote(note.id, updatedText);
                        }
                    } else {
                        inputField.style.display = 'inline';
                        textSpan.style.display = 'none';
                        editBtn.textContent = 'Save';
                    }
                };

                const delBtn = document.createElement('button');
                delBtn.textContent = 'Delete';
                delBtn.style.backgroundColor = 'red';
                delBtn.onclick = () => deleteNote(note.id);

                li.style.gap = '10px';
                li.appendChild(contentWrapper);
                li.appendChild(editBtn);
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

// Update note by ID
function updateNote(id, text) {
    fetch(`/notes/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
    .then(() => {
        loadNotes();
    });
}
