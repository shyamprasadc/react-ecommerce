import React from "react";
import { Row, Col, Rate, Comment, Tooltip } from "antd";
import moment from "moment";

function Review(props) {
  return (
    <React.Fragment>
      <Row justify="space-around">
        <Col>
          <Comment
            author={<a href="#">Han Solo</a>}
            avatar={<Rate value={3} />}
            content={
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Magna fermentum iaculis eu non. At imperdiet dui accumsan sit
                amet nulla.
              </p>
            }
            datetime={
              <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          />
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default Review;
