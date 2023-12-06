console.log("sandbox");

const accountSid = "AC7c01e9a8da855422dd95dbf2be289d53";
const authToken = "135d407e33f2cadf5b3f79b9aee9970c";
const msid = "MG7402d265f4b1d0217c77632e5c11da3d";
const client = require("twilio")(accountSid, authToken);

client.messages
  .create({
    body: "test",
    // from: "+18777804236",
    from: "+14092373119",
    to: "+639061783380",
    sid: msid,
  })
  .then((message) => console.log(message.sid))
  .catch((error) => console.error(`Error sending message: ${error.message}`));
