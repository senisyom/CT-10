import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {fetchNews} from "../../store/postsThunk.ts";
import {selectNews} from "../../store/postsSlice.ts";
import PostItem from "../../components/Posts/PostItem.tsx";
import {NavLink} from "react-router-dom";

const Posts = ()=>{
    const dispatch = useAppDispatch();
    const news = useAppSelector(selectNews);

    useEffect(()=>{
        dispatch(fetchNews());
    },[dispatch]);

    return(
        <>
            <div className='d-flex justify-content-between align-items-center' >
                <h3 className='text-center my-3'>Posts</h3>
                <NavLink to="/add-new-post" className='btn btn-dark'>Add New Post</NavLink>
            </div>
            <div className="list-group">
                {news.map((item)=>{
                    return(
                        <PostItem key={item.id} id={item.id} image={item.image} title={item.title} date={item.date} />
                    )
                })}
            </div>
        </>
    )
}

export default Posts;