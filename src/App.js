import Amplify, {API} from 'aws-amplify';
import config from './aws-exports'
import { AmplifyAuthenticator, AmplifySignIn, AmplifySignOut } from '@aws-amplify/ui-react';
import './App.css';
import { useEffect, useState } from 'react';

Amplify.configure(config);

function App() {

  const [orgName, setOrgName] = useState('');
  const [orgWorkspace, setOrgWorkspace] = useState('');
  const [orgConfig, setOrgConfig] = useState('');
  const [orgActive, setOrgActive] = useState(false);
  const [organizations, setOrganizations] = useState([]);

  const refreshList = () => {
    API.get('organizations', '/organizations/id')
    .then(_organizations => {
      console.log(_organizations)
      setOrganizations([ ..._organizations]);
    });
  }

  useEffect(() => {
    refreshList();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    API.post('organizations', '/organizations', {
      body: {
        name: orgName,
        workspace: orgWorkspace,
        config: orgConfig,
        active: (orgActive === "true") ? true : false
      }
    })
    .then(() => {
      refreshList();
    });
  }

  const handleEdit = e => {
    e.preventDefault();
  }

  return (
    <AmplifyAuthenticator>
      <AmplifySignIn slot="sign-in" hideSignUp></AmplifySignIn>
      <div className="App">
        <AmplifySignOut/>
        <header className="App-header">
          Authentication Server Home Page 
          <form onSubmit={handleSubmit}>
            <input value={orgName} placeholder="name" onChange={(e) => {setOrgName(e.target.value)}}></input>
            <input value={orgWorkspace} placeholder="workspace" onChange={(e) => {setOrgWorkspace(e.target.value)}}></input>
            <input value={orgConfig} placeholder="config" onChange={(e) => {setOrgConfig(e.target.value)}}></input>
            <input value={orgActive} placeholder="active" onChange={(e) => {setOrgActive(e.target.value)}}></input>
            <button>Add Organization</button>
          </form>
          <ul>
            <div key={-1} id="parent-1">
              <div class="child">{"ID"}</div>
              <div class="child">{"NAME"}</div>
              <div class="child">{"WORKSPACE"}</div>
              <div class="child">{"ACTIVE"}</div>
              <div class="child">{"UPDATE"}</div>
            </div>
            {organizations.map( organization => 
              <form key={organization.id} id="parent-2" onSubmit={handleEdit}>
                <div class="child">{organization.id}</div>
                <div class="child">{organization.name}</div>
                <div class="child">{organization.workspace}</div>
                <div class="child">{organization.active.toString()}</div>
                <div class="child"><button>EDIT</button></div>
              </form>)
            }
          </ul>
        </header>
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
