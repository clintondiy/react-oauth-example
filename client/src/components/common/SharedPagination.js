import React, { Component } from "react";
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
  Row,
  Col
} from "reactstrap";

class SharedPagination extends Component {
  render() {
    const pageNumbers = [];
    const max = 15;
    console.log(this.props);
    const totalPosts = this.props.totalPosts;
    const postsPerPage = this.props.postsPerPage;
    const availablePage = Math.ceil(totalPosts / postsPerPage);

    const paginate = number => {
      this.props.changePageFunc(number);
    };
    for (let number = 1; number <= max; number++) {
      let disable = number < availablePage + 1;
      const pageItem = (
        <PaginationItem key={number} disabled={!disable}>
          <PaginationLink first onClick={() => paginate(number)}>
            {number}
          </PaginationLink>
        </PaginationItem>
      );
      pageNumbers.push(pageItem);
    }

    return (
      <Container className="bottom">
        <Row>
          <Col sm={{ size: "auto", offset: 2 }}>
            <Pagination aria-label="Page navigation example">
              <PaginationItem>
                <PaginationLink previous onClick={() => paginate(1)} />
              </PaginationItem>
              {pageNumbers}
              <PaginationItem>
                <PaginationLink next onClick={() => paginate(availablePage)} />
              </PaginationItem>
            </Pagination>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default SharedPagination;
