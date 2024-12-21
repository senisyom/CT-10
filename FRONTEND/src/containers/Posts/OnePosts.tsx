import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { fetchComments, fetchOneNews } from "../../store/postsThunk.ts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { selectComments, selectOneNews } from "../../store/postsSlice.ts";

const OnePosts = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectOneNews);
  const comments = useAppSelector(selectComments);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOneNews(params.id));
      dispatch(fetchComments(params.id));
    }
  }, [dispatch]);

  return (
    <>
      {news?.title}
      {comments.map((comments) => {
        return <div>{comments.author}</div>;
      })}
    </>
  );
};

export default OnePosts;
