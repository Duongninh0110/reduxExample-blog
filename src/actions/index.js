import _ from 'lodash';
import jsonPlaceHolder from '../apis/jsonPlaceHolder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    
    await dispatch(fetchPosts());

    // const userIds = _.uniq(_.map(getState().posts, 'userId'));
    // console.log(userIds);
    // userIds.forEach(id => dispatch(fetchUser(id)));

    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value();
}

export const fetchPosts = () => {
    
    return async (dispatch, getState) => {
        const response = await jsonPlaceHolder.get('/posts');
        dispatch ({type: 'FETCH_POST',
                    payload: response.data,
                    });
    };
};

export const fetchUser = (id) => {
    
    return async (dispatch) => {
        const response = await jsonPlaceHolder.get(`/users/${id}`);
        dispatch ({type: 'FETCH_USER',
                    payload: response.data,
                    });
    };
};

// export const fetchUser = (id) => {
    
//     return (dispatch) => {
//         _fetchUser(id, dispatch)
//     };
// };

// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceHolder.get(`/users/${id}`);
//     dispatch ({type: 'FETCH_USER', payload: response.data,});
// });


