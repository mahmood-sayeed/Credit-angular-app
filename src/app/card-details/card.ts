export interface Card {
    cardNumber: string | null;
    cardHolder: string;
    expirationDate: Date;
    securityCode: string;
    amount: number;
}