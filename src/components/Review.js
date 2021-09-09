import React from "react";
import { Row, Col, Rate, Comment, Tooltip } from "antd";
import moment from "moment";

function Review() {
  return (
    <React.Fragment>
      <Row>
        <Col span={3}></Col>
        <Col span={18}>
          <Comment
            author={<a href="#">Han Solo</a>}
            avatar={<Rate value={3} />}
            content={
              <p>
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            }
            datetime={
              <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            }
          />
        </Col>
        <Col span={3}></Col>
      </Row>
    </React.Fragment>
  );
}

export default Review;
