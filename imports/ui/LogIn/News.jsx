import React from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loadNews } from '../../actions/index'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../../css/News.css"
var Carousel = require('react-responsive-carousel').Carousel;
//<a style={{display: "table-cell"}} href={this.props.news[0].links.web.href} target="_blank">
class News extends React.Component {

  componentDidMount(){
    const parent = this;
    parent.callApi()
    .then(res => parent.props.loadNews(res))
    .catch(err => console.log(err));
    }

  callApi = async () => {
    const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news');
    const body = await response.json();
    if(response.status !== 200){throw Error(body.message)}
    return body;
  }

	render() {
    var key = 0;
    if(this.props.news && (this.props.news).length){
      var h = 450;
      return (
        <div>
          <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} width={"900 px"} interval={5000} transitionTime={350} showThumbs={false}>
            <div className = "HeadNews">
              <img style={{height: h, width:"auto"}} src={this.props.news[0].images[0].url} className="image " />
              <a style={{display: "table-cell"}} href={this.props.news[0].links.web.href} target="_blank">
                <p className="legend">{this.props.news[0].headline}</p>
              </a>
            </div>
            <div className = "HeadNews">
              <img style={{height: h, width:"auto"}} src={this.props.news[1].images[0].url} className="image " />
              <a style={{display: "table-cell"}} href={this.props.news[1].links.web.href} target="_blank">
                <p className="legend">{this.props.news[1].headline}</p>
              </a>
            </div>
            <div className = "HeadNews">
              <img style={{height: h, width:"auto"}} src={this.props.news[2].images[0].url} className="image " />
              <a style={{display: "table-cell"}} href={this.props.news[2].links.web.href} target="_blank">
                <p className="legend">{this.props.news[2].headline}</p>
              </a>
            </div>
            <div className = "HeadNews">
              <img style={{height: h, width:"auto"}} src={this.props.news[3].images[0].url} className="image " />
              <a style={{display: "table-cell"}} href={this.props.news[3].links.web.href} target="_blank">
                <p className="legend">{this.props.news[3].headline}</p>
              </a>
            </div>
            <div className = "HeadNews">
              <img style={{height: h, width:"auto"}} src={this.props.news[4].images[0].url} className="image " />
              <a style={{display: "table-cell"}} href={this.props.news[4].links.web.href} target="_blank">
                <p className="legend">{this.props.news[4].headline}</p>
              </a>
            </div>
            <div className = "HeadNews">
              <img style={{height: h, width:"auto"}} src={this.props.news[5].images[0].url} className="image " />
              <a style={{display: "table-cell"}} href={this.props.news[5].links.web.href} target="_blank">
                <p className="legend">{this.props.news[5].headline}</p>
              </a>
            </div>
          </Carousel>
        </div>
      );
    }else {
      return (<div>Loading News</div>);
		}
  }
}

function mapStateToProps(state){ //name is by convention
	//state has entire state of app!!
return { news: state.news}; //now it will appear as props
};

const mapDispatchToProps = dispatch => ({
  loadNews: (news) => dispatch(loadNews(news))
});

export default connect(mapStateToProps, mapDispatchToProps)(News);
