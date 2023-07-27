import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PasswordStrengthChecker, { isStrongPassword } from './PasswordStrengthChecker';

describe('Password strength checker', () => {
  test('isStrongPassword function should return true for a strong password', () => {
    const strongPasswords = ['Strong123', 'Myp@ssword123', '1qaz!QAZ'];
    strongPasswords.forEach((password) => {
      expect(isStrongPassword(password)).toBe(true);
    });
  });

  test('isStrongPassword function should return false for a weak password', () => {
    const weakPasswords = ['', 'abcde', '123456', 'AbCdEfGhIjKlMnOpQrStUvWxYz', 'baaaabb0'];
    weakPasswords.forEach((password) => {
      expect(isStrongPassword(password)).toBe(false);
    });
  });

  test('PasswordStrengthChecker component displays the correct strength after checking', () => {
    render(<PasswordStrengthChecker />);
    const passwordInput = screen.getByLabelText('Password:');
    const checkButton = screen.getByText('Check Strength');

    fireEvent.change(passwordInput, { target: { value: 'AbCdEfGhIjKlMnOpQrStUvWxYz1' } });
    fireEvent.click(checkButton);

    const strengthResult = screen.getByText('Password Strength: Strong');
    expect(strengthResult).toBeInTheDocument();
  });
});
