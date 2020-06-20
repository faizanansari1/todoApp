import React, { Component } from 'react';
import { TextField, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default class Todo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            title: '',
            description: '',
            rows: [],
            itemIndex: null,
            create: true,
            error1: false,
            error2: false,
            error3: false
        }
    }

    onChangeText = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onDelete(index) {
        var array = [...this.state.rows];
        array.splice(index, 1);
        this.setState({ rows: array }, () => {
            this.setState({
                error3: true
            })
        })
    }

    onCreate(e) {
        this.setState({ create: true }, () => {
            this.onSubmit(e);
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { create, rows, title, description, itemIndex } = this.state;

        if (title !== '' && description !== '') {

            if (create) {
                var array = [...rows];
                let obj = {
                    title: title,
                    description: description,
                }
                array.push(obj)
                this.setState({ rows: array }, () => {
                    this.setState({ title: '', description: '', error1: true })
                })
            } else {
                var newarray = [...rows]
                newarray[itemIndex].title = title;
                newarray[itemIndex].description = description;
                this.setState({ rows: newarray }, () => {
                    this.setState({ title: '', description: '', create: true })
                })
            }

        } else {
            this.setState({ error2: true })
        }
    };
    onUpdate = (index) => {
        var array = [...this.state.rows];
        var title = array[index].title;
        var description = array[index].description;
        this.setState({
            create: false,
            itemIndex: index,
            title: title,
            description: description,
            error2: false
        })
    }

    handleClose = () => {
        this.setState({ error1: false, error2: false, error3: false })
    }
    render() {
        const { title, description, rows } = this.state;
        return (
            <div>
                <Snackbar open={this.state.error1} autoHideDuration={5000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Successfully added.
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.error2} autoHideDuration={5000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="error">
                        please Enter Empty Feild.
                    </Alert>
                </Snackbar>
                <Snackbar open={this.state.error3} autoHideDuration={5000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="info">
                        Removed Successful
                    </Alert>
                </Snackbar>
                <div className="container">
                    <form onSubmit={this.onSubmit}>
                        <div className="heading"><h1>To-Do <span>app</span></h1></div>
                        <div className="content">
                            <div className="title">
                                <TextField
                                    className="input"
                                    placeholder="Title"
                                    name="title"
                                    id="outlined-basic"
                                    // label="Title"
                                    variant="outlined"
                                    value={title}
                                    fullWidth
                                    onChange={this.onChangeText}
                                />
                            </div>
                            <div className="discription">
                                <TextField
                                    className="input"
                                    placeholder="Description"
                                    name="description"
                                    id="outlined-basic"
                                    // label="Description"
                                    variant="outlined"
                                    fullWidth
                                    value={description}
                                    onChange={this.onChangeText}
                                />
                            </div>
                            <Button
                                className="button"
                                fullWidth
                                variant="outlined"
                                // color="secondary"
                                type="submit"
                                onClick={() => this.onCreate}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>

                    <div className="table-content">
                        <TableContainer>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width="10%" align="center" className="tab-heading"><h4>No</h4></TableCell>
                                        <TableCell align="center" width="20%" className="tab-heading"><h4>Title</h4></TableCell>
                                        <TableCell align="center" width="50%" className="tab-heading"><h4>Description</h4></TableCell>
                                        <TableCell align="center" width="20%" className="tab-heading"><h4>Actions</h4></TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((item, index) => {
                                        return (
                                            <TableRow key={index} className="row">
                                                <TableCell align="center" className="col"><span>{index + 1}</span></TableCell>
                                                <TableCell align="center" className="col"><span>{item.title}</span></TableCell>
                                                <TableCell align="center" className="col"><span>{item.description}</span></TableCell>
                                                <TableCell className="btn-col">
                                                    <Button className="action-btn" onClick={() => this.onUpdate(index)}>Edit</Button>
                                                    <Button className="action-btn" onClick={() => this.onDelete(index)}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>



                </div>
            </div>
        );
    }



}


