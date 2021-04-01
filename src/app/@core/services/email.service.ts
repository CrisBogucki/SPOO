import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class EmailService {

    constructor(private http: HttpClient) {
    }

    send() {
        return this.http.post('https://mandrillapp.com/api/1.0/messages/send.json', {
            key: 'ZcvEaSnl9HWrhzZRghuxzQ',
            message: {
                from_email: 'krzysztof.lubien@icloud.com',
                to: [{
                    email: 'krzysztof.lubien@icloud.com',
                    name: 'Przedszkople',
                    type: 'to'
                }],
                auto_text: null,
                subject: 'Twoja płatność za miesiąć marzec 2021',
                html: 'Wiadomość o płatności '
            }
        }).subscribe(() => {
            console.log('Wysłano email.');
        }, error => {
            console.log('Błąd wysłano email.' + error);
        });
    }

}
