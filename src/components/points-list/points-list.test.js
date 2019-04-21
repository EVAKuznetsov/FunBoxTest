import React from 'react'
import PointsList from './points-list'

describe('Tests for Point list',()=>{ 
  const props = {
    points:[
      {
        id:990,
        label:'Первая точка',
        position:[55.75,37.68]        
      },
      {
        id:991,
        label:'Вторая точка',
        position:[55.77,37.61]        
      }
    ],
    delPoint:jest.fn(),
    onChangeOderPoints:jest.fn()
  }
  const pointList = mount(<PointsList {...props} />);
  it('renders pointList',()=>{
    expect(shallowToJson(pointList)).toMatchSnapshot()
  })
  it('Count of points',()=>{
    const items = pointList.find('li.list-group-item');
    expect(items).toHaveLength(props.points.length);
  })
  it('Dellet point',()=>{
    const delBtn = pointList.find('button.del-icon');
    delBtn.first().simulate('click');
    expect(props.delPoint).toBeCalled();
  })
  it('label from props',()=>{
    const items = pointList.find('li.list-group-item');
    expect(items.first().text()).toEqual(props.points[0].label+'x');
  })
})