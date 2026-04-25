const { onRequest } = require("firebase-functions/v2/https");
const nodemailer = require("nodemailer");
const validator = require("validator");
const cors = require("cors")({ origin: true }); // origin: true accetta tutti i domini

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

exports.sendContactMail = onRequest({ cors: true }, async (req, res) => {
  return cors(req, res, async () => {
    if (req.method !== "POST")
      return res.status(405).send("METHOD NOT ALLOWED");

    try {
      console.log("REQ BODY:", req.body);

      const { name, email, subject, message } = req.body || {};

      if (!email || !validator.isEmail(email)) {
        return res.status(400).send("INVALID EMAIL");
      }

      const result = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: subject || "Nessun oggetto",
        text: message || "",
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

      console.log("EMAIL SENT:", result);
      return res.status(200).send("OK");
    } catch (err) {
      console.error("FATAL ERROR:", err);
      return res.status(500).send(err.message || "ERROR");
    }
  });
});
