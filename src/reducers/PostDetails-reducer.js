import * as types from '../actions/action-types';

const defaultState = {
    users: [],
    comments: [],
    post: {
        id:  null,
        title: '',
        body: '',
        userId: null,
    },
    fetchSinglePost: {
        isFetching: false,
        didInvalidate: false
    },
    fetchUsers: {
        isFetching: false,
        didInvalidate: false
    },
    fetchComments: {
        isFetching: false,
        didInvalidate: false
    }
};

export default function(state = defaultState, action) {
    switch (action.type) {

        case types.FETCH_SINGLE_POST:
            return {
                ...state,
                fetchSinglePost: {
                    isFetching: true,
                    didInvalidate: false
                }
            };
        case types.RECEIVE_SINGLE_POST:
            return {
                ...state,
                post: {
                    id: action.payload.post.id,
                    title: action.payload.post.title,
                    body: action.payload.post.body,
                    userId: action.payload.post.userId
                },
                fetchSinglePost: {
                    isFetching: false,
                    didInvalidate: false
                }
            };
        case types.INVALIDATE_SINGLE_POST:
            return {
                ...state,
                fetchSinglePost: {
                    isFetching: false,
                    didInvalidate: true
                }
            };
        case types.FETCH_USERS:
            return {
                ...state,
                fetchUsers: {
                    isFetching: true,
                    didInvalidate: false
                }
            };
        case types.RECEIVE_USERS:
            return {
                ...state,
                users: action.payload.users,
                fetchUsers: {
                    isFetching: false,
                    didInvalidate: false
                },
            };
        case types.INVALIDATE_USERS:
            return {
                ...state,
                fetchUsers: {
                    isFetching: false,
                    didInvalidate: true
                }
            };
        case types.FETCH_COMMENTS:
            return {
                ...state,
                fetchComments: {
                    isFetching: true,
                    didInvalidate: false
                }
            };
        case types.RECEIVE_COMMENTS:
            return {
                ...state,
                comments: action.payload.comments,
                fetchComments: {
                    isFetching: false,
                    didInvalidate: false
                }
            };
        case types.INVALIDATE_COMMENTS:
            return {
                ...state,
                fetchComments: {
                    isFetching: false,
                    didInvalidate: true
                }
            };
        default:
            return state;

    }
}



