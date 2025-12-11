'use client';

import { useEffect, useState } from 'react';
import { retrieveLaunchParams } from '@tma.js/sdk';
import DiceGame from '../components/DiceGame';
import SlotsGame from '../components/SlotsGame';
import { getUserBalance, updateUserBalance } from '../lib/db';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [balance, setBalance] = useState(1000);

  useEffect(() => {
    const launchParams = retrieveLaunchParams();
    if (launchParams.initData?.user) {
      setUser(launchParams.initData.user);
      const userBalance = getUserBalance(launchParams.initData.user.id.toString());
      setBalance(userBalance);
    }
  }, []);

  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
    if (user) {
      updateUserBalance(user.id.toString(), newBalance);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">StakeX</h1>
          <p>Authorize via Telegram to play</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">StakeX</h1>
        <div className="text-right">
          <p>{user.firstName} {user.lastName}</p>
          <p>Balance: {balance} coins</p>
        </div>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <DiceGame balance={balance} updateBalance={updateBalance} />
        <SlotsGame balance={balance} updateBalance={updateBalance} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl mb-4">Referral</h2>
        <p>Invite friends and earn bonuses!</p>
        <button className="bg-purple-500 px-4 py-2 rounded">Share Link</button>
      </div>
    </div>
  );
}
