import React, {Component} from 'react'
import {connect} from 'react-redux'
import {createPost, hideAlert, showAlert} from "../redux/actions";
import {Alert} from "./Alert";


class PostForm extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        title: ''
    }
    submitHandler = (e) => {
        e.preventDefault()
        const {title} = this.state
        if (!title.trim()) {
            return this.props.showAlert("Post name can not be empty")
        }
        const newPost = {title, id: Date.now().toString()}
        this.props.createPost(newPost)
        this.setState({title: ''})
    }
    changeInputHandler = (e) => {
        e.persist()
        this.setState(prev => ({
            ...prev, ...{
                [e.target.name]:
                e.target.value
            }
        }))


    }


    render() {
        return (
            <form onSubmit={this.submitHandler}>


                {this.props.alert && <Alert text={this.props.alert}/>}


                <div className="form-group">
                    <label htmlFor="title">Заголовок поста</label>
                    <input value={this.state.title}
                           name='title'
                           type="text" className="form-control"
                           id="title"
                           onChange={this.changeInputHandler}
                    />
                </div>
                <button className='btn btn-success' type='submit'>Создать</button>
            </form>
        )
    }
}

const MSTP = (state) => ({alert: state.app.alert})

const MDTP = {createPost, showAlert, hideAlert}
export default connect(MSTP, MDTP)(PostForm)