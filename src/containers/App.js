import { connect } from 'react-redux';
import App from '../components/App';

const mapStateToProps = state => ({
    language: state.language
});

export default connect(mapStateToProps)(App);

