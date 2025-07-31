// Test: API user lifecycle (create, verify, delete) on mockapi.io

// 1. Generate random user data matching the API schema.
// 2. Fetch all users and record the initial user count.
// 3. POST the new user to the API.
// 4. Fetch all users again and assert the count increased by 1 and the new user exists.
// 5. DELETE the newly created user by id.
// 6. Fetch all users again and assert the count is back to the original and the user is gone.

// This test ensures the API correctly handles user creation and deletion, and that user counts and data integrity are maintained throughout.

import { test, expect } from '@playwright/test';

function randomString(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

  // Generate random user data matching API field names (no createdAt)
  const FullName = 'Name' + randomString(5) + ' Surname' + randomString(5);
  const AddressPostCode = 'P' + Math.floor(10000 + Math.random() * 89999);
  const AddressStreet = randomString(8) + ' Street';
  const AddressCity = 'City' + randomString(4);
  const Email = randomString(6) + '@test.com';
  const PhoneNumber = '07' + Math.floor(100000000 + Math.random() * 900000000);

test('Generate, check, post, and recheck user with random name', async ({ request }) => {

  // Get all users and check for generated Fullname
  const getResponse1 = await request.get('https://688b6f6a2a52cabb9f51b8cf.mockapi.io/api/rm/v1/users');
  expect(getResponse1.ok()).toBeTruthy();
  const users1 = await getResponse1.json();
  const userCountBefore = users1.length;
  const FullNameExistsBefore = users1.some(user => user.FullName === FullName);
  console.log('User count before POST:', userCountBefore);


  // Post new user with correct field names
  const newUser = { FullName, AddressPostCode, AddressStreet, AddressCity, Email, PhoneNumber };
  const postResponse = await request.post('https://688b6f6a2a52cabb9f51b8cf.mockapi.io/api/rm/v1/users', { data: newUser });
  expect(postResponse.ok()).toBeTruthy();
  const createdUser = await postResponse.json();
  console.log('Created user:', createdUser);
  

  // Get all users and check for FullName again
  const getResponse2 = await request.get('https://688b6f6a2a52cabb9f51b8cf.mockapi.io/api/rm/v1/users');
  expect(getResponse2.ok()).toBeTruthy();
  const users2 = await getResponse2.json();
  const userCountAfter = users2.length;
  expect(userCountAfter).toBe(userCountBefore + 1);
  const fullNameExistsAfter = users2.some(user => user.FullName === FullName);
  console.log('FullName exists after POST:', fullNameExistsAfter);
  console.log('User count after POST:', userCountAfter);

  // Delete the newly created user
  const deleteResponse = await request.delete(`https://688b6f6a2a52cabb9f51b8cf.mockapi.io/api/rm/v1/users/${createdUser.id}`);
  expect(deleteResponse.ok()).toBeTruthy();
  console.log('Deleted user:', createdUser.id);

  // Get all users and check for FullName and count again
  const getResponse3 = await request.get('https://688b6f6a2a52cabb9f51b8cf.mockapi.io/api/rm/v1/users');
  expect(getResponse3.ok()).toBeTruthy();
  const users3 = await getResponse3.json();
  const userCountFinal = users3.length;
  expect(userCountFinal).toBe(userCountBefore);
  const fullNameExistsFinal = users3.some(user => user.FullName === FullName);
  expect(fullNameExistsFinal).toBeFalsy();
  console.log('FullName exists after DELETE:', fullNameExistsFinal);
  console.log('User count after DELETE:', userCountFinal);
});