import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Products } from './Products'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { actions as subActions } from '../../store/sub/action'
import { generateApiUrl } from '../../services/api';
import { config } from '../../config';
import { Product } from '../../../../api/models/sub';

const mapStateToProps = (state: RootState) => ({
    products: null || state.sub.products,
    subs: null || state.sub.subs
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    load: async () => {
        let fetchPayload = await axios.get(generateApiUrl('/v1/sub/products'), config.api.defaultConf)
        dispatch(subActions.setProducts(fetchPayload.data.data))
    },
    storeSubs: async (storeId: number) => {
        let fetchStoreSubs = await axios.get(generateApiUrl('/v1/sub/subs?storeId=' + storeId), config.api.defaultConf)
        dispatch(subActions.setSubs(fetchStoreSubs.data.data))
    }
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Products)

