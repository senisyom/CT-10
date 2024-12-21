import { NavLink } from "react-router-dom";
import dayjs from "dayjs";
interface Props {
  id: string;
  title: string;
  image: string | null;
  date: string;
}
const PostItem: React.FC<Props> = ({ id, title, date, image }) => {
  let imagePost =
    "https://smart.mag-river.ru/uploads/goods/img/445-360/fit/no-image.png";
  if (image) {
    imagePost = `http://localhost:8080/images/${image}`;
  }
  return (
    <div className="list-group-item d-flex gap-2 align-items-center">
      <div
        style={{ width: "133px", height: "100px" }}
        className="d-flex justify-content-center border border-1"
      >
        <img
          className="h-100"
          style={{ width: "fit-content", maxWidth: "133px" }}
          src={imagePost}
          alt="image"
        />
      </div>
      <div>
        <div>{dayjs(date).format("DD.MM.YYYY HH:mm:ss")}</div>
        <div className="fs-5">{title}</div>
      </div>
      <NavLink to={`/post/${id}`} className="btn btn-dark ms-auto">
        Read
      </NavLink>
      <button className="btn btn-danger">Delete</button>
    </div>
  );
};
export default PostItem;
