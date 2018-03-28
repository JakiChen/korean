import React, { Component } from 'react'
import { FONTS, BODY_480, BODY_1280, BODY_960, BODY_600, CATEGORIES } from '../constants/defaults';
import { FontViewer, FontViewerScript, AnimationScriptSelector } from './';
import _ from 'lodash';
import { MESSAGES } from '../constants/messages';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import { cutString } from '../utils';

const Fragment = React.Fragment;
const msgScale = cutString;
const msgScaleScript = scaleLinear().domain([BODY_480, 2560]).clamp(true).range([1, 6]);
const SELECTED_MSGS = _.first(_.shuffle(MESSAGES));

class FontsList extends Component {
  constructor(props){

    super(props);
    this.state = {
      len: Math.floor(msgScale(window.innerWidth)),
      scriptLen: Math.floor(msgScaleScript(window.innerWidth)),
    };

    this.big = [["농식품부", 1]];
    this.script = [["농식품부", 1]];

  }
  componentWillMount() {
    this.big = this.filterString(this.state.len);
    this.script = this.filterString(this.state.scriptLen);
  }

  componentDidMount(){
    this.updateLen(this.props.screenWidth);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.screenWidth != this.props.screenWidth) { 
      this.updateLen(newProps.screenWidth);
    }
  }

  filterString(len){
    var words = _.shuffle(_.filter(SELECTED_MSGS, msg => {
      return msg[1] === len;
    }));


    if (words.length === 0) {
      words = _.shuffle(_.map(SELECTED_MSGS, msg => {
        return [msg[0].substring(0, len), 1];
      }));
    }

    return words;
  }

  updateLen(screenWidth){
    this.setState({
      len: Math.floor(msgScale(screenWidth)),
      scriptLen: Math.floor(msgScaleScript(screenWidth))
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    var result = false;

    if (nextState.len != this.state.len) {
    
      this.big = this.filterString(nextState.len);

      result = true;
    
    }

    if (nextState.scriptLen != this.state.scriptLen) {
      
      this.script = this.filterString(nextState.scriptLen);
      
      result = true;

    }

    return result;



  }

  render() {
    let { screenWidth } = this.props;
    let { len, scriptLen } = this.state;


    // let filteredMsgs = this.filterString(len, scriptLen);
    // // debugger;
    // console.log("big", filteredMsgs.big);
    // console.log("script", filteredMsgs.script);
    
    var categoryFonts = {};

    _.each(CATEGORIES, categoryData => {

      var fonts = _.filter(FONTS, fontData => { return fontData.category == categoryData.id });
      let category = {
        ...categoryData,
        fonts: fonts
      };

      categoryFonts[categoryData.id] = category;
      // debugger;
    });

    var idx = -1;

    return (
      <section className="fonts-list">
        {
          _.map(categoryFonts, (categoryFont, k) => {
            if (k == 3) {

              return (
                <Fragment key={k}>
                  <section className="font-script-container">
                    <a name={`category-${k}`} data-category-id={k}></a>
                    <div className="font-script-list">
                      {
                        _.map(categoryFont.fonts, (fontData, i) => {
                          idx++; 
                          return (
                            <FontViewerScript key={fontData.id} message={this.script[i % this.script.length][0]} {...fontData} />
                          )
                        })
                      }
                    </div>
                  </section>
                </Fragment>
              );

            } else {

              return (
                <Fragment key={k}>
                    <a name={`category-${k}`} data-category-id={k}></a>
                    {
                      _.map(categoryFont.fonts, (fontData, i) => {
                        idx++; 
                        return (
                          <FontViewer key={fontData.id} message={this.big[i % this.big.length][0]} {...fontData} />
                        )
                      })
                    }
                </Fragment>
              );

            }
          }) 
        }
      </section>
    )
  }
}

let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth
  };
}
export default connect(mapStateToProps)(FontsList);