import {connect} from 'react-redux';

import Link from '../components/Link';
import {setVIsibilityFilter} from '../actions';

const mapStateToLinkProps = (
    state,
    ownProps
) => ({
    active: ownProps.filter === state.visibilityFilter
});

const mapDispatchToLinkProps = (
    dispatch,
    ownProps
) => ({
    onClick() {
        dispatch(
            setVIsibilityFilter(ownProps.filter)
        )
    }
});

export default connect(
    mapStateToLinkProps,
    mapDispatchToLinkProps
)(Link);
