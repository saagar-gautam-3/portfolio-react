// ============================================================
// Web3Forms Configuration
// ============================================================
// Web3Forms is a free, static-site-friendly form submission
// service. Your access key is a PUBLIC key — safe to commit
// to the frontend. It is NOT an SMTP password or secret.
//
// SETUP STEPS:
// 1. Go to https://web3forms.com
// 2. Enter your email: sagargautam0626@gmail.com
// 3. Click "Create Access Key" — you'll get a key instantly.
// 4. (Optional) Verify your email for better deliverability.
// 5. Paste the key below replacing "YOUR_ACCESS_KEY_HERE".
// 6. Deploy — the form will now deliver real emails to your inbox.
//
// All submissions are visible at https://web3forms.com/dashboard
// ============================================================

export const CONTACT_CONFIG = {
  // Replace this with your actual Web3Forms access key:
  ACCESS_KEY: "YOUR_ACCESS_KEY_HERE",

  // The Web3Forms submission endpoint (do not change):
  ENDPOINT: "https://api.web3forms.com/submit",

  // The email subject prefix that appears in your inbox:
  SUBJECT_PREFIX: "[Portfolio]",

  // Your name — displayed as the form sender name in inbox:
  FROM_NAME: "Portfolio Contact Form — Sagar Gautam",
};
