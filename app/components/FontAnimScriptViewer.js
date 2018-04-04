import React, { Component } from 'react';
import paper from 'paper';
import { Glyph } from './';
import { BODY_600, BODY_480 } from '../constants/defaults';
import { magnifyScript, bezierShowScript, blurScript } from './animations';
import { connect } from 'react-redux';
import { scaleLinear } from 'd3';
import { convertBgMode } from '../utils';

const Fragment = React.Fragment;
class FontAnimScriptViewer extends Component {
  constructor(props){
    super(props);

    this.glyphs = [];

    this.containerHeight = 400;
    this.animations = [
      magnifyScript,
      bezierShowScript,
      blurScript
    ];
  }

  componentDidMount(){

    paper.setup(this.refCanvas);
    this.project = paper.View._viewsById[this.refCanvas.id]._project;
    this.view = paper.View._viewsById[this.refCanvas.id];


    var { letterSpacing, baseline, fontSize, font, message, screenHeight, screenWidth, animationScriptIdx, backgroundMode, size, containerHeight } = this.props;

    this.createGlyphPath(font, message, size, screenWidth, screenHeight, backgroundMode, containerHeight, fontSize, letterSpacing, baseline);

    this.attachAnimation(this.props);
    this.project.activate();

    this.view.draw();
  }

  componentWillUnmount(){
    this.detachAnimation(this.props);
    this.project.remove();
    this.view.remove();
  }

  componentWillReceiveProps(newProps){
    if (newProps.message != this.props.message) {
      this.resetMessage(newProps);
    } else if (newProps.screenWidth != this.props.screenWidth || 
               newProps.screenHeight != this.props.screenHeight) {
      this.resetMessage(newProps);
    } else if (newProps.animationScriptIdx != this.props.animationScriptIdx) {
      this.detachAnimation(this.props);
      this.attachAnimation(newProps);
    } else if (newProps.backgroundMode != this.props.backgroundMode){
      this.bgModeAnimation(newProps);
    }
  }
  
  bgModeAnimation(props){
    let { backgroundMode, animationScriptIdx } = props;

    this.animations[animationScriptIdx].changeBgMode.bind(this, this)(backgroundMode);
   
  }

  detachAnimation(props){
    let { animationScriptIdx } = props;
    this.animations[animationScriptIdx].detach.bind(this, this)();
  }


  attachAnimation(props){
    let { animationScriptIdx, backgroundMode } = props;
    this.animations[animationScriptIdx].attach.bind(this, this)(backgroundMode);
  }


  createGlyphPath(font, message, size, screenWidth, screenHeight, backgroundMode, containerHeight, fontSize, letterSpacing, baseline){

    var fontGlyphs = font.stringToGlyphs(message);

    var kerningValue = 0;
    let leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
    size = size * fontSize;
  
    var fontSize = size || 300;
    var x, y;

    if (screenWidth > BODY_480) {
      x = 24 + leftWidthScale(screenWidth) + 48;
      y = (screenHeight * 0.5 - containerHeight * 0.5) + size * 0.88 * baseline + 1;
    } else { 
      x = 24 + 49;
      y = (screenHeight * 0.5 - containerHeight * 0.5) + (size * 0.89 * baseline) + 66;
    }

    var fontScale = 1 / font.unitsPerEm * fontSize;
    
    _.each(fontGlyphs, (glyphData, i) => {
      // debugger;
      let glyph = new Glyph({
        glyph: glyphData,
        x: x,
        y: y,
        fontSize: fontSize,
        fillColor: convertBgMode(backgroundMode, "f"),
        unitsPerEm: font.unitsPerEm
      });
      this.glyphs.push(glyph);
      glyph.init();


      if (glyphData.advanceWidth) {
        x += glyphData.advanceWidth * fontScale;
      }


      if (i < fontGlyphs.length - 1) {
        kerningValue = font.getKerningValue(glyphData, fontGlyphs[i + 1]);
        x += kerningValue * fontScale;
      }

      x += letterSpacing * fontScale;


    });

    // debugger;
  }

  resetMessage(props){
    let { letterSpacing, baseline, fontSize, message, font, screenHeight, screenWidth, animationScriptIdx, backgroundMode, size, containerHeight } = props;
    
    this.project.activate();
    _.each(this.glyphs, glyph => {
      glyph.remove();
    });

    this.glyphs = [];

    this.createGlyphPath(font, message, size, screenWidth, screenHeight, backgroundMode, containerHeight, fontSize, letterSpacing, baseline);

    
    this.detachAnimation(props);
    this.attachAnimation(props);

    this.view.draw();

  }


  componentDidUpdate(){
    let { screenWidth, screenHeight } = this.props;
    this.view.viewSize = new paper.Size( screenWidth, screenHeight );

  }

  render() {
    let { screenWidth, id, category, screenHeight, containerHeight, animationScriptIdx } = this.props;
    let width, height, leftWidthScale;

    // let height;

    if (screenWidth > BODY_480) {
      
      leftWidthScale = scaleLinear().domain([480, 1440]).clamp(true).range([65, 105]);
      width = (screenWidth - 24 * 2) - leftWidthScale(screenWidth);
      height = containerHeight;

    
    } else {

      width = screenWidth - 24 * 2;
      height = containerHeight;

    }

    return (
      <Fragment>
        <div className="font-anim-viewer" style={{ height: screenHeight, top: -(screenHeight * 0.5 - height * 0.5) }}>
          <canvas id={ id.toLowerCase().replace(/ /g, "-") } className={ "efs-" + animationScriptIdx } ref={ ref => { this.refCanvas = ref;} } width={screenWidth} height={screenHeight} style={{ width: screenWidth, height: screenHeight}}>
          </canvas>
        </div>
        <div style={{ width: width, height: height }}>
        </div>
      </Fragment>
    );
  }
}


let mapStateToProps = state => {
  return {
    screenWidth: state.screenWidth,
    screenHeight: state.screenHeight * 0.5,
    animationScriptIdx: state.animationScriptIdx,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(FontAnimScriptViewer);