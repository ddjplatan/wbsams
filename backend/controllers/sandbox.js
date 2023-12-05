console.log("sandbox");

const accountSid = "AC7c01e9a8da855422dd95dbf2be289d53";
const authToken = "e467000215d7e68196f0e9f7d722c4cd";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "2nd message",
    // from: "+18777804236",
    from: "+14092373119",
    to: "+639061783380",
  })
  .then((message) => console.log(message.sid));
