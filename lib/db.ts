// Mock database for Vercel deployment
const users: { [key: string]: { balance: number } } = {};

export const getUserBalance = (userId: string) => {
  return users[userId]?.balance || 1000;
};

export const updateUserBalance = (userId: string, newBalance: number) => {
  users[userId] = { balance: newBalance };
};