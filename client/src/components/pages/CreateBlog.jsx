import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FileBase from "react-file-base64";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";

function CreateBlog({ jwt }) {
  const token = Cookies.get("jwt");
  console.log(jwt);
  const history = useHistory();
  const [blogData, setBlogData] = useState({
    title: "",
    authorName: "",
    description: "",
    image: "",
  });
  //authentication check
  useEffect(() => {
    const checkAuth = async () => {
      if (!jwt) {
        history.push("/login");
      }
    };
    checkAuth();
  }, [jwt, history]);
  //authentication check
  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post("/blogs", {
        title: blogData.title,
        authorName: blogData.authorName,
        image: blogData.image,
        description: blogData.description,
        token,
      });
      console.log(response.data);
      e.target.reset();
      setBlogData({
        title: "",
        authorName: "",
        description: "",
        image: "",
      });
      history.push("/blogs");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <FormContainer className="row">
        <div className="col-md-6 offset-2">
          <h1 className="display-4 mt-4">Create Blogs</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <label htmlFor="title">Title :</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={blogData.title}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="authorName">Author :</label>
              <input
                type="text"
                name="authorName"
                id="authorName"
                className="form-control"
                value={blogData.authorName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group my-2">
              <label htmlFor="description">Blog Body :</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                value={blogData.description}
                onChange={handleChange}
              ></textarea>
              <div className="form-group my-2">
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setBlogData({ ...blogData, image: base64 })
                  }
                />
              </div>
            </div>
            <input
              type="submit"
              value="Create"
              className="btn btn-primary mt-3"
            />
          </form>
        </div>
      </FormContainer>
    </div>
  );
}

export default CreateBlog;

const FormContainer = styled.div`
  padding-top: 150px;
`;
