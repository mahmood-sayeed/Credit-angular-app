export interface Card {
    id: number | null;
    cardNumber: string | null;
    cardHolder: string;
    expirationDate: Date;
    securityCode: string;
    amount: number;
}