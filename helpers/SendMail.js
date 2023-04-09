import nodemailer from "nodemailer";
import ejs from "ejs";

/**
 * Email quote template to potential customer.
 * @param {string} to Email address
 * @param {string} template Path to EJS email template
 * @param {object} data Quote model object
 * @returns Promise
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
    subject: `Your repair quote from ${process.env.BRAND}`,
    html: await ejs.renderFile(template, { data: data }),
  };
  return transporter.sendMail(mailOpts);
};