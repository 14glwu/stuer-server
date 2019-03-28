'use strict';

const Service = require('egg').Service;
const nodemailer = require('nodemailer');

class Email extends Service {
  async sendCodeEmail(to, code) {
    const { app } = this;
    const { options, from } = app.config.email;
    const transporter = nodemailer.createTransport(options);
    const mailOptions = {
      from,
      to,
      subject: 'Stuer平台邮箱验证码，请查收',
      html: `<p>[Stuer平台]您好，您的邮箱验证码是：
      <b style="color: red; font-size: 24px; letter-spacing: 2px;">${code}</b>
      ，请于5分钟内正确输入，如非本人操作，请忽略此邮件</p>
      <p>提示：请勿泄露验证码给他人</>`,
    };
    // 异步发送邮件能提升用户体验
    transporter.sendMail(mailOptions);
  }
}
module.exports = Email;
