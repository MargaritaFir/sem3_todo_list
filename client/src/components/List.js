import React, { Component } from 'react';
import { getList, addToList, deleteItem, updateItem } from '../listFunction';
import './list.css';

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
      <div className="col-md-12 form-position">
        <form onSubmit={this.onSubmit} >
          <div className="form-group ">
            <label htmlFor="taskName"> New task</label>
            <div className="row">
              <div className="col-md-10">
                <input type="text" className="form-control " id="taskName"
                value={this.state.listItem || ""} onChange={this.onChange.bind(this)} />
              </div>
              <div className="col-md-2">
                <button className="btn btn-primary" onClick={this.onUpdate.bind(this)}>Update task</button>
          </div>

            </div>
          </div>
          <div className="row ">
          <div className="col-md-4">
          <button type="submit" className="btn btn-success" onClick={this.onSubmit.bind(this)}>Add new task</button>
          </div>
          </div>
        </form>
        <h4 className="text-left mt-3">Tasks List</h4>
        <ul className="list-group mt-3">
          {this.state.items.map((item, i) => (
            <li key={i} className="list-group-item d-flex justify-content-between align-items-center">
              <span className="text-left">{item.list}</span>
              <div className="row">
              <span href="" className=" span-btn btn-color btn-edit " onClick={this.onEdit.bind(this, item._id, item.list)}><i class="fas fa-pencil-alt"></i></span>
                <span href="" className=" span-btn btn-color btn-delete" onClick={this.onDelete.bind(this, item._id)}><i class="fas fa-trash-alt"></i></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default List;