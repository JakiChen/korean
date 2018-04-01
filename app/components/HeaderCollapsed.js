import React, { Component } from 'react';
import { CATEGORIES, BODY_600, BODY_960, BODY_1280 } from '../constants/defaults';
import { connect } from 'react-redux';
import { AnimationSelector, DropDownCategorySelector, AnimationScriptSelector } from './';
import { changeLocale, changeCurrentCategory, changeHeaderHeight, changeCategoryDropdownOpened } from '../actions';
import scrollama from 'scrollama';
import { changeIsOnScript } from '../actions';
import 'gsap';

const Fragment = React.Fragment;

class HeaderCollapsed extends Component {
  constructor(props){
    super(props);

    this.scroller = scrollama();
    this.state = {
      isMenuOpen: false
    };
  }

  moveToDescription(e){
    e.stopPropagation();
    let pos = document.querySelector("a[name=description-indicator]").offsetTop;

    TweenMax.to((document.scrollingElement || document.documentElement), 1, { ease: Power3.easeInOut, scrollTop: pos });
  }

  componentDidMount(){

    this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight + 20));

    this.scroller.setup({
        step: '.font-container',
        // debug: true,
        // progress: true,
        offset: 60 / this.props.screenHeight
      }).onStepEnter(this.handleStepEnter.bind(this))
        // .onStepProgress(this.handleStepProgress.bind(this))
        .onStepExit(this.handleStepExit.bind(this));
  }

  handleStepEnter(e){
    this.props.dispatch(changeCurrentCategory({
      id: Number(e.element.dataset.categoryId),
      type: 'scroll' // click, scroll
    }));

    if (Number(e.element.dataset.categoryId) === 3) {
      this.props.dispatch(changeIsOnScript(true));   
    }
  }

  handleStepExit(e){  
    if (Number(e.element.dataset.categoryId) === 3) {
      this.props.dispatch(changeIsOnScript(false));
    }
  }

  componentWillReceiveProps(newProps){
    if (this.props.screenWidth != newProps.screenWidth) {
      this.props.dispatch(changeHeaderHeight(this.refHeader.offsetHeight));
      this.setState({
        isMenuOpen: false
      });
    }

  }

  handleToggleLocale(e) {

    e.stopPropagation();
    this.props.dispatch(changeLocale(this.props.locale === "ko" ? "en" : "ko"));
  }

  handleCurrentCategory(categoryData, e){
    
    e.stopPropagation();
    this.props.dispatch(changeCurrentCategory(categoryData.id));
  }
  
  toggleMenu(e){
    e.stopPropagation();
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  handleCategoryClick(e){

    e.stopPropagation();

    if (!this.props.categoryDropdownOpened) {
      this.props.dispatch(changeCategoryDropdownOpened(true));
    }    
  }

  render() {
    // let {  } = this.state;
    let { isOnScript, categoryDropdownOpened, locale, screenWidth, headerCollapsedTop, backgroundMode } = this.props;
    let currentCategory = _.find(CATEGORIES, categoryData => { return categoryData.id == this.props.currentCategory.id; });

    return (
      <Fragment>
        <header className="header-collapsed" style={{ top: headerCollapsedTop }} ref={ ref => { this.refHeader = ref; }}>
        {
          
                    // <AnimationScriptSelector />
        }
          <div className="header-collapsed__flexwrap">
            <div className="header-collapsed__left">
              {
                locale == "ko" ? 
                <h1>
                  <span className="en-black">Google Fonts + </span> 한국어
                </h1>
                : 
                <h1>
                  <span className="en-black">Google Fonts + </span> 한국어
                </h1>
              }

              {
                screenWidth > BODY_600 ? 
                (isOnScript ? 

                  <div className="header__anim-wrap">
                    <AnimationScriptSelector/>
                  </div> : 
                  <div className="header__anim-wrap">
                    <AnimationSelector />
                  </div>) : null
              }
              {
                screenWidth > BODY_960 ? 
                <div className="header-collapsed__categories">
                  <a className="category-selector--selected" href="javascript:void(0);" onClick={ this.handleCategoryClick.bind(this) }>
                    {
                      locale == "ko" ?
                      <Fragment>
                        <div className="category-selector__label-ko-collapsed">
                          {
                            currentCategory.nameKo
                          }
                        </div>
                        <div className="category-selector__label-en-right">
                          {
                            currentCategory.nameEn
                          }
                        </div>
                        <img src={`./public/assets/arrow_down_${backgroundMode}.svg`} alt="arrow_down" />
                      </Fragment> : 
                      <Fragment>
                        <div className="category-selector__label-en-collapsed">
                          {
                            currentCategory.nameEn
                          }
                        </div>
                        <div className="category-selector__label-ko-right">
                          {
                            currentCategory.nameKo
                          }
                        </div>
                        <img src={`./public/assets/arrow_down_${backgroundMode}.svg`} alt="arrow_down" />
                      </Fragment>
                    }
                  </a>
                </div> : null 
              }

            </div>
            {
              screenWidth < BODY_600 ?
              <div className="header__anim-wrap">
                {
                  isOnScript ? <AnimationScriptSelector/> : <AnimationSelector />
                }
              </div> : null
            }
            {
              screenWidth > BODY_960 ? (locale == "ko" ? 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)" className="" onClick={this.moveToDescription.bind(this)}>
                    <span className="en-black">Google Fonts + </span> 한국어 소개 
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="en-black">
                    English
                  </a>
                </div>
              </div> : 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)"  onClick={this.moveToDescription.bind(this)}>
                    About Google Fonts + Korean
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                    한국어
                  </a> 
                </div>
              </div>) : null
            }

            <a href="javascript:void(0);" onClick={this.toggleMenu.bind(this)} className="header-collapsed__hamburger">
              {
                this.state.isMenuOpen ? 
                <img src={`./public/assets/close_${backgroundMode}.svg`} alt="menu" /> :
                <img src={`./public/assets/hamburger_${backgroundMode}.svg`} alt="menu" />
              }
            </a>
          </div>
          {
            (this.state.isMenuOpen) ? 
            <Fragment>
              <div className="header__mo">
                <div className="header__categories">
                  {
                    _.map(CATEGORIES, categoryData => {
                      return (
                        <a className={`category-selector${ categoryData.id === currentCategory ? "--selected" : ""}`} onClick={this.handleCurrentCategory.bind(this, categoryData)} key={categoryData.id} href="javascript:void(0);">
                          {
                            locale == "ko" ? 
                            <Fragment>
                              <div className="category-selector__label-ko-left">
                                {
                                  categoryData.nameKo
                                }
                              </div>
                              <div className="category-selector__label-en-right">
                                {
                                  categoryData.nameEn
                                }
                              </div>
                            </Fragment> :
                            <Fragment> 
                              <div className="category-selector__label-en-left">
                                {
                                  categoryData.nameEn
                                }
                              </div>
                              <div className="category-selector__label-ko-right">
                                {
                                  categoryData.nameKo
                                }
                              </div>
                            </Fragment>
                          }
                        </a>
                      );
                    })
                  }
                </div>
              {
                screenWidth < BODY_960 ? (locale == "ko" ? 
              <div className={`header__menu--${locale}`}>
                  <a href="javascript:void(0)" className=""  onClick={this.moveToDescription.bind(this)}>
                    <span className="en-black">Google Fonts + </span> 한국어 소개 
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="en-black">
                    English
                  </a>
              </div> : 
              <div className={`header__menu--${locale}`}>
                <div>
                  <a href="javascript:void(0)" className="en-black" onClick={this.moveToDescription.bind(this)}>
                    About Google Fonts + Korean
                  </a>
                  <a href="javascript:void(0)" onClick={this.handleToggleLocale.bind(this)} className="">
                    한국어
                  </a> 
                </div>
              
              </div>) : null
              }
              </div>
            </Fragment> : null
          }
        </header>
        {
          categoryDropdownOpened ? 
          <DropDownCategorySelector /> : null
        }
      </Fragment>
    );
  }
}

let mapStateToProps = state => {
  return {
    locale: state.locale, 
    currentCategory: state.currentCategory,
    categoryDropdownOpened: state.categoryDropdownOpened,
    screenWidth: state.screenWidth,
    isOnScript: state.isOnScript,
    screenHeight: state.screenHeight,
    headerCollapsedTop: state.headerCollapsedTop,
    backgroundMode: state.backgroundMode
  }
}

export default connect(mapStateToProps)(HeaderCollapsed);