import React, { Component, Fragment } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import Modal from "../components/Modal";

class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questionList: [],
      showModal: false,
      postDetails: {},
      pageNo: 1,
      pageSize: 20
    };

    this.getQuestions = this.getQuestions.bind(this);
  }

  componentDidMount() {
    const { pageNo, pageSize } = this.state;

    axios
      .get(
        `https://api.stackexchange.com//2.2/questions?order=desc&site=stackoverflow&page=${pageNo}&pagesize=${pageSize}`
      )
      .then(res => {
        this.setState({
          questionList: res.data.items
        });
      });
  }

  getQuestions() {
    const { pageNo, pageSize } = this.state;

    this.setState({
      pageNo: pageNo + pageSize
    });
    axios
      .get(
        `https://api.stackexchange.com//2.2/questions?order=desc&site=stackoverflow&page=${pageNo}&pagesize=${pageSize}`
      )
      .then(res => {
        const { questionList } = this.state;
        this.setState({
          questionList: questionList.concat(res.data.items)
        });
      });
  }

  showDataModal = question => {
    this.setState({ showModal: !this.state.showModal, postDetails: question });
  };

  render() {
    const { questionList, showModal, postDetails } = this.state;
    return (
      <Fragment>
        <div className="container">
          <InfiniteScroll
            dataLength={questionList.length}
            next={this.getQuestions}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <table className="table-wrapper">
              <thead>
                <tr>
                  <td>Author</td>
                  <td>Title</td>
                  <td>Creation Date</td>
                </tr>
              </thead>
              <tbody>
                {questionList.map(question => {
                  const creationDate = new Date(
                    new Date(Number(question && question.creation_date))
                  );
                  return (
                    <tr
                      key={question && question.question_id}
                      onClick={() => this.showDataModal(question)}
                    >
                      <td>
                        <div id="author">
                          <img
                            className="avatar"
                            src={
                              question &&
                              question.owner &&
                              question.owner.profile_image
                            }
                            alt={
                              question &&
                              question.owner &&
                              question.owner.display_name
                            }
                          />
                          <span>
                            {question &&
                              question.owner &&
                              question.owner.display_name}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span>{question && question.title}</span>
                      </td>
                      <td>
                        <span>{`${creationDate.getDate()}/${creationDate.getMonth() +
                          1}/${creationDate.getFullYear()}`}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
        <Modal show={showModal} handleClose={this.showDataModal}>
          <div className="data-container">
            <div className="data-question">
              <h2>Question: {postDetails.title}</h2>
            </div>
            <div className="data-link">
              <span>
                Link :{" "}
                <a
                  href={postDetails.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {postDetails.link}
                </a>
              </span>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default QuestionList;
