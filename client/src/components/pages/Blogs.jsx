import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import FileBase from "react-file-base64";

import { AiTwotoneLike, AiTwotoneDelete, AiTwotoneEdit } from "react-icons/ai";

function Blogs() {
  const [deletePost, setDeletePost] = useState("");
  const [likeData, setLikeData] = useState({});
  const [result, setResult] = useState([]);
  // update logic
  const [updateData, setUpdateData] = useState({});
  const [updateId, setUpdateId] = useState("");
  const [blogData, setBlogData] = useState({});
  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedData = await axios.patch(`/blogs/${updateId}`, blogData);
      console.log(updatedData);
      setUpdateData(updatedData);
      e.target.reset();
      setBlogData({ title: "", authorName: "", description: "", image: "" });
    } catch (error) {
      console.log(error);
    }
  };
  //update logic
  const fetchData = async () => {
    try {
      let response = await axios.get("/blogs");
      setResult(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleLike = async (id) => {
    try {
      let response = await axios.patch(`/blogs/${id}/like`);
      setLikeData(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      console.log("delete");
      await axios.delete(`/blogs/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async (id) => {
    try {
      let data = await axios.get(`/blogs/${id}`);
      setBlogData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [likeData, deletePost, updateData]);
  return (
    <>
      <div className="container">
        <BlogBody className="row">
          {result
            ? result.map((data) => (
                <div className="col-md-6 col-lg-4" key={data._id}>
                  <div className="card">
                    <IconContext.Provider value={{ className: "blog-icons" }}>
                      <div className="card-header d-flex justify-content-end">
                        <AiTwotoneEdit
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          color="green"
                          onClick={(e) => {
                            getData(data._id);
                            setUpdateId(data._id);
                          }}
                        />
                      </div>
                    </IconContext.Provider>
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
                      <p className="card-text">
                        {data.description.substr(0, 150)}....
                      </p>
                    </div>
                    <IconContext.Provider value={{ className: "blog-icons" }}>
                      <div className="card-footer d-flex justify-content-between">
                        <div>
                          <AiTwotoneLike
                            color=""
                            onClick={(e) => {
                              handleLike(data._id);
                            }}
                          />{" "}
                          {data.liked}
                        </div>
                        <div>
                          <AiTwotoneDelete
                            color="red"
                            onClick={(e) => {
                              handleDelete(data._id);
                              setDeletePost(data._id);
                            }}
                          />
                        </div>
                      </div>
                    </IconContext.Provider>
                  </div>
                </div>
              ))
            : ""}
        </BlogBody>
      </div>
      {/* models */}

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Update Blog
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* model body */}
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
              {/* model body */}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Blogs;

const BlogBody = styled.div`
  padding-top: 40px;
`;
