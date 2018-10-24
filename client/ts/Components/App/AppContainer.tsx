import * as _ from 'lodash'
import { connect } from 'react-redux'
import { App } from './App'
import { RootState } from '../../store';
import { Dispatch } from 'redux';
import { withRouter } from 'react-router-dom'
import axios from 'axios';
import { generateApiUrl } from '../../services/api';
import { config } from '../../config';

const mapStateToProps = (state: RootState) => ({
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
})

export type ComponentProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(App)
export default (withRouter as any)(connectedComponent)


