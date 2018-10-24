import * as React from 'react'
import * as _ from 'lodash'
import './style.scss'
import { ComponentProps } from './HomeContainer'
import { Link } from 'react-router-dom';
import { ClientRoutes } from '../../../../api/enum';
import { Loading } from '../Loading/Loading';

const defaultState = {
    loading: false
}

export class Home extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    public render() {
        return (
            <div>
                {this.state.loading ?
                 (
                     <Loading />
                 ) : (
                    <div>
                       <h1>Greetings</h1>
                    </div>
                 )}
            </div>
        )
    }
}
