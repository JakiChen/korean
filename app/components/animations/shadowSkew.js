import paper from 'paper';
import { convertBgMode } from '../../utils';
import { scaleLinear } from 'd3';

export const shadowSkew = {
  attach: (_this, backgroundMode) => {

    _this.shadowSkew = {
      point: new paper.Point(400, 200)
    };

    _this.project.activate();

    _this.shadowSkew.leftGlyphs = [];
    _this.shadowSkew.rightGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      var lg = glyph.clone();
      var rg = glyph.clone();
      glyph.visible = false;
      
      lg.fillColor = convertBgMode(backgroundMode, "f");
      lg.strokeColor = convertBgMode(backgroundMode, "f");
      
      rg.fillColor = convertBgMode(backgroundMode, "b");
      rg.strokeColor = convertBgMode(backgroundMode, "f");
      

      _this.shadowSkew.leftGlyphs.push(lg);
      _this.shadowSkew.rightGlyphs.push(rg);
      
    });

    _this.shadowSkew.rightGroup = new paper.Group(_this.shadowSkew.rightGlyphs);
    _this.shadowSkew.leftGroup = new paper.Group(_this.shadowSkew.leftGlyphs);

    _this.shadowSkew.point = _this.shadowSkew.rightGroup.bounds.center;

    // _this.shadowSkew.leftGroup.shear(0.0, -0.5, _this.shadowSkew.leftGroup.bounds.center);
    // _this.shadowSkew.rightGroup.shear(0.0, 0.5, _this.shadowSkew.rightGroup.bounds.center);
    _this.shadowSkew.leftGroup.visible = false;
    _this.shadowSkew.rightGroup.visible = false;

    _this.view.draw();

    var skewAmountScale = scaleLinear().domain([0, 600]).clamp(true).range([-1.5, 1.0]);
    var xScale = scaleLinear().domain([0, 200, 600]).clamp(true).range([1.0, 1.0, 2.0]);

    _this.view.onMouseMove = (e) => {
      _this.shadowSkew.point = e.point;
    }

    _this.clonedLeftGroup = null;
    _this.clonedRightGroup = null;


    
    _this.view.onFrame = (e) => {
      
      let skewAmount = skewAmountScale(_this.shadowSkew.point.y);
      let xScaleAmount = xScale(_this.shadowSkew.point.y);

      if (!_.isNull(_this.clonedLeftGroup)) {
        _this.clonedLeftGroup.remove();
      }
      if (!_.isNull(_this.clonedRightGroup)) {
        _this.clonedRightGroup.remove();
      }
      
      _this.clonedLeftGroup = _this.shadowSkew.leftGroup.clone();
      _this.clonedRightGroup = _this.shadowSkew.rightGroup.clone();
      _this.clonedLeftGroup.visible = true;
      _this.clonedRightGroup.visible = true;
      


      _this.clonedLeftGroup.shear(0.0, -skewAmount, _this.shadowSkew.leftGroup.bounds.center);
      _this.clonedLeftGroup.scale(xScaleAmount, 1);
      _this.clonedRightGroup.shear(0.0, skewAmount, _this.shadowSkew.rightGroup.bounds.center);
      _this.clonedRightGroup.scale(xScaleAmount, 1);

    };

  }, 

  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    for (let i = 0, len = _this.shadowSkew.leftGlyphs.length; i < len; i++) {

      let lg = _this.shadowSkew.leftGlyphs[i];
      let rg = _this.shadowSkew.rightGlyphs[i];

      lg.fillColor = convertBgMode(backgroundMode, "f");
      lg.strokeColor = convertBgMode(backgroundMode, "f");
      
      rg.fillColor = convertBgMode(backgroundMode, "b");
      rg.strokeColor = convertBgMode(backgroundMode, "f");

    }


    _this.view.draw();

  },

  detach: (_this) => {
    _this.project.activate();

    
    _.each(_this.glyphs, (glyph, i) => { 
      glyph.visible = true;
    });

    _this.shadowSkew.leftGroup.remove();
    _this.shadowSkew.rightGroup.remove();
    if (!_.isNull(_this.clonedLeftGroup)) {
      _this.clonedLeftGroup.remove();
    }
    if (!_.isNull(_this.clonedRightGroup)) {
      _this.clonedRightGroup.remove();
    }

    _this.view.onFrame = null;
    _this.view.onMouseMove = null;
    _this.view.draw();
  }, 


  updatePosition: (_this, x, y, fontScale, font) => {
    var kerningValue = 0;

    _.each(_this.shadowSkew.leftGlyphs, (glyph, i) => {
      glyph.position = new paper.Point(x, y);

      if (_this.glyphs[i].fontGlyph.advanceWidth) {
        x += _this.glyphs[i].fontGlyph.advanceWidth * fontScale;
      }
      if (i < _this.glyphs.length - 1) {
        kerningValue = font.getKerningValue(_this.glyphs[i].fontGlyph, _this.glyphs[i + 1].fontGlyph);
        x += kerningValue * fontScale;
      }
    });

    _.each(_this.shadowSkew.rightGlyphs, (glyph, i) => {
      glyph.position = new paper.Point(x, y);

      if (_this.glyphs[i].fontGlyph.advanceWidth) {
        x += _this.glyphs[i].fontGlyph.advanceWidth * fontScale;
      }
      if (i < _this.glyphs.length - 1) {
        kerningValue = font.getKerningValue(_this.glyphs[i].fontGlyph, _this.glyphs[i + 1].fontGlyph);
        x += kerningValue * fontScale;
      }
    });

  }
};



// var circlePath1 = new Path.Circle(new Point(350, 350), 125);
// var circlePath2 = new Path.Circle(new Point(550, 350), 125);
// var circlePath3 = new Path.Circle(new Point(750, 350), 125);
// circlePath1.strokeColor = 'black';
// circlePath2.strokeColor = 'black';
// circlePath3.strokeColor = 'black';

// var g = new Group([circlePath1, circlePath2, circlePath3]);
// var d = g.clone();
// d.shear(0.0, -0.5, new Point(550, 350));
// g.shear(0.0, 0.5, new Point(550, 350));
// // circlePath.