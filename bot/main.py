from telegram import Update, ReplyKeyboardMarkup, KeyboardButton, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes
from config import BOT_TOKEN, WEBAPP_URL

# Start command handler
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [
        [KeyboardButton(text="Open Notes", web_app=WebAppInfo(url=WEBAPP_URL))]
    ]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    await update.message.reply_text("Welcome! Tap the button below to open notes:", reply_markup=reply_markup)

# Init bot
def main():
    app = Application.builder().token(BOT_TOKEN).build()

    # Register /start handler
    app.add_handler(CommandHandler("start", start))

    # Run bot
    app.run_polling()

if __name__ == '__main__':
    main()
