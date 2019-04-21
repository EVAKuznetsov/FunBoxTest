import React from 'react'
import FormAddPoint from './form-add-point'

describe('Form add point',()=>{ 
  const props = {
    addPoint:jest.fn()
  }
  const formAddPoint = shallow(<FormAddPoint {...props} />);
  it('renders form',()=>{
    expect(shallowToJson(formAddPoint)).toMatchSnapshot()
  })
  it('isForm',()=>{
    expect(formAddPoint.find('form')).toHaveLength(1)
  })
  it('entry in state',()=>{
    const input = formAddPoint.find('input');          
    input.simulate('change', { target: { value: 'test text' } });
    expect(formAddPoint.state().label).toEqual('test text');
  })
  it('submit',()=>{
    const form = formAddPoint.find('form');
    const input = formAddPoint.find('input');          
    input.simulate('change', { target: { value: 'test text' } });
    form.simulate('submit',{ preventDefault() {} });
    expect(props.addPoint).toBeCalled();
    expect(formAddPoint.state().label).toEqual('');
  })  
})