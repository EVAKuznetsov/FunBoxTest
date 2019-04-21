import React, { Component } from 'react';
import './App.css';
import FormAddPoint from '../form-add-point'
import PointsList  from '../points-list'
import Map from '../map'


export default class App extends Component {
  id=1;
  state={
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
        },
        {
          id:992,
          label:'Третья точка',
          position:[55.71, 37.61]        
        }
      // this.createPoint('Первая точка'),
      // this.createPoint('Вторая точка'),
      // this.createPoint('четвёртая точка'),
      // this.createPoint('Третья точка')
    ]
  }
  //создаём новую точку
  createPoint(label){
    const center = [...this.state.mapCenter];
    return{
      id:this.id++,
      label,
      position:center
    }
  }
  //получаем координаты точки и перезаписываем в state
  onChangePosition=(position,id)=>{
    this.setState(({points})=>{
      const idx = points.findIndex(point=>point.id===id);
      const newPoints = [...points];
      newPoints[idx].position = position;
      return (
        {points:newPoints}
      )
    })    
  }
  //получаем список точек с новым порядком элементов внутри и перезаписываем
  onChangeOderPoints=(points)=>{
    this.setState({points})
  }
  //получаем координаты центра карты и перезаписываем в state
  onChangeMapCenter=(mapCenter)=>{
    this.setState({mapCenter});
  }
  //добавляем точку в state с переданным новым именем
  addPoint=(label)=>{
    const newPoint = this.createPoint(label);//вызываем функцию создания новой точки
    this.setState(({points})=>{
      const newPointList=[...points,newPoint];
      return {points:newPointList}
    });
  }
  //удаляем точку из state-ов по переданному id
  delPoint = (id)=>{
    console.log(`удалить${id}`);
    this.setState(({points})=>{
        const idx = points.findIndex((el)=>el.id===id);
        const newPoints = [...points];
        newPoints.splice(idx,1);
        return{points:newPoints}
      })
  }

  render(){
    const {points,mapCenter} = this.state;
    return (
      
      <div className="container mt-4">
        <div className="row jumbotron p-5">
        
          <div className="col-md-4 mb-4">            
            <div>
              <FormAddPoint addPoint={this.addPoint}/>
            </div>
            <div>
              <PointsList points = {points} 
                  delPoint = {this.delPoint}
                  onChangeOderPoints={this.onChangeOderPoints}/>
            </div>              
          </div>
          <div className="col-md-8">
            <Map points ={points} mapCenter={mapCenter} 
                onChangePosition={this.onChangePosition}
                onChangeMapCenter={this.onChangeMapCenter}/>
          </div>
        </div>
      </div>
    );
  }
}


