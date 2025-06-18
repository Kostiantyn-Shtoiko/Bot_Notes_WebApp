# Bot_Notes_WebApp

Telegram mini-app for creating notes. Developed in Flask using Telegram WebApp API. Runs directly in Telegram as an interactive web page.

## 🔧 Features

- 📥 Adding notes
- ✏️ Editing
- ❌ Deleting
- 📱 Responsive interface for mobile devices
- 🔗 Integration with Telegram WebApp
  
## ⚙️ Technologies

- Python 3
- Flask
- SQLite
- HTML/CSS/JS
- Telegram WebApp API
- (Optional) Ngrok or self-hosting

## 📦 Installation

### 1. Cloning a repository

```bash
git clone [https://github.com/your-username/Bot_Notes_WebApp.git](https://github.com/Kostiantyn-Shtoiko/Bot_Notes_WebApp)
cd Bot_Notes_WebApp

2. Installing dependencies
pip install -r requirements.txt

3. (Optional) Run Ngrok to test Telegram WebApp
ngrok http 5000
And paste the received link into WEB_APP_URL in config.py file

4. Configuration settings
Create a config.py file:
TOKEN = "your_telegram_bot_token"
WEB_APP_URL = "https://your-app-url.com" # for example: https://example.com

5. Launching
python app.py
python main.py

Images
https://github.com/Kostiantyn-Shtoiko/Bot_Notes_WebApp/tree/master/photo

🧑‍💻 Author

💼 GitHub: https://github.com/Kostiantyn-Shtoiko

✉️ Telegram: @Kostiantyn_Shtoiko
