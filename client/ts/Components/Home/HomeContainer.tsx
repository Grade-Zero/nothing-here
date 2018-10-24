import { connect } from 'react-redux'
import * as _ from 'lodash'
import { Home } from './Home'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import axios from 'axios';
import { withRouter } from 'react-router-dom'
import { generateApiUrl } from '../../services/api';
import { config } from '../../config';

const mapStateToProps = (state: RootState) => ({
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)

