export const defaultContactFormCopy = {
  "nameLabel": "Name",
  "emailLabel": "Email",
  "inquiryLabel": "Inquiry type",
  "inquiryPlaceholder": "Choose one",
  "messageLabel": "Message",
  "submitLabel": "Send Message",
  "sendingLabel": "Sending…",
  "sendingMessage": "Sending your message…",
  "successMessage": "Thank you. Your message has been sent.",
  "rateLimitMessage": "Please wait a minute before sending another message.",
  "validationMessage": "Please check your email and complete all fields, then try again.",
  "errorMessage": "We couldn’t confirm your message was sent. Please wait a moment and try again.",
  "deliveryNotice": "Test form: your name, email, inquiry type, and message are processed by Formspree and sent to the site administrator for testing. Formspree stores a submission record, and a copy remains in the test inbox. Please don’t include sensitive personal information.",
  "unavailableMessage": "Form delivery will be connected before launch.",
  "inquiryOptions": [
    "Coaching",
    "Speaking",
    "Media",
    "Book",
    "Other"
  ]
};

export type ContactFormCopy = Partial<typeof defaultContactFormCopy>;
