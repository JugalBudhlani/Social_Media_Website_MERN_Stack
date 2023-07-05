import * as AT from '../constants/actionTypes'

export default (posts=[],action)=>{
    switch(action.type){
        case AT.FETCH_ALL:
            return action.payload;

        case AT.FETCH_BY_SEARCH:
            return action.payload;
        case AT.CREATE:
            return [ ...posts , action.payload];
        case AT.FETCH_POST:
            return {post: action.payload};

        case AT.UPDATE:
        case AT.LIKE:
            return posts.map((post) =>post._id===action.payload._id ? action.payload :post );

        case AT.DELETE:
            return posts.filter((post)=>post._id !== action.payload);   


        default :
            return posts;
    } 
}