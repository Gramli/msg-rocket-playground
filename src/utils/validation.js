export function validateUserCreate(payload) {
  if (!payload) {
    throw new Error('Payload is missing');
  }

  const { name, email } = payload;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    throw new Error('Name is required');
  }

  if (!email || typeof email !== 'string') {
    throw new Error('Email is required');
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email format');
  }
}
