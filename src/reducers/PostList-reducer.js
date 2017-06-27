import * as types from '../actions/action-types';

const defaultState = {
    posts: [],
    postId: null,
    fetchPosts: {
        isFetching: false,
        didInvalidate: false
    },
    deletePost: {
        isFetching: false,
        didInvalidate: false
    }
};

export default function(state = defaultState, action) { console.log(action.type);
    switch (action.type) {
        case types.FETCH_POSTS:
            return {
                ...state,
                fetchPosts: {
                    isFetching: true,
                    didInvalidate: false
                }
            };
        case types.RECEIVE_POSTS:
            console.log('receive', action.payload.posts);
            return {
                ...state,
                posts: action.payload.posts,
                fetchPosts: {
                    isFetching: false,
                    didInvalidate: false
                }
            };
        case types.INVALIDATE_POSTS:
            return {
                ...state,
                fetchPosts: {
                    isFetching: false,
                    didInvalidate: true
                }
            };
        case types.DELETE_POST:
            return {
                ...state,
                deletePost: {
                    isFetching: true,
                    didInvalidate: false
                }
            };
        case types.HANDLE_DELETE_POST:
            return {
                ...state,
                deletePost: {
                    isFetching: false,
                    didInvalidate: false
                }
            };
        case types.INVALIDATE_DELETE_POST:
            return {
                ...state,
                postId: action.payload.postId,
                posts: action.payload.posts.filter(post => post.id !== action.payload.postId),
                deletePost: {
                    isFetching: false,
                    didInvalidate: true
                }
            };
        default:
            return state;

    }
}



