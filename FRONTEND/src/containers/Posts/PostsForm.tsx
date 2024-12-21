import { FormEvent, useRef, useState } from "react";
import { PostNews } from "../../types.ts";
import { useAppDispatch } from "../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../store/postsThunk.ts";

const PostsForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [filename, setFilename] = useState("");
  const [stateForm, setStateForm] = useState<PostNews>({
    title: "",
    content: "",
    image: null,
  });

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename("");
    }
    const { name, files } = e.target;
    const value = files && files[0] ? files[0] : null;
    setStateForm((prev: PostNews) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setStateForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(stateForm);
    setStateForm({ title: "", content: "", image: null });
    dispatch(addPost(stateForm));
    navigate("/");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="container">
          <h3 className="my-4">Add New Post</h3>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              value={stateForm.title}
              onChange={onChange}
              type="text"
              className="form-control"
              name="title"
              placeholder="Author"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              value={stateForm.content}
              onChange={onChange}
              name="content"
              className="form-control"
              rows={3}
            ></textarea>
          </div>
          <div>
            <input
              style={{ display: "none" }}
              type="file"
              name="image"
              onChange={onFileChange}
              ref={inputRef}
            />
            <div>
              <input
                type="text"
                readOnly
                value={filename}
                onClick={activateInput}
              />
              <button className="btn btn-dark" onClick={activateInput}>
                Browse
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            save
          </button>
        </div>
      </form>
    </>
  );
};

export default PostsForm;
