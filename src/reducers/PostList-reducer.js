import * as types from '../actions/action-types';

const defaultState = {
    posts: [],
    postId: null,
    modal: {
        isOpen: false,
        title: '',
        body: '',
        buttons: []
    },
    fetchPosts: {
        isFetching: false,
        didInvalidate: false
    },
    deletePost: {
        isFetching: false,
        didInvalidate: false
    }
};

export default function(state = defaultState, action) {
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
                posts: state.posts.filter(post => post.id !== action.payload.postId),
                deletePost: {
                    isFetching: false,
                    didInvalidate: false
                }
            };
        case types.INVALIDATE_DELETE_POST:
            return {
                ...state,
                postId: action.payload.postId,
                deletePost: {
                    isFetching: false,
                    didInvalidate: true
                }
            };
        case types.OPEN_MODAL:
            return {
                ...state,
              modal: {
                isOpen: true,
                title: action.payload.modal.title,
                body: action.payload.modal.body,
                buttons: action.payload.modal.buttons
              }
            };
        case types.CLOSE_MODAL:
            return {
                ...state,
                modal: {
                    isOpen: false,
                    title: '',
                    body: '',
                    buttons: []
                }
            };
        default:
            return state;

    }
}



