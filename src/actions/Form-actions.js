import * as types from './action-types';

export function updatePost(url, { method, data: postData}, dispatch) { console.log('fetching!!!!', url);
    fetch(url, { method: method, data: postData})
        .then(response => response.json())
        .then(post => dispatch(handleUpdatePost(post)))
        .catch(status => dispatch(invalidateUpdatePost(status)));
    return {
        type: types.UPDATE_POST,
        payload: {}
    }
}

export function handleUpdatePost(post) {
    return {
        type: types.HANDLE_UPDATE_POST,
        payload: {
            post
        }
    }
}

export function invalidateUpdatePost() {
    return {
        type: types.INVALIDATE_UPDATE_POST,
        payload: {}
    }
}