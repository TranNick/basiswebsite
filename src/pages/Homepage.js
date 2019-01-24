import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, UncontrolledCarousel } from 'reactstrap';

const items = [
    {
    //     src: "https://s3-us-west-1.amazonaws.com/website-assets-bucket/images/Girls-Generation-Mr.Mr_.-Feature.jpg",
    //     altText: 'Slide 1',
    //     caption: 'Slide 1',
    //     header: 'Slide 1 Header'
    // },
    // {
    //     src: "https://s3-us-west-1.amazonaws.com/website-assets-bucket/images/ZxAvGTH.jpg",
    //     altText: 'Slide 2',
    //     caption: 'Slide 2',
    //     header: 'Slide 2 Header'
    // },
    // {
    //   src: "https://s3-us-west-1.amazonaws.com/website-assets-bucket/images/naver-line-wallpaper.jpg",
    //   altText: 'Slide 3',
    //   caption: 'Slide 3',
    //   header: 'Slide 3 Header'
    }
  ];

class Homepage extends Component {

    render() {
        return(
            <Container fluid={true} style={{margin: '0px', padding: '0px'}}>
                <UncontrolledCarousel items={items} />
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);