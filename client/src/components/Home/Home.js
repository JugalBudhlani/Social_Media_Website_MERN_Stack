import React , {createContext}from 'react'
import { useState,useEffect } from 'react';
import Posts from '../Posts/Posts'
import Form from '../Form/Form';
import { Grow,Grid,Container, Paper,AppBar, TextField, Button } from '@material-ui/core';
import { getPosts ,getPostsbySearch} from'../../actions/posts';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import {useNavigate, useLocation} from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';

// import Paginate from '../Paginate';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {

const[currentId,setCurrentId]= useState(0);

  const classes=useStyles();
  const dispatch=useDispatch();
  const query= useQuery();
  const navigate=useNavigate();
  const page=query.get('page') || 1;
  const searchQuery=query.get('searchQuery');

  const [search,setSearch]= useState('');
  const [tags,setTags]= useState([]);
  
  
  useEffect(()=> { 
    dispatch(getPosts()) },[currentId, dispatch]);

  const searchPost =() => {
    if(search.trim() || tags){
      dispatch(getPostsbySearch({search, tags: tags.join(',')}));
    }
    else{
      navigate('/');
    }
  }

  const handleKeyPress =(e) => {
    if(e.KeyCode ===13){
      searchPost();
      //search post
    }
  }

  const handleAdd =(tag)=>setTags([...tags,tag]);

  const handleDelete=(tagtoDel) => setTags(tags.filter((tag) => tag !== tagtoDel));

  return (
    <Grow in>
        <Container maxWidth='xl'>
          <Grid className={classes.gridContainer} container justify="space-between" alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/> 
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField name="search" variant='outlined' label="Search Memories" fullWidth value={search}  onKeyPress={handleKeyPress} onChange={(e) =>{setSearch(e.target.value)}}/>\
                <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={(chip => handleAdd(chip))} onDelete={(chip) => handleDelete(chip)} label="Search Tags" variant='outlined'/>
                <Button onClick={searchPost} className={classes.searchButton} color='primary' variant='contained'>Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <Paper className={classes.Pagination} elevation={6}>
                {/* <Paginate page={page}/> */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home;