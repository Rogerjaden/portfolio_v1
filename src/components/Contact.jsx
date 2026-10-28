import { useState } from 'react';
import { PROFILE } from '../data/portfolio';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const send = (event) => {
    event.preventDefault();
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Portfolio message')}&body=${body}`;
  };
  return <div className="contact-layout">
    <div className="contact-copy">
      <p>Have a backend problem, a product idea, or an opportunity worth discussing? Send a note.</p>
      <a className="email-link" href={`mailto:${PROFILE.email}`}>{PROFILE.email} ↗</a>
      <div className="contact-socials">
        <div className="social-links">
          <a href={PROFILE.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <a href={PROFILE.leetcode} target="_blank" rel="noreferrer">LeetCode ↗</a>
        </div>

        <a
          href="/resume.pdf"
          download="Roger-Jaden-Resume.pdf"
          className="resume-download-btn"
        >
          <span>Download Resume</span>
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
    <form className="contact-form" onSubmit={send}>
      <label>
        Name
        <input value={form.name} onChange={update('name')} placeholder="Your name" required />
      </label>
      <label>
        Email
        <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" required />
      </label>
      <label>
        Message
        <textarea value={form.message} onChange={update('message')} rows="4" placeholder="What's on your mind?" required />
      </label>
      <button type="submit">Send a message <span>↗</span></button>
      <small>Opens your email app to send the message.</small>
    </form>
  </div>;
}
