import type { Transaction, ExportOptions } from '@/types';
import { formatDate } from './formatters';

export function exportTransactions({ format, filename, transactions }: ExportOptions): void {
  const data = format === 'csv'
    ? transactionsToCSV(transactions)
    : JSON.stringify(transactions, null, 2);

  const blob = new Blob([data], {
    type: format === 'csv' ? 'text/csv' : 'application/json'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename ?? `transactions.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function transactionsToCSV(transactions: Transaction[]): string {
  const headers = ['ID', 'Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map(t => [
    t.id,
    formatDate(t.date),
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.amount.toString(),
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}
