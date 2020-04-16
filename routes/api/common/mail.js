const nodemailer = require("nodemailer");
const Config = require("../../../model/Configs");
const parseJson = require("parse-json");
const fs = require("fs");
const mailRecord = require("../../../model/MailRecords");

async function sentMail(subject, to, templateName) {
  const mailInfoConfig = await Config.findOne({ name: "mailInfo" });
  const mailInfo = parseJson(mailInfoConfig.value.replace("\n", ""));
  const htmlTemplate = fs.readFileSync(
    process.cwd() + "/template/" + templateName
  );

  var transporter = nodemailer.createTransport(mailInfo);

  const mailOptions = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: "Hello world?", // plain text body
    html: htmlTemplate // html body
  };

  await transporter.sendMail(mailOptions, (err, infos) => {
    const newMailRecord = new mailRecord({
      receiver: to,
      template: templateName
    });
    if (err) {
      newMailRecord.message = err.toString();
      newMailRecord.status = false;
    } else {
      newMailRecord.message = "success";
      newMailRecord.status = true;
      newMailRecord.messageID = infos.messageID;
    }

    newMailRecord.save();
  });
}
module.exports = sentMail;
