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
  ACCESS_KEY: "4397dbdd-0ec0-4300-9b4e-962a297de84a",

  // The Web3Forms submission endpoint (do not change):
  ENDPOINT: "https://api.web3forms.com/submit",

  // The email subject prefix that appears in your inbox:
  SUBJECT_PREFIX: "[Portfolio]",

  // Your name — displayed as the form sender name in inbox:
  FROM_NAME: "Portfolio Contact Form — Sagar Gautam",

  // Owner details (used in thank-you email)
  OWNER_NAME: "Sagar Gautam",
  OWNER_TITLE: "Backend Engineer",
  OWNER_EMAIL: "sagargautam0626@gmail.com",
};

// ============================================================
// EmailJS Configuration (for automatic thank-you emails)
// ============================================================
// 1. Sign up at https://www.emailjs.com (free: 200 emails/month)
// 2. Create an Email Service (e.g., Gmail) and note the Service ID.
// 3. Create an Email Template with these variables:
//      {{to_email}}, {{to_name}}, {{from_name}}, {{from_title}},
//      {{from_email}}, {{reply_subject}}
// 4. Note the Template ID.
// 5. Go to Account → General → copy your Public Key.
// 6. Paste all three values below.
// ============================================================
export const EMAILJS_CONFIG = {
  SERVICE_ID: "YOUR_EMAILJS_SERVICE_ID",
  TEMPLATE_ID: "YOUR_EMAILJS_TEMPLATE_ID",
  PUBLIC_KEY: "YOUR_EMAILJS_PUBLIC_KEY",
};

// ============================================================
// Country Calling Codes
// ============================================================
// Each entry: { flag, name, code, minLen, maxLen }
// minLen/maxLen = local number digit range (excluding country code)
// Nepal (+977) is first — used as the default selection.
// ============================================================
export const COUNTRY_CODES = [
  { flag: "🇳🇵", name: "Nepal",           code: "+977",  minLen: 7,  maxLen: 10 },
  { flag: "🇮🇳", name: "India",           code: "+91",   minLen: 10, maxLen: 10 },
  { flag: "🇺🇸", name: "United States",   code: "+1",    minLen: 10, maxLen: 10 },
  { flag: "🇬🇧", name: "United Kingdom",  code: "+44",   minLen: 10, maxLen: 10 },
  { flag: "🇨🇦", name: "Canada",          code: "+1",    minLen: 10, maxLen: 10 },
  { flag: "🇦🇺", name: "Australia",       code: "+61",   minLen: 9,  maxLen: 9  },
  { flag: "🇩🇪", name: "Germany",         code: "+49",   minLen: 10, maxLen: 11 },
  { flag: "🇫🇷", name: "France",          code: "+33",   minLen: 9,  maxLen: 9  },
  { flag: "🇯🇵", name: "Japan",           code: "+81",   minLen: 10, maxLen: 10 },
  { flag: "🇨🇳", name: "China",           code: "+86",   minLen: 11, maxLen: 11 },
  { flag: "🇰🇷", name: "South Korea",     code: "+82",   minLen: 9,  maxLen: 10 },
  { flag: "🇧🇷", name: "Brazil",          code: "+55",   minLen: 10, maxLen: 11 },
  { flag: "🇷🇺", name: "Russia",          code: "+7",    minLen: 10, maxLen: 10 },
  { flag: "🇿🇦", name: "South Africa",    code: "+27",   minLen: 9,  maxLen: 9  },
  { flag: "🇲🇽", name: "Mexico",          code: "+52",   minLen: 10, maxLen: 10 },
  { flag: "🇮🇩", name: "Indonesia",       code: "+62",   minLen: 9,  maxLen: 12 },
  { flag: "🇹🇷", name: "Turkey",          code: "+90",   minLen: 10, maxLen: 10 },
  { flag: "🇸🇦", name: "Saudi Arabia",    code: "+966",  minLen: 9,  maxLen: 9  },
  { flag: "🇦🇪", name: "UAE",             code: "+971",  minLen: 7,  maxLen: 9  },
  { flag: "🇶🇦", name: "Qatar",           code: "+974",  minLen: 7,  maxLen: 8  },
  { flag: "🇰🇼", name: "Kuwait",          code: "+965",  minLen: 8,  maxLen: 8  },
  { flag: "🇧🇩", name: "Bangladesh",      code: "+880",  minLen: 10, maxLen: 10 },
  { flag: "🇵🇰", name: "Pakistan",        code: "+92",   minLen: 10, maxLen: 10 },
  { flag: "🇱🇰", name: "Sri Lanka",       code: "+94",   minLen: 9,  maxLen: 9  },
  { flag: "🇹🇭", name: "Thailand",        code: "+66",   minLen: 9,  maxLen: 9  },
  { flag: "🇻🇳", name: "Vietnam",         code: "+84",   minLen: 9,  maxLen: 10 },
  { flag: "🇵🇭", name: "Philippines",     code: "+63",   minLen: 10, maxLen: 10 },
  { flag: "🇲🇾", name: "Malaysia",        code: "+60",   minLen: 9,  maxLen: 10 },
  { flag: "🇸🇬", name: "Singapore",       code: "+65",   minLen: 8,  maxLen: 8  },
  { flag: "🇮🇹", name: "Italy",           code: "+39",   minLen: 9,  maxLen: 10 },
  { flag: "🇪🇸", name: "Spain",           code: "+34",   minLen: 9,  maxLen: 9  },
  { flag: "🇵🇹", name: "Portugal",        code: "+351",  minLen: 9,  maxLen: 9  },
  { flag: "🇳🇱", name: "Netherlands",     code: "+31",   minLen: 9,  maxLen: 9  },
  { flag: "🇧🇪", name: "Belgium",         code: "+32",   minLen: 8,  maxLen: 9  },
  { flag: "🇨🇭", name: "Switzerland",     code: "+41",   minLen: 9,  maxLen: 9  },
  { flag: "🇦🇹", name: "Austria",         code: "+43",   minLen: 10, maxLen: 11 },
  { flag: "🇸🇪", name: "Sweden",          code: "+46",   minLen: 9,  maxLen: 9  },
  { flag: "🇳🇴", name: "Norway",          code: "+47",   minLen: 8,  maxLen: 8  },
  { flag: "🇩🇰", name: "Denmark",         code: "+45",   minLen: 8,  maxLen: 8  },
  { flag: "🇫🇮", name: "Finland",         code: "+358",  minLen: 9,  maxLen: 10 },
  { flag: "🇮🇪", name: "Ireland",         code: "+353",  minLen: 9,  maxLen: 9  },
  { flag: "🇳🇿", name: "New Zealand",     code: "+64",   minLen: 8,  maxLen: 10 },
  { flag: "🇰🇪", name: "Kenya",           code: "+254",  minLen: 9,  maxLen: 9  },
  { flag: "🇳🇬", name: "Nigeria",         code: "+234",  minLen: 10, maxLen: 10 },
  { flag: "🇪🇬", name: "Egypt",           code: "+20",   minLen: 10, maxLen: 10 },
  { flag: "🇬🇭", name: "Ghana",           code: "+233",  minLen: 9,  maxLen: 9  },
  { flag: "🇦🇷", name: "Argentina",       code: "+54",   minLen: 10, maxLen: 10 },
  { flag: "🇨🇴", name: "Colombia",        code: "+57",   minLen: 10, maxLen: 10 },
  { flag: "🇨🇱", name: "Chile",           code: "+56",   minLen: 9,  maxLen: 9  },
  { flag: "🇵🇪", name: "Peru",            code: "+51",   minLen: 9,  maxLen: 9  },
];
