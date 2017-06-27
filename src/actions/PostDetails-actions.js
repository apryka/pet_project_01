import * as types from './action-types';
import { apiUrl, apiUsers } from '../config';


export function fetchSinglePost(postId, dispatch) {
    fetch(`${apiUrl}/${postId}`)
        .then(post => dispatch(receiveSinglePost(post)))
        .catch(status => dispatch(invalidateSinglePost(status)));
    return {
        type: types.FETCH_SINGLE_POST,
        payload: {}
    }

}

export function receiveSinglePost(post) {
    return {
        type: types.RECEIVE_SINGLE_POST,
        payload: {
            id: post.id,
            title: post.title,
            body: post.body,
            userId: post.userId
        }
    }
}

export function invalidateSinglePost() {
    return {
        type: types.INVALIDATE_SINGLE_POST,
        payload: {}
    }
}

export function fetchUsers(dispatch) {
    fetch(apiUsers)
        .then(post => dispatch(receiveUsers()))
        .catch(status => dispatch(invalidateUsers(status)));
    return {
        type: types.FETCH_USERS,
        payload: {}
    }

}

export function receiveUsers() {
    return {
        type: types.RECEIVE_USERS,
        payload: {
            users
        }
    }
}

export function invalidateUsers() {
    return {
        type: types.INVALIDATE_USERS,
        payload: {}
    }
}

export function fetchComments(postId, dispatch) {
    fetch(`${apiUrl}/${postId}/comments`)
        .then(post => dispatch(receiveComments(post)))
        .catch(status => dispatch(invalidateComments(status)));
    return {
        type: types.FETCH_COMMENTS,
        payload: {}
    }

}

export function receiveComments() {
    return {
        type: types.RECEIVE_COMMENTS,
        payload: {
            users
        }
    }
}

export function invalidateComments() {
    return {
        type: types.INVALIDATE_COMMENTS,
        payload: {}
    }
}





