import {AppPage} from './app.po';

describe('Projekt testów systemu SPoO', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('Powinien sprawdzić czy tytuł strony jest -> ' +
        '[System Powiadomień o Opłatach] ', () => {
        page.navigateTo();
        expect(page.getTitleText())
            .toEqual('System Powiadomień o Opłatach');
    });

});
