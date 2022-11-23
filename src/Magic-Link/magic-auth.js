import React, { Component } from 'react';
import { Magic } from 'magic-sdk';
const magic = new Magic('pk_live_ACA5EB5446CB24D7');

class MagicAuth extends Component {

    constructor(props) {
        super(props);
        this.state = {value: '', user: null, isLoggedIn: false };
    
        // This binding is necessary to make `this` work in the callback
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }
      componentDidMount() {
        this.renderUser();
    }

    async renderUser() {
        const callback = window.location.pathname === '/callback';
        console.log("callback",callback);
        if(callback){
            try {
                /* Complete the "authentication callback" */
                 await magic.auth.loginWithCredential();
   
                 /* Get user metadata including email */
                const userMetadata = await magic.user.getMetadata(); 
                console.log("userMetadata",userMetadata);
                this.setState({user: userMetadata, isLoggedIn: true});
             } catch {
                 /* In the event of an error, we'll go back to the login page */
                 window.location.href = window.location.origin;
                 console.log(window.location.href);
             }
        }
        const isLoggedIn = await magic.user.isLoggedIn();
        if(isLoggedIn){
            const userMetadata = await magic.user.getMetadata();
            this.setState({user: userMetadata.email});
            this.setState({isLoggedIn: true});
        }
    }
    render() {
        const isLoggedIn = this.state.isLoggedIn;
        console.log("isLoggedIn: render",isLoggedIn);
        if(isLoggedIn){
            return (
                <div>
                    <h1>Welcome {this.state.user}</h1>
                    <button onClick={this.handleLogout}>Logout</button>
                </div>
            )
        }
           
        return this.signupForm();
    }

    signupForm(){
        return (
            <div>
                <h1>Please sign up or login</h1>
                <form onSubmit={this.handleLogin}>
                <input type="email" 
                    name="email" 
                    required="required" 
                    placeholder="Enter your email"
                    value={this.state.value}
                    onChange={this.handleChange} />
                <button type="submit" value="Submit">Send</button>
                </form>
            </div>
        )
    }

    handleChange(event) {
        this.setState({value: event.target.value});
        console.log(this.state.value);
    }

    async handleLogin(e){
        console.log("handleLogin", this.state.value);
        e.preventDefault();
        const email = this.state.value;
        console.log(email);
        const redirectURI = `${window.location.origin}/callback`;
        if(email){
            console.log('here', email)
            await magic.auth.loginWithMagicLink({ email, redirectURI });
            this.setState({isLoggedIn: true});
        }
        // render component again
        
    }

    async handleLogout(e){
        e.preventDefault();
        await magic.user.logout();
        this.setState({isLoggedIn: false});
    }
}


// /* 3. Implement Render Function */
// const MagicAuth = async () => {
//     let html = '';
  
//     /*
//       For this tutorial, our callback route is simply "/callback"
//     */
//     if (window.location.pathname === '/callback') {
//       try {
//         /* Complete the "authentication callback" */
//         await magic.auth.loginWithCredential();
  
//         /* Get user metadata including email */
//         const userMetadata = await magic.user.getMetadata();
  
//         html = `
//           <h1>Current user: ${userMetadata.email}</h1>
//           <button onclick="handleLogout()">Logout</button>
//         `;
//       } catch {
//         /* In the event of an error, we'll go back to the login page */
//         window.location.href = window.location.origin;
//       }
//     } else {
//       const isLoggedIn = await magic.user.isLoggedIn();
//         console.log(isLoggedIn);
//       /* Show login form if user is not logged in */
//       html = `
//         <h1>Please sign up or login</h1>
//         <form onsubmit="handleLogin(event)">
//           <input type="email" name="email" required="required" placeholder="Enter your email" />
//           <button type="submit">Send</button>
//         </form>
//       `;
  
//       if (isLoggedIn) {
//         /* Get user metadata including email */
//         const userMetadata = await magic.user.getMetadata();
//         html = `
//           <h1>Current user: ${userMetadata.email}</h1>
//           <button onclick="handleLogout()">Logout</button>
//         `;
//       }
//     }
  
//    return html;
//   };

  
// /* 4. Implement Login Handler */
// const handleLogin = async e => {
//     e.preventDefault();
//     const email = new FormData(e.target).get('email');
//     const redirectURI = `${window.location.origin}/callback`; // 👈 This will be our callback URI
//     if (email) {
//       /* One-liner login 🤯 */
//       await magic.auth.loginWithMagicLink({ email, redirectURI }); // 👈 Notice the additional parameter!
//       MagicAuth();
//     }
//   };

//   const handleLogout = async () => {
//     await magic.user.logout();
//     MagicAuth();
//   };


  export default MagicAuth;