import assert from 'assert';
import { createUser, getUserById } from '../src/services/userService.js';
import { validateUserCreate } from '../src/utils/validation.js';

console.log('Running tests...');

try {
  // Test 1: User Creation
  console.log('Test 1: Create valid user');
  const validPayload = { name: 'Alice', email: 'alice@example.com' };
  validateUserCreate(validPayload);
  const user = createUser(validPayload);
  
  assert.strictEqual(user.name, 'Alice');
  assert.strictEqual(user.email, 'alice@example.com');
  assert.ok(user.id);
  console.log('  PASS');

  // Test 2: Invalid email throws
  console.log('Test 2: Validation throws on invalid email');
  const invalidPayload = { name: 'Bob', email: 'not-an-email' };
  try {
    validateUserCreate(invalidPayload);
    assert.fail('Should have thrown error');
  } catch (err) {
    assert.strictEqual(err.message, 'Invalid email format');
    console.log('  PASS');
  }

  // Test 3: User Retrieval
  console.log('Test 3: Get user by ID');
  const fetchedUser = getUserById(user.id);
  assert.deepStrictEqual(fetchedUser, user);
  console.log('  PASS');
  
  // Test 4: Missing fields
  console.log('Test 4: Validation throws on missing name');
  try {
      validateUserCreate({ email: 'test@example.com' });
      assert.fail('Should be thrown error');
  } catch(err) {
      assert.strictEqual(err.message, 'Name is required');
      console.log('  PASS');
  }

  console.log('\nAll tests passed successfully!');
  process.exit(0);

} catch (err) {
  console.error('\nTest failed:', err);
  process.exit(1);
}
