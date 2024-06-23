import path from "path";
import fs from "fs";
import handlebars from "handlebars";

import { createTransport } from "nodemailer";
import { ENV } from "../constants";

export const transporter = createTransport({
  host: ENV.EMAIL_HOST,
  port: ENV.EMAIL_PORT,
  secure: false,
  auth: {
    user: ENV.EMAIL_USER,
    pass: ENV.EMAIL_PASSWORD,
  },
});

export const NodemailerForgotPassword = async (params: {
  name: string;
  email: string;
  link: string;
}) => {
  const templatePath = path.join("./public/templates/forgot-password.html");
  const source = fs.readFileSync(templatePath, { encoding: "utf-8" });
  const template = handlebars.compile(source);
  const html: string = template(params);

  try {
    await transporter
      .sendMail({
        from: "Whoami <noreply@whoami.com>",
        to: params.email,
        subject: "OTP Verification",
        html,
      })
      .then(() => {
        console.log("OTP sent to", params.email);
      });
  } catch (error) {
    console.log(error);

    throw new Error("Failed to send OTP");
  }
};
