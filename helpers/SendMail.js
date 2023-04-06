import nodemailer from "nodemailer";
import ejs from "ejs";

/** Email contact form data to admin.
 * @param {string} name Sender name 
 * @param {string} from FROM Email address
 * @param {string} message Message content 
 * @returns Object
 */
export const contact = async (name, from, message) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let mailOpts = {
    from: process.env.EMAIL_USER,
    to: "tucker@thephonedoctors.com",
    cc: process.env.EMAIL_USER,
    subject: `Contact Form: ${from} ${name}`,
    html: `<p>${message}</p>`,
  };
  return transporter.sendMail(mailOpts);
};

/**
 * Email quote template to potential customer.
 * @param {string} to Email address
 * @param {string} template Path to EJS email template
 * @param {object} data Quote model object
 * @returns Object
 */
export const quote = async (to, template, data) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let mailOpts = {
    from: process.env.EMAIL_USER,
    to: to,
    cc: process.env.EMAIL_USER,
    subject: `Your repair quote from Phone Doctors`,
    html: await ejs.renderFile(template, { data: data }),
  };
  return transporter.sendMail(mailOpts);
};

/**
 * Email survey response to customer.
 * @param {string} to Email address
 * @param {string} template Path to EJS email template
 * @param {*} googleReview TODO:
 * @returns Object
 */
export const survey = async (to, template, googleReview = false) => {
  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let mailOpts = {
    from: "noreply@thephonedoctors.com",
    to: to,
    cc: process.env.EMAIL_USER,
    subject: `A Message from ${process.env.BRAND}`,
    html: await ejs.renderFile(template, { data: googleReview }),
  };
  return transporter.sendMail(mailOpts);
};
