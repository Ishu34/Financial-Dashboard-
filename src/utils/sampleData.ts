import type { Transaction, Category } from '@/types';

const descriptions: Record<Category, string[]> = {
  Food: ['Grocery shopping', 'Restaurant dinner', 'Coffee shop', 'Food delivery', 'Lunch at work'],
  Transport: ['Gas station', 'Uber ride', 'Monthly metro pass', 'Car maintenance', 'Parking fee'],
  Shopping: ['Amazon purchase', 'Clothing store', 'Electronics', 'Home supplies', 'Online shopping'],
  Entertainment: ['Netflix subscription', 'Movie tickets', 'Concert tickets', 'Gaming', 'Streaming services'],
  Bills: ['Electric bill', 'Water bill', 'Internet service', 'Phone bill', 'Gas bill'],
  Health: ['Pharmacy', 'Doctor visit', 'Health insurance', 'Dental checkup', 'Gym membership'],
  Education: ['Online course', 'Textbooks', 'Workshop fee'],
  Other: ['Miscellaneous purchase', 'Service fee', 'Donation'],
  Salary: ['Monthly salary', 'Bonus payment', 'Commission'],
  Freelance: ['Project payment', 'Consulting fee', 'Design work'],
  Investment: ['Stock dividends', 'Interest income', 'Rental income'],
  Gift: ['Birthday gift', 'Holiday gift', 'Cashback'],
};

const expenseCategories: Category[] = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Health'];
const incomeCategories: Category[] = ['Salary', 'Freelance', 'Investment', 'Gift'];

function randomAmount(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function randomDate(daysBack: number): string {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysBack));
  return date.toISOString().split('T')[0];
}

export function loadSampleData(): Omit<Transaction, 'id'>[] {
  const transactions: Omit<Transaction, 'id'>[] = [];

  // Generate 25-35 sample transactions
  const count = Math.floor(Math.random() * 11) + 25;

  for (let i = 0; i < count; i++) {
    const isExpense = Math.random() > 0.3; // 70% expenses, 30% income
    const categoryList = isExpense ? expenseCategories : incomeCategories;
    const category = categoryList[Math.floor(Math.random() * categoryList.length)];
    const descList = descriptions[category];
    const description = descList[Math.floor(Math.random() * descList.length)];
    
    let amount: number;
    if (isExpense) {
      amount = category === 'Shopping' ? randomAmount(20, 300) :
               category === 'Food' ? randomAmount(10, 150) :
               category === 'Transport' ? randomAmount(15, 100) :
               category === 'Entertainment' ? randomAmount(10, 80) :
               category === 'Bills' ? randomAmount(50, 200) :
               randomAmount(30, 250);
    } else {
      amount = category === 'Salary' ? randomAmount(3000, 8000) :
               category === 'Freelance' ? randomAmount(500, 2500) :
               category === 'Investment' ? randomAmount(50, 500) :
               randomAmount(20, 200);
    }

    transactions.push({
      description,
      amount,
      type: isExpense ? 'expense' : 'income',
      category,
      date: randomDate(90), // Last 90 days
    });
  }

  // Sort by date descending
  transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return transactions;
}

export function generateSampleTransaction(): Omit<Transaction, 'id'> {
  const isExpense = Math.random() > 0.4;
  const categoryList = isExpense ? expenseCategories : incomeCategories;
  const category = categoryList[Math.floor(Math.random() * categoryList.length)];
  const descList = descriptions[category];
  const description = descList[Math.floor(Math.random() * descList.length)];
  
  const amount = isExpense ? randomAmount(10, 200) : randomAmount(100, 1000);

  return {
    description,
    amount,
    type: isExpense ? 'expense' : 'income',
    category,
    date: new Date().toISOString().split('T')[0],
  };
}
