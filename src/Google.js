import React, {Component} from 'react';
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import Pagination from './Pagination';
import './Google.css';

const CLIENT_ID = '1054542507097-rf1phv5lrijfilc7lqeo1mpo0i9t3fip.apps.googleusercontent.com';
const id = "gwsOHpNFwMYsaCeXb2MmoCBZ_eNrD_Tp0haRCqZ3CKk"
class GoogleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: false,
            accessToken: '',
            username : '',
            imgs:[],
            currenPage : 1,
            postperpage: 2
        }
        this.login = this.login.bind(this);
        this.handleLoginFailure = this.handleLoginFailure.bind(this);
        this.logout = this.logout.bind(this);
        this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
    }

    login =(response)=>{
        if(response.accessToken){
            this.setState({
              isLogined: true,
              accessToken: response.accessToken,
              username : response.profileObj.givenName
            });
        }
    }
    handleLoginFailure = ()=>{
        console.log('Failed to log in')
    }

    logout = ()=>{
        this.setState({
            isLogined: false,
            accessToken: '',
            username: ''
          });      
    }

    componentDidMount() {
        fetch('https://api.unsplash.com/photos/?client_id=' + id)
		.then(res => res.json())
		.then(data => {
			this.setState({ imgs: data });
		})
		.catch(err => {
			console.log('Error happened during fetching!', err);
		});
    }

    handleLogoutFailure = ()=>{
        console.log('Failed to log out')
    }

    paginate =(pageNumber)=>{
            this.setState({currenPage: pageNumber});
      }
   render() {
        let images = null;
        const indexofLastPost = this.state.currenPage*this.state.postperpage;
        const indexofFirstPost = indexofLastPost - this.state.postperpage;
        let currentImages = null;
        if (this.state.isLogined) {
            images = this.state.imgs.map((item, index)=>{
                return (<div key= {index}> <img alt={item} className ="Google-img" src= {item.urls.regular}></img></div>)
            })
            currentImages =images.slice(indexofFirstPost, indexofLastPost);
        }
        
       
       return(
           <div>
               <div className="Google-login">
                   {this.state.isLogined ? <label>Welcome {this.state.username}  </label> : <label>Please log In to view Photos</label>}
                   {this.state.isLogined ?
                       <GoogleLogout
                           clientId={CLIENT_ID}
                           buttonText='Logout'
                           onLogoutSuccess={this.logout}
                           onFailure={this.handleLogoutFailure}
                       >
                       </GoogleLogout> :
                       <GoogleLogin
                           clientId={CLIENT_ID}
                           buttonText='Login'
                           onSuccess={this.login}
                           onFailure={this.handleLoginFailure}
                           cookiePolicy={'single_host_origin'}
                           responseType='code,token'
                       />}
               </div>
               <div className="Google-div">
                   {currentImages}
               </div>
               {this.state.isLogined ? <Pagination postperPage={this.state.postperpage} totalPost={this.state.imgs.length} paginate={this.paginate} number = {this.state.currenPage}></Pagination> : null}

           </div>
             
       )
   }
}

export  default  GoogleForm;

