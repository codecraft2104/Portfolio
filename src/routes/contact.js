const express = require('express');
const nodemailer = require('nodemailer');
const { pool } = require('../config/db');

const router = express.Router();

function sanitizeText(value, maxLength = 255) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body || {};

  const sanitizedName = sanitizeText(name, 120);
  const sanitizedEmail = sanitizeText(email, 255).toLowerCase();
  const sanitizedSubject = sanitizeText(subject, 255);
  const sanitizedMessage = sanitizeText(message, 2000);

  if (!sanitizedName || !sanitizedEmail || !sanitizedSubject || !sanitizedMessage) {
    return res.status(400).json({
      message: 'Please complete all required fields.',
    });
  }

  if (!isValidEmail(sanitizedEmail)) {
    return res.status(400).json({
      message: 'Please enter a valid email address.',
    });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO contact_messages (name, email, subject, message, ip_address) VALUES (?, ?, ?, ?, ?)',
      [sanitizedName, sanitizedEmail, sanitizedSubject, sanitizedMessage, req.ip || null]
    );

    let emailStatus = 'not_configured';
    const smtpConfigured = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

    if (smtpConfigured) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: Number(process.env.SMTP_PORT || 587) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: process.env.SMTP_FROM || 'Portfolio <no-reply@example.com>',
        to: process.env.SMTP_TO || sanitizedEmail,
        replyTo: sanitizedEmail,
        subject: `Portfolio inquiry: ${sanitizedSubject}`,
        text: `Name: ${sanitizedName}\nEmail: ${sanitizedEmail}\n\n${sanitizedMessage}`,
      });

      emailStatus = 'sent';
    }

    res.status(201).json({
      message:
        emailStatus === 'sent'
          ? 'Your message was saved and sent successfully.'
          : 'Your message was saved successfully. Email notifications require SMTP configuration.',
      id: result.insertId,
    });
  } catch (error) {
    console.error('contact save failed:', error);
    res.status(500).json({
      message: 'Unable to save your message right now. Please try again later.',
    });
  }
});

module.exports = router;
