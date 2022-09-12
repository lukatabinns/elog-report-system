import React, {Component} from "react";
import {Link} from "react-router-dom";
import {getJobs} from "./util/server";
import {Oval} from "react-loader-spinner";

class ShowJobs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error:"Something went wrong please try again later",
            loader: false,
            allJobs:null
        };
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        this.allJobs();
    }

    allJobs(){
        this.setState({loader: true});

        getJobs().then((response) => {

            if (this._isMounted) {
                if(response.status === 200) {
                    this.setState({allJobs: response.data.jobs, loader:false});
                }else{
                    this.setState({allJobs: null})
                }
            }
        })
            .catch((error) =>  {
                this.setState({allJobs: null, loader:false})
                throw Error(error.message)
            });
    }

    componentWillUnmount() {
        this._isMounted = false;
        sessionStorage.removeItem("creat-job");
    }

    render() {
        const jobCreated = sessionStorage.getItem("creat-job");

        return (
            (this.state.allJobs !== null)?<div>
                <div className="row">
                    <div className="col-10"><h4>All Jobs</h4></div>
                    <div className="col-2">
                        <Link className="btn btn-primary" to="/create-job"><i className="fa fa-plus"/> Create Job</Link>
                        <div className="pt-3 pb-3 text-success">{(jobCreated !== null)?"Job created successfully":null}</div>
                    </div>
                </div>
                { (this.state.allJobs.length > 0)?<table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th width="60%" scope="col">Summary</th>
                        <th scope="col">Status</th>
                        <th scope="col">Property name</th>
                        <th scope="col">Raised By</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.allJobs.map((value, i) =>
                            <tr key={i}>
                                <td>{value.id}</td>
                                <td>{value.summary}</td>
                                <td>{value.status}</td>
                                <td>{value.property.name}</td>
                                <td>{value.user.first_name + " "+ value.user.last_name}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>:<h5>No data found</h5>}
            </div>:<div className="col-6 mx-auto mt-5"><Oval type="Circles" color="#4287f5" height={50} width={50}/></div>
        )
    }
}
export default ShowJobs;
