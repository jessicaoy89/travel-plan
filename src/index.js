import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import LoadingButton from './components/PlanButton';
import SortableTable from './components/DraggableList';
import DiscoverList from "./components/DiscoverList";


ReactDOM.render(
    <React.StrictMode>
        <div>
            {/*<div className="column DiscoverList" className="column App">*/}
            {/*    <DiscoverList>*/}
            {/*        discoverList*/}
            {/*    </DiscoverList>*/}
            {/*</div>*/}

            <div >
                <App>
                    <p>
                        app
                    </p>
                    <LoadingButton>
                        <p>
                            loadingButton
                        </p>
                    </LoadingButton>
                    <SortableTable>
                        <p>
                            sortableTable
                        </p>
                    </SortableTable>
                </App>
            </div>
        </div>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
