import { Resend } from "resend";

const resend = new Resend("re_Lq3g12uV_432NH35GmG3idR3R6EeTFBGE");

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/email-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click this link to confirm your email: <a href=${confirmLink}>${confirmLink}</a></p>`,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/reset-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `<p>Click this link to reset your password: <a href=${confirmLink}>${confirmLink}</a></p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two factor authentication",
    html: `<p>Your 2FA code: ${token}</p>`,
  });
};
