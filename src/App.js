import Amplify from 'aws-amplify';
import config from './aws-exports'
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import './App.css';

Amplify.configure(config);

function App() {
  return (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
      <div className="App">
        <AmplifySignOut/>
        <header className="App-header">
          Authentication Server Home Page 
        </header>
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
