import React from "react";
import styled from "styled-components";

function Home() {
  return (
    <div className="container">
      <HomeText className="row">
        <div className="col-md-8">
          <h1 className="display-4">This is our blogs home page 2</h1>
          <p className="lead">Here, you can read and create your own blog.</p>
        </div>
      </HomeText>
    </div>
  );
}

export default Home;

const HomeText = styled.div`
  padding-top: 200px;
`;
