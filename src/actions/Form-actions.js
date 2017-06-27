import * as types from './action-types';
import { apiUrl } from '../config';


export function fetchSinglePost(postId, dispatch) {
    fetch(`${apiUrl}/${postId}`)
        .then(post => dispatch(receiveSinglePost(post)))
        .catch(post => dispatch(invalidateSinglePost(post)));
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

export function updatePost(url, { method: method, data: postData}, dispatch) {
    fetch(url, { method: method, data: postData})
        .then(post => dispatch(handleUpdatePost(post)))
        .catch(stauts => dispatch(invalidateUpdatePost(status)))
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