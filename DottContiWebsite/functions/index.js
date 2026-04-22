const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

// Configura il trasporto (Gmail)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "TUA_EMAIL@gmail.com",
    pass: "PASSWORD_APP",
  },
});

exports.sendContactMail = functions.https.onRequest(async (req, res) => {
  // Permetti richieste da browser (CORS base)
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");

  if (req.method !== "POST") {
    return res.status(405).send("Metodo non consentito");
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).send("Dati mancanti");
  }

  try {
    await transporter.sendMail({
      from: "dott.enricocontiurologo@gmail.com",
      to: "dott.enricocontiurologo@gmail.com", // mail fissa
      subject: `Messaggio da www.enricoconti.it : ${subject}`,
      text: `Nome: ${name}\nEmail: ${email}\nMessaggio: ${message}`,
      html: `
             <div style="font-family: Arial, sans-serif; background:#274760; ;">
                <div style=" margin:0 ; background: radial-gradient(59.95% 42.35% at 70.78% 50%, rgba(134, 187, 241, 0.38) 0%, rgba(134, 187, 241, 0) 100%); border-radius:8px; ">
                    <div style=" padding:40px;">
                        <h2 style="color:white; margin-bottom:20px;">
                            Nuovo messaggio da ${name}
                        </h2>

                        <p style="color:white;">
                            ${email}
                        </p>

                        <div style="margin-top:20px;color:white;">
                            <p><strong>Messaggio:</strong></p>
                            <div style="background:#f9f9f9; padding:15px; border-radius:6px;">
                                ${message}
                            </div>
                        </div>

                        <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />

                        <p style="font-size:12px; color:#888;">
                        Email inviata automaticamente da www.enricoconti.it
                        </p>
                    </div>
                </div>
            </div>
            `,
    });

    return res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Errore invio mail");
  }
});
