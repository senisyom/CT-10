import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./components/layout/Layout.tsx";
import { Route, Routes } from "react-router-dom";
import Posts from "./containers/Posts/Posts.tsx";
import OnePosts from "./containers/Posts/OnePosts.tsx";
import PostsForm from "./containers/Posts/PostsForm.tsx";

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Posts></Posts>} />
          <Route path="/post/:id" element={<OnePosts></OnePosts>} />
          <Route path="/add-new-post" element={<PostsForm></PostsForm>} />
          <Route path="*" element={<h1>Not found!</h1>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
