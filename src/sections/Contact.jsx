import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  GitBranch,
  Link2,
  Play,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { profile } from "../data/profile";
import { CONTACT_CONFIG } from "../config/contact";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = {
  sender_name: "",
  sender_email: "",
  subject: "",
  message: "",
};

export default function Contact() {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  // status: "idle" | "loading" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // ── Validation ────────────────────────────────────────────────
  const validate = () => {
    const errors = {};
    if (!formData.sender_name.trim()) errors.sender_name = "Name is required.";
    if (!formData.sender_email.trim()) {
      errors.sender_email = "Email is required.";
    } else if (!EMAIL_REGEX.test(formData.sender_email)) {
      errors.sender_email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim()) errors.subject = "Subject is required.";
    if (!formData.message.trim()) errors.message = "Message is required.";
    return errors;
  };

  // ── Input handler ─────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear per-field error as the user types
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // ── Submission ────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("loading");

    const emailBody = [
      `New message from your portfolio contact form.`,
      ``,
      `Name:     ${formData.sender_name}`,
      `Email:    ${formData.sender_email}`,
      `Subject:  ${formData.subject}`,
      ``,
      `Message:`,
      formData.message,
      ``,
      `Received: ${new Date().toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      })}`,
    ].join("\n");

    try {
      const res = await fetch(CONTACT_CONFIG.ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: CONTACT_CONFIG.ACCESS_KEY,
          subject: `${CONTACT_CONFIG.SUBJECT_PREFIX} ${formData.subject}`,
          from_name: CONTACT_CONFIG.FROM_NAME,
          name: formData.sender_name,
          email: formData.sender_email,
          message: emailBody,
          // Sets Reply-To so you can reply directly to the sender
          replyto: formData.sender_email,
          // Prevents the Web3Forms default "Form submission successful" email to sender
          botcheck: "",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
      } else {
        // Web3Forms returns a message field on failure
        throw new Error(data.message || "Submission failed.");
      }
    } catch (err) {
      console.error("[Contact form]", err);
      setStatus("error");
      setErrorMessage(
        "Failed to send message. Please try again or contact me directly using the email below."
      );
    }
  };

  // ── Reset ─────────────────────────────────────────────────────
  const handleReset = () => {
    setFormData(EMPTY_FORM);
    setFieldErrors({});
    setStatus("idle");
    setErrorMessage("");
  };

  // ── Live JSON preview ─────────────────────────────────────────
  const getLiveJson = () => JSON.stringify(formData, null, 2);

  // ── Render ────────────────────────────────────────────────────
  return (
    <section id="contact" className="contact-section">
      <div className="section-glow-left"></div>

      <div className="container contact-container">
        {/* ── Left: Direct contact info ── */}
        <div className="contact-info-panel">
          <div className="section-header text-left">
            <span className="section-subtitle font-mono">&lt;endpoint&gt;</span>
            <h2 className="section-title">Get In Touch</h2>
          </div>
          <p className="contact-intro">
            Have an opening, a backend architecture puzzle to solve, or just
            want to connect? Reach out using the contact API client or via
            direct channels.
          </p>

          <div className="contact-links-list">
            <a
              href={`mailto:${profile.email}`}
              className="contact-link-card glass-panel"
            >
              <Mail size={18} className="text-gradient-cyan" />
              <div>
                <span className="link-label font-mono">Email</span>
                <span className="link-val">{profile.email}</span>
              </div>
            </a>

            <a
              href={`tel:${profile.phone}`}
              className="contact-link-card glass-panel"
            >
              <Phone size={18} className="text-gradient-cyan" />
              <div>
                <span className="link-label font-mono">Phone</span>
                <span className="link-val">{profile.phone}</span>
              </div>
            </a>

            <div className="contact-link-card glass-panel">
              <MapPin size={18} className="text-gradient-cyan" />
              <div>
                <span className="link-label font-mono">Location</span>
                <span className="link-val">{profile.location}</span>
              </div>
            </div>
          </div>

          <div className="social-links-wrap">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn glass-panel"
              title="GitHub Profile"
            >
              <GitBranch size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-circle-btn glass-panel"
              title="LinkedIn Profile"
            >
              <Link2 size={18} />
            </a>
          </div>
        </div>

        {/* ── Right: API-style sandbox ── */}
        <div className="contact-sandbox-panel glass-panel">
          {/* Header bar */}
          <div className="sandbox-header border-bottom">
            <span className="sandbox-badge font-mono">POST</span>
            <span className="sandbox-url font-mono">
              https://api.web3forms.com/submit
            </span>
          </div>

          {/* ── FORM STATE ── */}
          {(status === "idle" || status === "error") && (
            <form onSubmit={handleSubmit} className="sandbox-form" noValidate>
              <div className="sandbox-inputs-grid">
                {/* sender_name */}
                <div className="form-group">
                  <label className="font-mono" htmlFor="sender_name">
                    sender_name
                    <span className="field-required">*</span>
                  </label>
                  <input
                    id="sender_name"
                    type="text"
                    name="sender_name"
                    value={formData.sender_name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={fieldErrors.sender_name ? "input-error" : ""}
                    disabled={status === "loading"}
                    autoComplete="name"
                  />
                  {fieldErrors.sender_name && (
                    <span className="field-error-msg font-mono">
                      <AlertCircle size={11} />
                      {fieldErrors.sender_name}
                    </span>
                  )}
                </div>

                {/* sender_email */}
                <div className="form-group">
                  <label className="font-mono" htmlFor="sender_email">
                    sender_email
                    <span className="field-required">*</span>
                  </label>
                  <input
                    id="sender_email"
                    type="email"
                    name="sender_email"
                    value={formData.sender_email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={fieldErrors.sender_email ? "input-error" : ""}
                    disabled={status === "loading"}
                    autoComplete="email"
                  />
                  {fieldErrors.sender_email && (
                    <span className="field-error-msg font-mono">
                      <AlertCircle size={11} />
                      {fieldErrors.sender_email}
                    </span>
                  )}
                </div>
              </div>

              {/* subject */}
              <div className="form-group">
                <label className="font-mono" htmlFor="subject">
                  subject
                  <span className="field-required">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Backend Role Invitation"
                  className={fieldErrors.subject ? "input-error" : ""}
                  disabled={status === "loading"}
                />
                {fieldErrors.subject && (
                  <span className="field-error-msg font-mono">
                    <AlertCircle size={11} />
                    {fieldErrors.subject}
                  </span>
                )}
              </div>

              {/* message */}
              <div className="form-group">
                <label className="font-mono" htmlFor="message">
                  message
                  <span className="field-required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project or role details here..."
                  rows={4}
                  className={fieldErrors.message ? "input-error" : ""}
                  disabled={status === "loading"}
                />
                {fieldErrors.message && (
                  <span className="field-error-msg font-mono">
                    <AlertCircle size={11} />
                    {fieldErrors.message}
                  </span>
                )}
              </div>

              {/* Global send error */}
              {status === "error" && errorMessage && (
                <div className="error-payload-alert font-mono">
                  <AlertCircle size={14} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "loading"}
                >
                  <Play size={12} fill="currentColor" />
                  <span>SEND PAYLOAD</span>
                </button>
              </div>
            </form>
          )}

          {/* ── LOADING STATE ── */}
          {status === "loading" && (
            <div className="sandbox-loader font-mono">
              <div className="spinner"></div>
              <p>
                curl -X POST https://api.web3forms.com/submit \
              </p>
              <p className="loading-data">Delivering message to inbox...</p>
            </div>
          )}

          {/* ── SUCCESS STATE ── */}
          {status === "success" && (
            <div className="sandbox-success font-mono">
              <div className="success-header">
                <span className="status-badge-created">
                  <span className="status-dot-created"></span>
                  201 Created
                </span>
                <span className="success-time">Message delivered</span>
              </div>
              <div className="success-message-block">
                <CheckCircle size={36} className="success-checkmark" />
                <h3 className="success-title">Message sent successfully.</h3>
                <p className="success-body-text">
                  Thanks for reaching out!
                  <br />
                  I'll get back to you as soon as possible.
                </p>
              </div>
              <div className="success-body code-display">
                <pre className="json-pre">
                  <code>
                    {JSON.stringify(
                      {
                        status: "success",
                        code: 201,
                        message:
                          "Message delivered to sagargautam0626@gmail.com.",
                        reply_to: formData.sender_email,
                        delivered_at: new Date().toISOString(),
                      },
                      null,
                      2
                    )}
                  </code>
                </pre>
              </div>
              <button
                onClick={handleReset}
                className="btn btn-secondary btn-sm reset-btn"
              >
                <span>SEND ANOTHER REQUEST</span>
              </button>
            </div>
          )}

          {/* ── Live JSON preview (idle & error only) ── */}
          {(status === "idle" || status === "error") && (
            <div className="json-live-preview border-top">
              <div className="preview-label font-mono">
                // payload_preview.json
              </div>
              <pre className="live-json-code font-mono">
                <code>{getLiveJson()}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
