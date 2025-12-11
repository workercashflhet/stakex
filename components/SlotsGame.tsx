'use client';

import { useState } from 'react';

interface SlotsGameProps {
  balance: number;
  updateBalance: (newBalance: number) => void;
}

export default function SlotsGame({ balance, updateBalance }: SlotsGameProps) {
  const [bet, setBet] = useState(10);
  const [reels, setReels] = useState(['🍒', '🍒', '🍒']);
  const [message, setMessage] = useState('');

  const spin = () => {
    if (bet > balance) {
      setMessage('Insufficient balance!');
      return;
    }
    const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐'];
    const newReels = reels.map(() => symbols[Math.floor(Math.random() * symbols.length)]);
    setReels(newReels);
    if (newReels[0] === newReels[1] && newReels[1] === newReels[2]) {
      const win = bet * 10;
      updateBalance(balance + win);
      setMessage(`Jackpot! You won ${win}!`);
    } else {
      updateBalance(balance - bet);
      setMessage('Try again!');
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl mb-4">Slots</h2>
      <input
        type="number"
        value={bet}
        onChange={(e) => setBet(Number(e.target.value))}
        className="bg-gray-700 text-white p-2 rounded mb-4"
      />
      <div className="flex justify-center mb-4">
        {reels.map((reel, index) => (
          <span key={index} className="text-4xl mx-2">{reel}</span>
        ))}
      </div>
      <button onClick={spin} className="bg-green-500 px-4 py-2 rounded">
        Spin
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}