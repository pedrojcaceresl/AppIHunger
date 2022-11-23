let nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  let options = {
    service: "Gmail",
    auth: {
      user: "lopezs1999@gmail.com",
      pass: "ttdthhvbkhkpncpj",
    },
  };

  let transporter = nodemailer.createTransport(options);

  return (
    transporter.sendMail({
      from: "lopezs1999@gmail.com",
      to: `${data.usu_email}`,
      subject: `Recuperar contraseña`,
      html: `<!doctype html>
        <div>
            <h1>Tu password es: ${data.usu_password}</h1>
        </div>
        `,
    }),
    (err, info) => {
      if (err) {
        console.log(err);
        return false;
      }
      console.log(info);
    }
  );
};

module.exports = {
  sendEmail,
};
