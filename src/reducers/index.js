import { combineReducers } from 'redux';

// Reducers
import PostListReducer from './PostList-reducer';
import PostDetailsReducer from './PostDetails-reducer';
import FormReducer from './Form-reducer'


const reducers = combineReducers({
    PostListReducer,
    PostDetailsReducer,
    FormReducer
});
export default reducers;