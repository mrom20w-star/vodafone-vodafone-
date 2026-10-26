export type AppScreen = 
  | 'INITIAL_PIN' 
  | 'HOME' 
  | 'TRANSFER_INPUT' 
  | 'TRANSFER_CONFIRM' 
  | 'TRANSFER_PIN' 
  | 'TRANSFER_SUCCESS'
  | 'DEPOSIT_INPUT'
  | 'DEPOSIT_SUCCESS';

export interface Transaction {
  id: string;
  senderPhone: string;
  recipientPhone: string;
  recipientName: string;
  amount: number;
  fee: number;
  totalAmount: number;
  dateTime: string;
  referenceNumber: string;
}

export interface FavoriteContact {
  name: string;
  phone: string;
  maskedName?: string;
}
