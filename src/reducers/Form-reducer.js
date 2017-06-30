import * as types from '../actions/action-types';

const defaultState = {
    userId: null,
    isButtonDisabled: false,
    postTitle: {
        value: '',
        validationState: null,
        validationMessage: ''
    },
    postBody: {
        value: '',
        validationState: null,
        validationMessage: ''
    },
    postUsers: {
        validationState: null
    },
    updatePost: {
        isFetching: false,
        didInvalidate: false
    }
};

export default function(state = defaultState, action ) {
    switch (action.type) {
        case types.UPDATE_POST:
            return {
                ...state,
                updatePost: {
                    isFetching: true,
                    didInvalidate: true
                }
            };
        case types.HANDLE_UPDATE_POST:
            console.log('UPDATE HANDLE_UPDATE_POST', action, state);
            return {
                ...state,
                postTitle: {
                    value: action.type.post.title
                },
                postBody: {
                    value: action.type.post.body
                },
                updatePost: {
                    isFetching: false,
                    didInvalidate: false
                }
            };
        case types.INVALIDATE_UPDATE_POST:
            return {
                ...state,
                updatePost: {
                    isFetching: false,
                    didInvalidate: true
                }
            };
        default:
            return state;
    }
}

