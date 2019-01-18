import React, { Component } from 'react';
import { getList, addToList, deleteItem, updateItem } from '../listFunction';

class List extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      listItem: '',
      items: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    this.getAll();
  }

  onChange = e => {
    this.setState({listItem: e.target.value});
  }

  onSubmit = e => {
    e.preventDefault();
    addToList(this.state.listItem).then(() => {
      this.getAll();
    });
  }

  onUpdate = e => {
    e.preventDefault();
    updateItem(this.state.listItem, this.state.id).then(() => {
      this.getAll();
    });
  }

  onEdit = (itemId, item, e) => {
    e.preventDefault();
    this.setState({
      id: itemId,
      listItem: item
    })
  }

  onDelete = (id, e) => {
    e.preventDefault();
    deleteItem(id).then(() => {
      this.getAll();
    });
  }

  getAll = () => {
    getList().then(data => {
      this.setState({
        id: '',
        listItem: '',
        items: [...data]
      }, () => console.log(this.state.items));
    });
  }

  render() {
    return(
      <div className="col-md-12">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <div className="row">
              <div className="col-md-9">
                <input type="text" className="form-control" id="taskName"
                value={this.state.listItem || ""} onChange={this.onChange.bind(this)} />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={this.onUpdate.bind(this)}>Update</button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success" onClick={this.onSubmit.bind(this)}>Submit</button>
        </form>
        <h4 className="text-left mt-3">Tasks List</h4>
        <ul className="list-group mt-3">
          {this.state.items.map((item, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              <span className="text-left">{item.list}</span>
              <div className="row">
              <button href="" className="btn btn-info mr-1" onClick={this.onEdit.bind(this, item._id, item.list)}>Edit</button>
                <button href="" className="btn btn-danger" onClick={this.onDelete.bind(this, item._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List;