import React from 'react';
import styled from 'styled-components';
import TopBar from './TopBar.jsx';
import RatingList from './RatingList.jsx';
import ReviewList from './ReviewList.jsx';
import Search from './Search.jsx';

export const Close = styled.div`
  display: flex;
  cursor: pointer;
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(input) {
    this.setState({
      search: input,
    });
  }

  render() {
    const reviews = this.props.reviews;
    console.log('Reviews', reviews);
    const search = this.state.search;

    let searchFiltered = reviews;
    if (search) {
      searchFiltered = [];

      for (let i = 0; i < reviews.length; i++) {
        const review = reviews[i];
        console.log('Review', review);
        if (review.review.toLowerCase().includes(search.toLowerCase())) {
          searchFiltered.push(review);
        }
      }
    }

    const Container = styled.div`
      position: absolute;
      width: 100vw;
      height: 100vh;
      opacity: 0.6;
      background-color: black;
    `;

    const Everything = styled.div`
      display: flex;
      flex-direction: column;
      position: absolute;
      box-sizing: border-box;
      background-color: white;
      width: 1000px;
      height: 700px;
      border-radius: 12px;
      box-shadow: rgba(0, 0, 0, 0.28) 0px 8px 28px;
      top: 50%;
      margin-top: -320px;
      left: 50%;
      margin-left: -500px;
    `;

    const Header = styled.div`
      display: flex;
      width: 950px;
      height: 72px;
      padding: 0px 24px 0px 24px;
      justify-content: start;
      align-items: center;
      flex-direction: row;
    `;

    const Content = styled.div`
      display: flex;
      padding: 0px 0px 0px 24px;
      box-sizing: border-box;
      justify-content: space-between;
      flex-direction: row;
      height: 90%;
    `;

    const LeftContainer = styled.div`
      display: flex;
      width: 350px;
      height: 600px;
      justify-content: start;
      flex-direction: column;
    `;

    const RightContainer = styled(LeftContainer)`
      display: flex;
      width: 550px;
      height: 630px;
      overflow-y: scroll;
      justify-content: end;
      flex-direction: column;
    `;

    const CloseContainer = styled.div`
      display: flex;
      width: 33px;
      height: 33px;
      border-radius: 50%;
      justify-content: center;
      align-items: center;
      flex-direction: row;

      &:hover {
        background-color: rgb(247, 247, 247);
      }
    `;

    return (
      <>
        <Container />
        <Everything>
          <Header>
            <CloseContainer>
              <Close
                onClick={() => {
                  this.props.close();
                }}
              >
                ✕
              </Close>
            </CloseContainer>
          </Header>

          <Content>
            <LeftContainer>
              <TopBar isModal={true} {...this.props}></TopBar>
              <RatingList isModal={true} {...this.props}></RatingList>
            </LeftContainer>

            <RightContainer>
              <Search handleSearch={this.handleSearch}></Search>
              <ReviewList
                isModal={true}
                {...this.props}
                reviews={searchFiltered}
              ></ReviewList>
            </RightContainer>
          </Content>
        </Everything>
      </>
    );
  }
}

export default Modal;
