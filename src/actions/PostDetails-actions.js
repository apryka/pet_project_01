import * as types from './action-types';

export function getUsersList(url) {
    fetch(url)
        .then(response => response.json())
    return {
        type: types.GET_USERS,
        payload: {
            users
        }
    }
}

export function getComments(postId) {
    return {
        type: types.GET_COMMENTS,
        postId
    }
}

export function getPostDetails(postId) {
    return {
        type: types.GET_POST_DETAILS,
        postId
    }
}