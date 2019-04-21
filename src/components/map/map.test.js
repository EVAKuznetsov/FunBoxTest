import React from 'react'
import Map from './map'

describe('Tests for Map',()=>{ 
    const props = {
        onChangePosition:jest.fn(),
        onChangeMapCenter:jest.fn(),
        mapCenter:[55.75,37.62],        
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
        ]
    }
    const map = mount(<Map {...props} />);
    it('points in State of component equal points of props',()=>{
        const pointsState = map.state().points;
        expect(pointsState).toEqual(props.points);
    })
  })