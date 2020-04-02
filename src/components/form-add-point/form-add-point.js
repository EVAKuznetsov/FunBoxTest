import React, { Component } from 'react'
export default class FormAddPoint extends Component {
  state = {
    label: '',
  }
  //обработчик формы, вызываем функцию addPoint, передаём в неё наименование новой точки и чистим state для следующей точки
  onSubmitForm = (e) => {
    e.preventDefault()
    if (this.state.label !== '') {
      this.props.addPoint(this.state.label)
      this.setState({ label: '' })
    }
  }
  //записываем в state введённые изменения для того, чтобы сделать компоненту управляемой
  onChangeLabel = (e) => {
    this.setState({ label: e.target.value })
  }
  render() {
    return (
      <form className="form-group" onSubmit={this.onSubmitForm}>
        <input
          type="text"
          className="form-control"
          onChange={this.onChangeLabel}
          value={this.state.label}
        />
      </form>
    )
  }
}
