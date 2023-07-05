import * as api from '../api';
import * as AT from '../constants/actionTypes'

export const getPosts =() => async(dispatch) => {
    try {

        const { data }= await api.fetchPosts();
        dispatch({ type: AT.FETCH_ALL, payload:data});
        
    } catch (error) {
        console.log(error);
        
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
    //   dispatch({ type: START_LOADING });
  
      const { data } = await api.fetchPost(id);
  
      dispatch({ type: AT.FETCH_POST, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

export const getPostsbySearch = (searchQuery) => async(dispatch) => {
    try {
        const {data :{data}} =await api.fetchPostsBySearch(searchQuery);
        dispatch({ type: AT.FETCH_BY_SEARCH, payload:data});
        
    } catch (error) {
        console.log(error);
        
    }
}

export const createPost = (post,navigate) => async (dispatch) => {
    try {
        const { data} =await api.createPost(post);
        dispatch({type: AT.CREATE, payload:data});
        navigate(`/posts/${data._id}`);
        
    } catch (error) {
        console.log(error); 
        
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        console.log(id);
        const { data }= await api.updatePost(id, post);
        dispatch({type: AT.UPDATE, payload:data});
        
    } catch (error) {
        console.log(error); 
        
    }
}

export const deletePost =(id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({type: AT.DELETE , payload: id});
        
    } catch (error) {
        console.log(error);
    }

}

export const likePost = (id) => async(dispatch) => {
    const user=JSON.parse(localStorage.getItem('profile'));
    try {
        const { data }= await api.likePost(id,user?.token);
        dispatch({type: AT.LIKE , payload:data});
        
    } catch (error) {
        
    }
}