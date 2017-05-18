import { AddEventCmp } from './AddEvent';

describe('AddEvent Component:', () => {
	beforeEach(() => {
      this.cmp = new AddEventCmp;
    });
	it('shoud be truthy', () => {
		expect(this.cmp).toBeTruthy();
	});
});
