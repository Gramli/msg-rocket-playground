import { randomUUID } from 'crypto';

// In-memory storage for users
const userStore = new Map();

export function createUser(payload) {
  const { name, email } = payload;
  const id = randomUUID();
  
  const newUser = {
    id,
    name,
    email,
    createdAt: new Date().toISOString()
  };

  userStore.set(id, newUser);
  return newUser;
}

export function getUserById(id) {
  return userStore.get(id);
}

export function deleteUser(id) {
  const user = userStore.get(id);
  if (user) {
    userStore.delete(id);
    return true;
  }
  return false;
}
