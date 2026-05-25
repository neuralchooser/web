export interface AdminCredentials {
  email: string;
  password: string;
}

export function getAdminCredentials(): AdminCredentials {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("Missing ADMIN_EMAIL or ADMIN_PASSWORD environment variable");
  }

  return { email, password };
}

export function validateAdminCredentials(email: string, password: string) {
  const credentials = getAdminCredentials();
  return email === credentials.email && password === credentials.password;
}
