import { describe, expect, test } from 'vitest';
import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('Foo bar', () => {
    const result = render(<App />)

    expect(result.getByText('TDD e Clean Architecture no frontend com React')).toBeInTheDocument()
  });
});
