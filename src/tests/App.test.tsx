import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/';
import '@testing-library/user-event/';
import App from '../App';
import userEvent from '@testing-library/user-event/';
import axios from 'axios';


describe('App component', () => {
  it('renders title text', () => {
    render(<App />);
    const title = screen.getByText(/Salve/i);
    expect(title).toBeInTheDocument();
  });

  it('renders input field with placeholder text', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Insert text/i);
    expect(input).toBeInTheDocument();
  });


  it('initially displays count as 0', () => {
    render(<App />);
    const countDisplay = screen.getByText('0');
    expect(countDisplay).toBeInTheDocument();
  });

  it('increments count on button click', () => {
    render(<App />);
    const incrementButton = screen.getByTestId('increase');
    expect(incrementButton).toBeInTheDocument();

    userEvent.click(incrementButton);

    const countDisplay = screen.getByTestId('counter');
    expect(countDisplay).toBeInTheDocument();
  });

  it('decrements count on button click', () => {
    render(<App />);
    const decrement = screen.getByTestId('decrease');
    expect(decrement).toBeInTheDocument();

    userEvent.click(decrement);

    const countDisplay = screen.getByTestId('counter');
    expect(countDisplay).toBeInTheDocument();
  });

  it('should change input value', async () => {
    render(<App />);
    const inputField = screen.getByTestId("input-text");
    let newValue = await axios.get('https://dummyjson.com/users/1').then(res => res.data?.firstName);

    await act(async () => {
      await userEvent.clear(inputField)
    .then(async () => {
       await userEvent.type(inputField, newValue)
      });
    });
    expect(inputField).toHaveValue(newValue);
  })

  it('input value should have an empty string as default', async () => {
    render(<App />);
    const inputField = screen.getByTestId("input-text");
    expect(inputField).toHaveValue("");
  });

  it('input value should change upon render', async () => {
    render(<App />);
    const inputField = screen.getByTestId("input-text");
    await waitFor(() => {
      expect(inputField).toHaveValue("Sheldon");
    })
  })
});