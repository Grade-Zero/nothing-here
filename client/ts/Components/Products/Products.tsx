import * as React from 'react'
import * as _ from 'lodash'
// import './style.scss'
import { ComponentProps } from './ProductsContainer'
import { ClientRoutes } from '../../../../api/enum';
import { Loading } from '../Loading/Loading';
import { Product } from '../../../../api/models/sub';

const defaultState = {
    loading: false
}

export class Products extends React.Component<ComponentProps, typeof defaultState> {

    constructor(props: any) {
        super(props)
        this.state = defaultState
    }

    componentWillMount() {
        console.log('Products - componentWillMount')
        this.setState({loading: true}, async () => {
            await this.props.load()
            this.setState({loading: false})
        })
    }

    fetchSubs() {
        this.setState({loading: true}, async () => {
            await this.props.storeSubs(100)
            console.log(this.props.subs)
            this.setState({loading: false})
        })
    }

    public render() {
        console.log(this.props.products)
        return (
            <div>
                <p>Products></p>
                {this.state.loading ?
                 (
                     <Loading />
                 ) : (
                    <div>
                        <div className='comic-container'>
                            <a className='btn' onClick={this.fetchSubs.bind(this)}>Fetch Subs</a>
                            {(this.props.products.length === 0 && !this.state.loading) && (
                                <div className='no-content-found'>
                                    <h1>Nothing to see here</h1>
                                </div>
                            )}
                            {(this.props.products.length) ?
                                (
                                    _.map(this.props.products, (comic: Product, index: number) => {
                                        return(
                                            <div className='comic' key={index}>
                                                {/* <Link to={ClientRoutes.comic}> */}
                                                <h2>{comic.name}</h2>
                                                <p>{comic.code}</p>
                                            </div>
                                        )
                                    })
                                ) :
                                (
                                    console.log('Nothing')
                                )
                            }
                        </div>
                        <div className='comic-footer'>

                        </div>
                    </div>
                 )}
            </div>
        )
    }
}
