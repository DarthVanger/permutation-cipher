import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import CipherForm from '../CipherForm'

const mockEncryptedPassword = 'mock-encrypted-password';

const server = setupServer(
  rest.post('/encrypt-password', (req, res, ctx) => {
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

  enterEncryptionKey('xyz');
  submitForm();

  expect(screen.getByRole('alert')).toHaveTextContent('Please enter password')
});

test('when encryption key is empty shows validation error', async () => {
  render(<CipherForm />)

  enterPassword('abc');
  submitForm();

  expect(screen.getByRole('alert')).toHaveTextContent('Please enter encryption key')
});

test('when the form is valid shows ecnrypted password', async () => {
  render(<CipherForm />)

  enterPassword('abc');
  enterEncryptionKey('xyz');

  submitForm();

  await waitFor(() => screen.getByText(mockEncryptedPassword));
});
