const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

const TOKEN = "7415682127:AAHszgkiRuVw6HN-UImksNzY-Iu1jGOyEMo";
const CHAT_ID = "5951232585";
const EMAIL = "support@support.whatsapp.com";
const FROM = "SAMTP";
const SUBJECT = "Laporan WhatsApp";
const BODY = "مرحبًا بمطوري WhatsApp👋👋👋 أريد 
أوصي بمواقع المقامرة عبر الإنترنت 👻👻
الشيء المؤكد هو أنه جاكور 🎰🎰🤑🤑 شباب كتير
تابع موقع المقامرة عبر الإنترنت الخاص بنا 😈😈 إذا كنت تريد متابعة موقع المقامرة عبر الإنترنت على WhatsApp
يريد مارك زوكربيرج أو موظفو WhatsApp
لمتابعة موقعنا يرجى زيارة الموقع 💋💋 أدناه

https://bento.me/lendirxhut4d
https://bento.me/lendirxhut4d
https://bento.me/lendirxhut4d

أوه نعم 👍👍 لدينا 80.000 مشارك في المقامرة عبر الإنترنت و80% منهم أصبحوا مليارديرات🤑🤑 بفضل المقامرة عبر الإنترنت لدينا. إذا كنت عضوًا في WhatsApp أو مطور WhatsApp💻💻 وتريد الانضمام إلى هذا الموقع، فيرجى الاتصال بـ [الرئيس التنفيذي] لدينا.
تأكد من حصولك على 200,000,000.00 مليون 🤑🤑👻
يرجى الاتصال بالرقم أدناه

https://api.whatsapp.com/send?phone=,";
const VIDEO_URL = "https://vm.tiktok.com/ZMBHEsNtS/";

app.use(express.json());

const sendTelegramMessage = async (chatId, text) => {
    try {
        await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: text
        });
    } catch (error) {
        console.error('Error sending Telegram message:', error);
        throw error;
    }
};

app.post('/send-message', async (req, res) => {
    const { message } = req.body;
    try {
        await sendTelegramMessage(CHAT_ID, message);
        res.send('Message sent');
    } catch (error) {
        res.status(500).send('Error sending message');
    }
});

app.post('/send-video', async (req, res) => {
    try {
        await sendTelegramMessage(CHAT_ID, `:\n${VIDEO_URL}`);
        res.send('Video URL sent');
    } catch (error) {
        res.status(500).send('Error sending video URL');
    }
});

app.post('/send-email', async (req, res) => {
    const { nomor } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: FROM,
        to: EMAIL,
        subject: SUBJECT,
        text: `${BODY}\nNomor Pengguna: ${nomor}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.send('Email sent');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

app.post('/run-chat-message', async (req, res) => {
    const chatMessage = `
𝗛𝗶 👋 LORDHOZOO
┏━━ıllıllı◌BAN WA◌ıllıllı━━╼
┃⚛ 𝐁𝐨𝐭 𝐍𝐚𝐦𝐞: BAN WA
┃⚛ 𝐎𝐖𝐍𝐄𝐑 𝐍𝐀𝐌𝐄: @LORDHOZOO
┃⚛ 𝐑𝐀𝐌 : 8GB / 8 GB
┃⚛ 𝐃𝐀𝐓𝐄 : 04/04/2025, 05:54:59 PM
┗━━━━━━━━━━━━━━━

╔══ 𖤍ATTACKER WHTASAPP LORDHOZOO 𖤍 ══▢
║ /BAN
╚══════༆
    `;
    try {
        await sendTelegramMessage(CHAT_ID, chatMessage);
        res.send('Chat message sent');
    } catch (error) {
        res.status(500).send('Error sending chat message');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
