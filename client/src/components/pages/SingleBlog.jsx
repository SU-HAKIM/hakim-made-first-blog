import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function SingleBlog() {
  const params = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const getData = async (e) => {
      try {
        let post = await axios.get(`/blogs/${params.id}`);
        setData(post.data);
        console.log(params.id);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [params.id]);
  console.log(data);
  return (
    <div className="container">
      <div className="row pt-5">
        {data && (
          <div className="col-md-8 offset-2">
            <img
              className="image-fluid mb-4"
              src={data.image}
              alt="single blog pic"
            />

            <div className="mb-3">
              <h1 className="display-4">{data.title}</h1>
              <small className="text-muted">
                Liked By {data.liked ? data.liked.length : 0} person
              </small>
              &nbsp; =&gt; &nbsp;
              <small className="mb-5 text-muted">
                written by : {data.authorName}
              </small>
            </div>
            <p>{data.description}</p>
            <Link to="/blogs" className="btn btn-primary mt-2">
              Back To Blogs
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleBlog;
