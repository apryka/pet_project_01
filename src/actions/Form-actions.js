import * as types from './action-types';

export function updatePost(postId) {
    return {
        type: types.UPDATE_POST,
        postId
    }
}