import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CipherForm from '../CipherForm'

const mockEncryptedPassword = 'mock-encrypted-password';
const validEncryptionKey = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';

const server = setupServer(
  rest.post('http://localhost:8000/encrypt-password', (req, res, ctx) => {
    return res(ctx.json(mockEncryptedPassword))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const enterPassword = (value) => {
  fireEvent.change(screen.getByLabelText('Password'), {target: {value}});
};

const enterEncryptionKey = (value) => {
  fireEvent.change(screen.getByLabelText('Encryption Key'), {target: {value}});
};

const submitForm = () => {
  fireEvent.click(screen.getByRole('button', {name: /encrypt/i}))
};

test('when password is empty shows validation error', async () => {
  render(<CipherForm />)

  enterEncryptionKey(validEncryptionKey);
  submitForm();

  expect(await screen.findByRole('alert')).toHaveTextContent('Please enter password');
});

test('when encryption key is empty shows validation error', async () => {
  render(<CipherForm />)

  enterPassword('abc');
  submitForm();

  expect(await screen.findByRole('alert')).toHaveTextContent('Please enter encryption key');
});

test('when password contains numbers or special symbols shows validation error ', async () => {
  const validationMessage = 'Password should contain only letters of the alphabet';

  render(<CipherForm />)

  enterEncryptionKey(validEncryptionKey);
  enterPassword('123asd');
  submitForm();

  expect(await screen.findByRole('alert')).toHaveTextContent(validationMessage);

  enterPassword('$asd');
  submitForm();

  expect(await screen.findByRole('alert')).toHaveTextContent(validationMessage);
});

test('when encryption key contains numbers or special symbols shows validation error ', async () => {
  const validationMessage = 'Encryption key should contain only letters of the alphabet';

  render(<CipherForm />)

  enterPassword('asd');
  enterEncryptionKey('123xyz');
  submitForm();

  expect(await screen.findByRole('alert')).toHaveTextContent(validationMessage);

  enterEncryptionKey('^xyz');
  submitForm();

  expect(await screen.findByRole('alert')).toHaveTextContent(validationMessage);
});

test('when encryption key has invalid length shows validation error', async () => {
  const validationMessage = 'Encryption key should have exactly 26 letters';

  render(<CipherForm />)

  enterPassword('asd');
  enterEncryptionKey('abcdefghiklmnopqrstuvwzy');
  submitForm();

  expect(await screen.findByRole('alert')).toHaveTextContent(validationMessage);
});

test('when encryption key has duplicate letters shows validation error', async () => {
  const validationMessage = 'Encryption key should contain only unique letters';

  render(<CipherForm />)

  enterPassword('asd');
  enterEncryptionKey('aacdefghijklmnopqrstuvwxyz');
  submitForm();

  expect(await screen.findByRole('alert')).toHaveTextContent(validationMessage);
});

test('when the form is valid shows ecnrypted password', async () => {
  render(<CipherForm />)

  enterPassword('abc');
  enterEncryptionKey(validEncryptionKey);

  submitForm();

  await waitFor(() => screen.getByText(mockEncryptedPassword));
});
