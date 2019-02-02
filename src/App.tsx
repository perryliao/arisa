import * as React from 'react';
import './App.css';
import logo from './logo.svg';
import {PartnerCatalog} from "./containers/PartnerCatalog";

class App extends React.Component {

    public render() {
        return (
            <div className="App">
                <PartnerCatalog/>
            </div>
        );
    }
}

export default App;
