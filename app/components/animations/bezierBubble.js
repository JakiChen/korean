import paper from 'paper';
import { convertBgMode } from '../../utils'; 
export const bezierBubble = {
  attach: (_this, backgroundMode) => {

    _this.bezierBubble = {
      point: new paper.Point(400, 200)
    };

    _this.project.activate();

    _this.bezierBubble.maskCircle = new paper.Path.Circle({center: [400, 200], radius: 150, fillColor: "green"});

    _this.bezierBubble.circle = new paper.Path.Circle({center: [400, 200], radius: 150, strokeColor: convertBgMode(backgroundMode, "f")});

    _this.bezierBubble.maskedGlyphs = [];

    _.each(_this.glyphs, (glyph, i) => {
      glyph.strokeWidth = 0;
      glyph.fillColor = convertBgMode(backgroundMode, "f");
      var _g = glyph.clone();
      _g.strokeColor = convertBgMode(backgroundMode, "f");
      _g.fillColor = convertBgMode(backgroundMode, "b");
      _g.dashArray = [5, 5];
      _g.strokeWidth = 2;
      _this.bezierBubble.maskedGlyphs.push(_g);
    });


    _this.bezierBubble.group = new paper.Group([_this.bezierBubble.maskCircle].concat(_this.bezierBubble.maskedGlyphs));
    _this.bezierBubble.group.clipped = true;
    _this.view.draw();

    _this.view.onMouseMove = (e) => {
      _this.bezierBubble.point = e.point;
    }

    // _this.view.emit('onMouseMove');

    _this.view.onFrame = (e) => {
      _this.project.activate();
      _this.bezierBubble.maskCircle.position = _this.bezierBubble.point;
      _this.bezierBubble.circle.position = _this.bezierBubble.point;
      _this.view.draw();
    };

  }, 

  changeBgMode: (_this, backgroundMode) => {

    _this.project.activate();

    _.each(_this.bezierBubble.maskedGlyphs, g => {
      g.strokeColor = convertBgMode(backgroundMode, "f");
      g.fillColor = convertBgMode(backgroundMode, "b");
    });


    _.each(_this.glyphs, (glyph, i) => {
      glyph.fillColor = convertBgMode(backgroundMode, "f");
    });


    _this.bezierBubble.circle.strokeColor = convertBgMode(backgroundMode, "f");

    _this.view.draw();

  },

  detach: (_this) => {
    _this.project.activate();

    _this.bezierBubble.circle.remove();
    _this.bezierBubble.maskCircle.remove();

    _.each(_this.glyphs, (glyph, i) => { 
      glyph.strokeWidth = 1;
    });

    _.each(_this.bezierBubble.maskedGlyphs, g => {
      g.remove();
    });
    _this.bezierBubble.group.remove();

    _this.view.onFrame = null;
    _this.view.onMouseMove = null;
    _this.view.draw();
  }, 


  updatePosition: (_this, x, y, fontScale, font) => {
    var kerningValue = 0;

    _.each(_this.bezierBubble.maskedGlyphs, (glyph, i) => {
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
