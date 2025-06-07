from flask import Flask
import database

app = Flask(__name__)
database.init_db()


from handlers import notes_bp
app.register_blueprint(notes_bp)

if __name__ == '__main__':
    app.run(port=5000)
