import React, { Component } from 'react'
import { connect } from 'react-redux';
import { changeAnimationIdx } from '../actions';

class AnimationSelector extends Component {
  handleClick(idx, e){
    
    e.stopPropagation();
    this.props.dispatch(changeAnimationIdx(idx));
  }

  render() {
    let { animationIdx, backgroundMode } = this.props;
    return (
      <div className="anim-selector">
        <a onClick={this.handleClick.bind(this, 0) } className={`anim-selector__link${ animationIdx == 0 ? "--selected" : "" }`} href="javascript:void(0);">
          <img src={`./public/assets/ef1_${backgroundMode}.svg`} />
        </a>
        <a onClick={this.handleClick.bind(this, 1) } className={`anim-selector__link${ animationIdx == 1 ? "--selected" : "" }`} href="javascript:void(0);">
          <img src={`./public/assets/ef2_${backgroundMode}.svg`} />
        </a>
        <a onClick={this.handleClick.bind(this, 2) } className={`anim-selector__link${ animationIdx == 2 ? "--selected" : "" }`} href="javascript:void(0);">
          <img src={`./public/assets/ef3_${backgroundMode}.svg`} />
        </a>
        <a onClick={this.handleClick.bind(this, 3) } className={`anim-selector__link${ animationIdx == 3 ? "--selected" : "" }`} href="javascript:void(0);">
          <img src={`./public/assets/ef4_${backgroundMode}.svg`} />              
        </a>
        <a onClick={this.handleClick.bind(this, 4) } className={`anim-selector__link${ animationIdx == 4 ? "--selected" : "" }`} href="javascript:void(0);">
          <img src={`./public/assets/ef5_${backgroundMode}.svg`} />
        </a>
      </div>
    )
  }
}

let mapStateToProps = state => {
  return {
    backgroundMode: state.backgroundMode,
    animationIdx: state.animationIdx
  }
}

export default connect(mapStateToProps)(AnimationSelector);