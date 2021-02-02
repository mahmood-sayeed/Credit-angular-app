import { InMemoryDbService } from 'angular-in-memory-web-api';

import { Card } from './card';

export class CardData implements InMemoryDbService {

    createDb() {
        const card: Card = {
            cardNumber: '',
            cardHolder: '',
            expirationDate: new Date(),
            securityCode: '',
            amount: 0
        } ;
        return {card} ;
    }
}
