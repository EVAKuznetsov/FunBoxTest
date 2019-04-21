import Enzyme, {shallow,render,mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {shallowToJson} from 'enzyme-to-json';


Enzyme.configure({adapter:new Adapter()})

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.shallowToJson = shallowToJson;

console.error=message=>{
    throw new Error(message)
}