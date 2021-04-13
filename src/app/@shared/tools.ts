export class Tools {

    static getPolishDay(day: string): string {
        switch (day) {
            case 'Mon':
                day = 'Poniedziałek';
                break;
            case 'Tue':
                day = 'Wtorek';
                break;
            case 'Wed':
                day = 'Środa';
                break;
            case 'Thu':
                day = 'Czwartek';
                break;
            case 'Fri':
                day = 'Piątek';
                break;
            case 'Sat':
                day = 'Sobota';
                break;
            case 'Sun':
                day = 'Niedziela';
                break;
        }

        return day;
    }

}
