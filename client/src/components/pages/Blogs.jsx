import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";

function Blogs() {
  const [result, setResult] = useState([]);
  const fetchData = async () => {
    try {
      let response = await axios.get("/blogs");
      setResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <BlogBody className="row">
        {result
          ? result.map((data) => (
              <div className="col-md-6 col-lg-4" key={data._id}>
                <div className="card">
                  <img src={data.image} alt="card pic" />
                  <div className="card-body">
                    <div className="mb-3">
                      <h1 className="card-title">
                        <Link to={`/blogs/${data._id}`}>{data.title}</Link>
                      </h1>
                      <small className="text-muted">
                        written by : {data.authorName}
                      </small>
                    </div>
                    <p className="card-text">{data.description}</p>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </BlogBody>
    </div>
  );
}

export default Blogs;

const BlogBody = styled.div`
  padding-top: 40px;
`;
