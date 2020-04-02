import React, { Component } from 'react'
import { YMaps, Map, Placemark, Polyline } from 'react-yandex-maps'
export default class MapContainer extends Component {
  state = {
    points: [],
  }
  //проверяем на изменение входящих props и перерисовываем компонент в случае несоответствия
  componentDidUpdate(prevProps) {
    if (prevProps.points !== this.props.points) {
      this.setState({
        points: this.props.points,
      })
    }
  }
  //при прорисовки компонента, проверяем на заполненость массива точек в состоянии данного компонента и в случае, если массив пустой, то перезаписываем в state массив из props-ов
  componentDidMount() {
    if (this.state.points.length === 0) {
      this.setState({ points: this.props.points })
    }
  }
  //получаем координаты точки после перетаскивания и отправляем на перезапись в компоненту App
  onMarkerDragEnd = (e, id) => {
    const position = e.originalEvent.target.geometry._coordinates
    this.props.onChangePosition(position, id)
  }
  //получаем координаты центра карты при её смещении и отправляем на перезапись
  onBoundsChange = (map) => {
    this.props.onChangeMapCenter(map._cache.newCenter)
  }

  render() {
    //добавляем размеры для карты
    const style = {
      width: '100%',
      height: '400px',
    }
    //получаем список координат точек для отрисовки линий
    const routes = this.state.points.map((marker) => marker.position)
    //создаём массив маркеров
    const markers = this.state.points.map((point, i) => {
      return (
        <Placemark
          key={point.id}
          geometry={point.position}
          options={{
            draggable: true,
          }}
          properties={{
            hintContent: point.label,
            balloonContent: point.label,
          }}
          modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
          onDragend={(e) => this.onMarkerDragEnd(e, point.id)}
        />
      )
    })

    return (
      <YMaps>
        <div>
          <Map
            {...style}
            defaultState={{ center: this.props.mapCenter, zoom: 9 }}
            onBoundsChange={(map) => this.onBoundsChange(map)}
          >
            {markers}
            <Polyline
              geometry={routes}
              options={{
                balloonCloseButton: false,
                strokeColor: '#000',
                strokeWidth: 4,
                strokeOpacity: 0.5,
              }}
            />
          </Map>
        </div>
      </YMaps>
    )
  }
}
