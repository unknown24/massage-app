import React from 'react';
import NavigationTestUtils from 'react-navigation/NavigationTestUtils';
import renderer from 'react-test-renderer';

import Pesan from '../../screens/Pesan';

console.error = function(){
    return false
}

console.warn = function(){
    return false
}


describe('App', () => {
    const currentDate = new Date('2019-05-14T11:01:58.135Z');
    global.Date = class extends Date {
        constructor(date) {
        if (date) {
            return super(date);
        }

        return currentDate;
        }
    };

    let getParam = jest.fn()
    getParam.mockReturnValue('produk')

    const navigation = { 
        getParam,
        navigate: jest.fn() 
    };

    beforeEach(() => {
        // NavigationTestUtils.resetInternalState();
    });

    it(`renders the Pesan screen`, () => {
        const tree = renderer.create(<Pesan navigation={navigation} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    
});