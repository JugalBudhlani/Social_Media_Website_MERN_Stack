import React from 'react'
import Post from './Post/Post'
import  makeStyles  from './styles'

import { Grid, CircularProgress } from '@material-ui/core';

import { useSelector } from 'react-redux';


const Posts=({ setCurrentId}) => {
    const posts=useSelector((state)=>state.posts);
    const classes=makeStyles();
    // console.log(posts);
  return (
    !posts.length ? <CircularProgress /> :(
       <Grid className={classes.mainContainer} container alignItems='stretch' spacing={3}>
        {posts.map((post)=>(
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={6}>
            <Post post={post} setCurrentId={setCurrentId}/>  
          </Grid>

        ))}
       </Grid>

    )
    // <>
    // <div>Posts</div>
    // <Post />
    // <Post />
    // </>
  );
}

export default Posts;
