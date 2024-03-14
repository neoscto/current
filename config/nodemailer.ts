import nodemailer from 'nodemailer';

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: email,
    pass
  }
});

export const mailOptions = {
  from: email,
  to: email
};

// import sgMail from '@sendgrid/mail';

// const email = process.env.EMAIL;
// const sendGridApiKey = process.env.SENDGRID_API_KEY;

// sgMail.setApiKey(sendGridApiKey);

// export const msg = {
//   to: email,
//   from: email,
//   subject: 'Subject Goes Here',
//   text: 'Hello world',
//   html: '<strong>Hello world</strong>',
// };