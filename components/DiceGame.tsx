'use client';

import { useState } from 'react';

interface DiceGameProps {
  balance: number;
  updateBalance: (newBalance: number) => void;
}

export default function DiceGame({ balance, updateBalance }: DiceGameProps) {
  const [bet, setBet] = useState(10);
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  const rollDice = () => {
    if (bet > balance) {
      setMessage('Insufficient balance!');
      return;
    }
    const dice = Math.floor(Math.random() * 6) + 1;
    setResult(dice);
    if (dice >= 4) {
      const win = bet * 2;
      updateBalance(balance + win);
      setMessage(`You won ${win}! Dice: ${dice}`);
    } else {
      updateBalance(balance - bet);
      setMessage(`You lost ${bet}! Dice: ${dice}`);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl mb-4">Dice Game</h2>
      <input
        type="number"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        className="bg-gray-700 text-white p-2 rounded mb-4"
      />
      <button onClick={rollDice} className="bg-blue-500 px-4 py-2 rounded">
        Roll Dice
      </button>
      {result && <p className="mt-4">Result: {result}</p>}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}