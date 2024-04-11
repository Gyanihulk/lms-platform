// Import the necessary library and types
import TelegramBot from 'node-telegram-bot-api';

// Replace with your bot token from the environment variables
const token: string | undefined = process.env.TELEGRAM_BOT;

// Check if token is not undefined
if (!token) {
  throw new Error('TELEGRAM_BOT token is not defined in your environment variables');
}

// Initialize the Telegram bot with polling enabled
const bot: TelegramBot = new TelegramBot(token, { polling: true });

// Function to send a message using the bot
const sendMessage = async (message: string, chatId: number): Promise<void> => {
  try {
    await bot.sendMessage(chatId, message);
    console.log('Message sent!');
  } catch (error) {
    console.error('Error sending message:', error);
  }
};


bot.getMe().then((botInfo:any) => {
  console.log('Bot username:', botInfo.username);
});

// Listen for incoming messages and respond
bot.on('message', (msg:any) => {
  console.log('Your chat ID:', msg.chat.id);

});


// Export the sendMessage function to be used elsewhere
export { sendMessage ,bot};
