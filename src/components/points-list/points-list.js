import React, { Component } from 'react'
import './point-list.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
export default class PointsList extends Component {
  state = {
    points: [],
  }
  //проверяем на изменение входящих props и перерисовываем компонент в случае несоответствия
  componentDidUpdate(prevProps) {
    if (prevProps.points !== this.props.points) {
      this.setState({ points: this.props.points })
    }
  }
  //при прорисовки компонента, проверяем на заполненость массива точек в состоянии данного компонента и в случае, если массив пустой, то перезаписываем в state массив из props-ов
  componentDidMount() {
    if (this.state.points.length === 0) {
      this.setState({ points: this.props.points })
    }
  }
  //получаем новый порядок элементов в массиве точек и отправляем его на перезапись
  dragEnd(e) {
    const { destination, source } = e
    if (!destination) {
      return
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }
    const dropElement = this.state.points[source.index]
    const data = Array.from(this.state.points)
    data.splice(source.index, 1)
    data.splice(destination.index, 0, dropElement)
    this.props.onChangeOderPoints(data)
  }
  render() {
    const { delPoint } = this.props
    const list = this.state.points.map((item, i) => {
      return (
        <Draggable key={item.id} draggableId={item.id} index={i}>
          {(provided) => (
            <li
              className="list-group-item"
              ref={provided.innerRef}
              draggable="true"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {item.label}
              <button className="del-icon" onClick={() => delPoint(item.id)}>
                x
              </button>
            </li>
          )}
        </Draggable>
      )
    })
    return (
      <DragDropContext onDragEnd={(e) => this.dragEnd(e)}>
        <Droppable droppableId="droppable">
          {(provided) => {
            return (
              <ul className="list-group" ref={provided.innerRef}>
                {list}
                {provided.placeholder}
              </ul>
            )
          }}
        </Droppable>
      </DragDropContext>
    )
  }
}
