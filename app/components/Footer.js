import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BODY_600, BODY_960 } from '../constants/defaults';

const Fragment = React.Fragment;

class Footer extends Component {
  render() {
    let { backgroundMode, screenWidth } = this.props;

    return (
      <footer className="footer">
        <div className="footer__flexwrap">
          {
            screenWidth > BODY_960 ? 
            <div className="footer__left">
            </div> : 
            null
          }

          <div className="footer__short-desc">
            <div className="footer__short-desc-column">
              <h4>
                구글폰트에 참여하기
              </h4><br/>
              <p>
                구글폰트는 전세계의 디자이너들과 협업하며 웹에서 손쉽게 사용할 수 있는 폰트들을 개발합니다.
              </p>
            </div>
            <div className="l-apple-box"></div>
            <p>
              <a href="javascript:void(0);">API Documentation</a><br/>
              <a href="javascript:void(0);">Github</a><br/>
              <a href="javascript:void(0);">Early Access</a>
            </p>
          </div>
          
          <div className="footer__team">
            <p>

              Made by Friends of Google Fonts<br/><br/>

              Dave Crossland<br/>
              Irin Kim<br/>
              Suyoung Jang<br/>
              E Roon Kang<br/>
              Wonyoung So
            </p>
          </div>

          <div className="footer__social">
            <p>
              @ googlefonts on Twitter<br/>
              @ googlefonts on GitHub
            </p>
          </div>
        </div>
        {
          screenWidth <= BODY_960 ? 
          <Fragment>
            <div className="l-apple-box--double"></div>
            <div className="l-apple-box--double"></div>
          </Fragment> : null
        }
      </footer>
    )
  }
}

let mapStateToProps = state => {
  return {
    backgroundMode: state.backgroundMode,
    screenWidth: state.screenWidth
  }
};

export default connect(mapStateToProps)(Footer);