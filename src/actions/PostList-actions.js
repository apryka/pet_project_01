import * as types from './action-types';
import { apiUrl } from '../config';


export function fetchPosts(dispatch) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(posts => dispatch(receivePosts(posts)))
        .catch(status => dispatch(invalidatePosts(status)));
    return {
        type: types.FETCH_POSTS,
        payload: {}
    }

}

export function receivePosts(posts) {
    return {
        type: types.RECEIVE_POSTS,
        payload: {
            posts
        }
    }
}

export function invalidatePosts() {
    return {
        type: types.INVALIDATE_POSTS,
        payload: {}
    }
}

export function deletePost(postId, dispatch) {
    fetch(`${apiUrl}/${postId}`, { method: 'DELETE'})
        .then(() => dispatch(handleDeletePost(postId)))
        .catch(status => dispatch(invalidateDeletePost(status)));
    return {
        type: types.DELETE_POST,
        payload: {}
    }
}

export function handleDeletePost(postId) {
    return {
        type: types.HANDLE_DELETE_POST,
        payload: {
            postId
        }
    }
}

export function invalidateDeletePost() {
    return {
        type: types.INVALIDATE_DELETE_POST,
        payload: {}
    }
}

export function openModal({title, body, buttons}) {
    return {
        type: types.OPEN_MODAL,
        payload: {
            modal: {
                title,
                body,
                buttons
            }
        }
    }
}

export function closeModal() {
    return {
        type: types.CLOSE_MODAL,
        payload: {}
    }
}