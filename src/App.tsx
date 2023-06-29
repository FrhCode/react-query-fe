import { useSearchParams } from "react-router-dom";
import CategoryList from "./component/CategoryList";
import PostList from "./component/PostList";
import "./index.css";

function App() {
  const [, setSearchParams] = useSearchParams();

  return (
    <div className="p-3">
      <PostList />
      <br />
      <button
        onClick={() => setSearchParams({})}
        className="rounded bg-rose-600 px-3 py-2 text-white cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
      >
        Remove Query Param
      </button>
      <br />
      <br />
      <CategoryList />
    </div>
  );
}

export default App;
