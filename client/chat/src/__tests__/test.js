import React from 'react';
import { shallow, mount } from 'enzyme';

import User from '../components/User.jsx';
import Message from '../components/Message.jsx';
import ButtonWidget from '../components/ButtonWidget.jsx';
import Widget from '../components/Widget.jsx';
import LeftBar from '../components/LeftBar.jsx';
import Chat from '../components/Chat.jsx';


describe('USER COMPONENT', () => {

    test('Message component renders props correctly', () => {
        const message = mount(<Message time="testTime" user="testUser" message="testMessage" />);
        expect(message.props().time).toEqual('testTime');
        expect(message.props().user).toEqual('testUser');
        expect(message.props().message).toEqual('testMessage');
        expect(message.text()).toEqual('testTime:testUser:testMessage');
      });
})

describe('MESSAGE COMPONENT', () => {

    test('User component renders props correctly', () => {
        const user = mount(<User color="testColor" name="testName" />);
        expect(user.text()).toEqual('testName');
        expect(user.props().name).toEqual('testName');
        expect(user.props().color).toEqual('testColor');
      });
})

describe('BUTTON WIDGET COMPONENT', () => {

    const mockEvent = {preventDefault: () => {}};
    const spy = jest.fn();
    
    test('ButtonWidget component shows disconnect on connected=false', () => {
        const buttonWidget = shallow(<ButtonWidget connected={false} />);
        expect(buttonWidget.find('button').text()).toEqual('connect');
      });

    test('ButtonWidget component shows connect on connected=true', () => {
        const buttonWidget = shallow(<ButtonWidget connected={true} />);
        expect(buttonWidget.find('button').text()).toEqual('disconnect');
      });

    test('ButtonWidget component calls disconnect()', () => {
        const buttonWidget = shallow(<ButtonWidget connected={true} disconnect={spy} />)
        const button = buttonWidget.find('button');
        button.simulate('click', mockEvent);
        expect(spy).toHaveBeenCalled();
    });

    test('ButtonWidget component calls connect()', () => {
        const buttonWidget = shallow(<ButtonWidget connected={false} connect={spy} />)
        const button = buttonWidget.find('button');
        button.simulate('click', mockEvent);
        expect(spy).toHaveBeenCalled();
    });

});


describe('WIDGET COMPONENT', () => {
    
    const mockEvent = {preventDefault: () => {}};
    const spy = jest.fn();

    test('Widget component calls actionHandler()', () => {
        const widget = shallow(<Widget actionHandler={spy} />)
        const button = widget.find('button');
        button.simulate('click', mockEvent);
        expect(spy).toHaveBeenCalled();
    });

});

describe('CHAT COMPONENT', () => {

    test('Chat renders 12 messages', () => {
        const chat = shallow(<Chat messages={Array(12).fill({timestamp:'time', color:'clr', data:'msg', userId:'user'})} />);
        expect(chat.find('div').children()).toHaveLength(12);
    });

});

describe('LEFTBAR COMPONENT', () => {
    
    test('LeftBar renders 8 users', () => {
        const leftBar = shallow(<LeftBar users={Array(8).fill({name:'name', color:'clr'})} />);
        expect(leftBar.find('div').children()).toHaveLength(8);
    });

});

