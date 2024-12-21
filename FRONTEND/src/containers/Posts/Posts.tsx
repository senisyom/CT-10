import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import { useEffect } from "react";
import { fetchNews } from "../../store/postsThunk.ts";
import { selectNews } from "../../store/postsSlice.ts";

const Posts = () => {
  const dispatch = useAppDispatch();
  const news = useAppSelector(selectNews);
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);
  return (
    <>
      Posts
      {news.map((item) => {
        return <>{item.title}</>;
      })}
    </>
  );
};

export default Posts;
