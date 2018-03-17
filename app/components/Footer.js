import React, { Component } from 'react'
import { connect } from 'react-redux';
import { BODY_600, BODY_960 } from '../constants/defaults';
import { GoogleFontBadge } from './';

const Fragment = React.Fragment;

class Footer extends Component {
  render() {
    let { backgroundMode, screenWidth, locale } = this.props;

    return (
      <footer className="footer">
        <div className="footer__flexwrap">
          {
            screenWidth > BODY_960 ? 
            <div className="footer__left">
              <GoogleFontBadge />
            </div> : 
            <GoogleFontBadge />
          }

          <div className="footer__short-desc">
            {
              locale == "ko" ?
              <div className="footer__short-desc-column">
                <h4>
                  Google Fonts 에 참여하세요.

                </h4><br/>
                <p>
                  Google Fonts는 전 세계의 디자이너와 함께 웹에서 손쉽게 사용할 수 있는 폰트를 개발합니다. Google Fonts와 이곳에 여러분이 제작한 한글 폰트를 제공하고 싶다면 언제든지 <a href="https://twitter.com/googlefonts" target="_blank">@googlefonts</a> 앞으로 멘션을 보내주세요.
                </p>
              </div> :

              <div className="footer__short-desc-column">
                <h4 className="en-regular">
                  Join our community
                </h4><br/>
                <p className="en-regular">
                  We are working with designers around the world to produce best-in-class typeface designs that are made for the web. If you want to offer your own Korean font through Google Fonts, please contact <a href="https://twitter.com/googlefonts" target="_blank">@googlefonts</a>. 
                </p>
              </div> 
            }

            <div className="l-apple-box"></div>
            <p className="en-regular">
              <a href="https://developers.google.com/fonts/docs/getting_started" target="_blank">API Documentation</a><br/>
              <a href="https://github.com/google/fonts" target="_blank">Github</a><br/>
              <a href="https://fonts.google.com/earlyaccess" target="_blank">Early Access</a>
            </p>
          </div>
          
          <div className="footer__team">
            <p className="en-regular">

              Made by Friends of Google Fonts<br/><br/>

              <a href="http://yang-jang.com/" target="_blank">Suyoung Jang</a><br/>
              <a href="http://eroonkang.com" target="_blank">E Roon Kang</a><br/>
              <a href="http://wonyoung.so" target="_blank">Wonyoung So</a><br/>
              <a href="http://minguhongmfg.com/" target="_blank">Guhong Min</a><br/>
              Hannah Son
            </p>
          </div>

          <div className="footer__social">
            <p className="en-regular">
              <a href="https://twitter.com/googlefonts" target="_blank">@googlefonts on Twitter</a><br/>
              <a href="https://github.com/google/fonts" target="_blank">@googlefonts on GitHub</a>
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
    backgroundMode: state.backgroundMode == "black" ? "white" : "black",
    screenWidth: state.screenWidth,
    locale: state.locale
  }
};

export default connect(mapStateToProps)(Footer);