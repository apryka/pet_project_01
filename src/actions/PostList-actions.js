import * as types from './action-types';

export function getPostsFromAPI(url) {
    return {
        type: types.GET_POSTS
    }
}

export function deletePost(postId) {
    return {
        type: types.DELETE_POST,
        postId
    }
}
