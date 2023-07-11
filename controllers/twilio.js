import twilio from "twilio";
import dotenv from "dotenv";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendMessage = (req, res) => {
  const { num, message } = req.body;
  client.messages
    .create({
      body: message,
      from: "+12545565274",
      to: `+39${num}`,
    })
    .then((message) => console.log(message.sid));
  return res.json({ message: "ok" });
};
