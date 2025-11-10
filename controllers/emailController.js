// controllers/emailController.js
const pool = require('../config/db.js');
const transporter = require('../config/mailer.js');

// Email küldés ügyfélnek
const sendEmailToUser = async (req, res) => {
  const { userId, subject, message } = req.body;

  if (!userId || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      error: "Hiányzó adatok: userId, subject vagy message" 
    });
  }

  try {
    // Ügyfél email címének lekérése a USEREK táblából
    const [users] = await pool.execute(
      'SELECT EMAIL, NEV FROM userek WHERE ID_USER = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: "Ügyfél nem található" 
      });
    }

    const user = users[0];
    const userEmail = user.EMAIL;
    const userName = user.NEV;

    // Email összeállítása
    const mailOptions = {
      from: process.env.FROM_DEFAULT,
      to: userEmail,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: #0078d7; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .message { background: white; padding: 20px; border-radius: 5px; border-left: 4px solid #0078d7; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Procomp Szerviz</h1>
          </div>
          <div class="content">
            <h2>Tisztelt ${userName}!</h2>
            <div class="message">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div class="footer">
            <p>© 2024 Procomp Szerviz Rendszer. Minden jog fenntartva.</p>
            <p>Ez egy automatikus üzenet, kérjük ne válaszoljon rá.</p>
          </div>
        </body>
        </html>
      `,
      text: message
    };

    // Email küldése
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email elküldve: ${userEmail} - ${subject}`);
    
    // Naplózás
    await pool.execute(
      'INSERT INTO naplo (USER, COMMENT, URL, SQLX) VALUES (?, ?, ?, ?)',
      ['admin', 'email_küldés', '/api/admin/send-email', `Email küldés: ${userEmail} - ${subject}`]
    );

    res.json({
      success: true,
      message: `Email sikeresen elküldve: ${userEmail}`,
      messageId: info.messageId
    });

  } catch (error) {
    console.error('❌ Email küldési hiba:', error);
    res.status(500).json({
      success: false,
      error: "Email küldési hiba: " + error.message
    });
  }
};

module.exports = { sendEmailToUser };