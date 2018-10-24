import * as React from 'react'
import { ComponentProps } from './AppContainer'
import HeaderContainer from '../Header/HeaderContainer'
import HomeContainer from '../Home/HomeContainer'
import ComicsContainer from '../Comics/ComicsContainer'
import ComicContainer from '../Comic/ComicContainer'
import { Loading } from '../Loading/Loading'
import { Comic } from '../Comic/Comic'
import { Switch, Route, Redirect } from 'react-router-dom';
import { ClientRoutes } from '../../../../api/enum';
import ProductsContainer from '../Products/ProductsContainer';

const defaultState = {
    loading: false
}

export class App extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    public render() {
        return (
            <div>
                 <HeaderContainer />
                 {this.state.loading ?
                 (
                     <Loading />
                 ) : (
                     <div>
                        {(<Switch>
                            <Route path={ClientRoutes.default} component={HomeContainer} />
                            <Redirect to={ClientRoutes.default} />
                        </Switch>)}
                    </div>
                 )}
                 {/* <ProductsContainer /> */}
            </div>
        )
    }
}
