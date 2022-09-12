import React, {Component} from "react";
import {Oval, ThreeDots} from "react-loader-spinner";
import {getProperties, storeJob, getUsers} from "./util/server";
import {Navigate} from "react-router-dom";

class CreateJob extends Component {

    constructor(props) {
        super(props);
        this.state = {
            summary:"",
            description:"",
            propId:"",
            userId:"",
            allProperties:null,
            allUsers:null,
            status: "open",
            error:"Something went wrong please try again later",
            redirect:false,
            loader: false,
            onSubmit:false
        };
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.allProperties();
    }

    allProperties(){
        this.setState({loader: true});

        getProperties().then((response) => {

            if (this._isMounted) {
                let result = [];
                if(response.status === 200) {
                    response.data.properties.map((value) =>
                        result.push({value: value.id, label: value.name}),
                    );
                    this.setState({allProperties: result});
                    this.allUsers();
                }else{
                    this.setState({allProperties: null})
                }
            }
        })
        .catch((error) =>  {
            this.setState({allProperties: null, loader:false})
            throw Error(error.message)
        });
    }

    allUsers(){

        getUsers().then((response) => {

            if (this._isMounted) {
                let result = [];
                if(response.status === 200) {
                    response.data.users.map((value) =>
                        result.push({value: value.id, label: value.number}),
                    );
                    this.setState({allUsers: result, loader:false});
                }else{
                    this.setState({allUsers: null})
                }
            }
        })
            .catch((error) =>  {
                this.setState({allUsers: null, loader:false})
                throw Error(error.message)
            });
    }

    onChangeSelect(value, e){
        this.setState({[value]:e.target.value});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { summary, description, propId, status, userId } = this.state;
        this.setState({onSubmit: true});

        storeJob(summary, description, propId, status, userId ).then((response) => {
            this.setState({onSubmit: false});
            if (this._isMounted) {
                if(response.status === 201) {
                    this.setState({redirect:true});
                }
            }
        })
            .catch((error) =>  {
                this.setState({onSubmit:false})
                throw Error(error.message)
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        if(this.state.redirect) {
            sessionStorage.setItem("creat-job", "job created");
            return <Navigate to={{pathname:'/'}}/>
        }

        return (
            <div className="col-6 mx-auto">
                {(this.state.allProperties !== null && this.state.allUsers && !this.state.loader)?<>
                    <h3 className="mb-4">Create Job</h3>

                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label>Summary</label>
                            <input type="text" className="form-control" maxLength="150" onChange={e => this.setState({summary:e.target.value})} required/>
                        </div>
                        <div className="mb-3">
                            <label>Description</label>
                            <textarea className="form-control" maxLength="500" onChange={e => this.setState({description: e.target.value})} required/>
                        </div>
                        <div className="mb-3">
                            <label>Select Property</label>
                            <select className="form-select" onChange={e => this.onChangeSelect("propId", e)} required>
                                <option value=""/>
                                { this.state.allProperties.map((item, i) =>
                                    <option key={i} value={item.value}>{item.label}</option>
                                )}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label>Select Staff id number</label>
                            <select className="form-select" onChange={e => this.onChangeSelect("userId", e)} required>
                                <option value=""/>
                                { this.state.allUsers.map((item, i) =>
                                    <option key={i} value={item.value}>{item.label}</option>
                                )}
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary">{(!this.state.onSubmit)?"Create job":
                                <ThreeDots height="25" width="30" radius="9" color="#ffffff" ariaLabel="three-dots-loading" wrapperStyle={{}} wrapperClassName="" visible={true}
                            />}</button>
                        </div>
                    </form>
                </>:(!this.state.loader)?<h6 className="mt-5 text-danger">{this.state.error}</h6>:<div className="pt-5"><Oval type="Circles" color="#4287f5" height={50} width={50}/></div>}
            </div>
        )
    }
}

export default CreateJob;
