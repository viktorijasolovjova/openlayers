/**
 * @module ol/TileRange
 */
/**
 * A representation of a contiguous block of tiles.  A tile range is specified
 * by its min/max tile coordinates and is inclusive of coordinates.
 *
 * @constructor
 * @param {number} minX Minimum X.
 * @param {number} maxX Maximum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxY Maximum Y.
 * @struct
 */
var TileRange = function(minX, maxX, minY, maxY) {

  /**
   * @type {number}
   */
  this.minX = minX;

  /**
   * @type {number}
   */
  this.maxX = maxX;

  /**
   * @type {number}
   */
  this.minY = minY;

  /**
   * @type {number}
   */
  this.maxY = maxY;

};


/**
 * @param {number} minX Minimum X.
 * @param {number} maxX Maximum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxY Maximum Y.
 * @param {ol.TileRange|undefined} tileRange TileRange.
 * @return {ol.TileRange} Tile range.
 */
TileRange.createOrUpdate = function(minX, maxX, minY, maxY, tileRange) {
  if (tileRange !== undefined) {
    tileRange.minX = minX;
    tileRange.maxX = maxX;
    tileRange.minY = minY;
    tileRange.maxY = maxY;
    return tileRange;
  } else {
    return new TileRange(minX, maxX, minY, maxY);
  }
};


/**
 * @param {ol.TileCoord} tileCoord Tile coordinate.
 * @return {boolean} Contains tile coordinate.
 */
TileRange.prototype.contains = function(tileCoord) {
  return this.containsXY(tileCoord[1], tileCoord[2]);
};


/**
 * @param {ol.TileRange} tileRange Tile range.
 * @return {boolean} Contains.
 */
TileRange.prototype.containsTileRange = function(tileRange) {
  return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX &&
      this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
};


/**
 * @param {number} x Tile coordinate x.
 * @param {number} y Tile coordinate y.
 * @return {boolean} Contains coordinate.
 */
TileRange.prototype.containsXY = function(x, y) {
  return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
};


/**
 * @param {ol.TileRange} tileRange Tile range.
 * @return {boolean} Equals.
 */
TileRange.prototype.equals = function(tileRange) {
  return this.minX == tileRange.minX && this.minY == tileRange.minY &&
      this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
};


/**
 * @param {ol.TileRange} tileRange Tile range.
 */
TileRange.prototype.extend = function(tileRange) {
  if (tileRange.minX < this.minX) {
    this.minX = tileRange.minX;
  }
  if (tileRange.maxX > this.maxX) {
    this.maxX = tileRange.maxX;
  }
  if (tileRange.minY < this.minY) {
    this.minY = tileRange.minY;
  }
  if (tileRange.maxY > this.maxY) {
    this.maxY = tileRange.maxY;
  }
};


/**
 * @return {number} Height.
 */
TileRange.prototype.getHeight = function() {
  return this.maxY - this.minY + 1;
};


/**
 * @return {ol.Size} Size.
 */
TileRange.prototype.getSize = function() {
  return [this.getWidth(), this.getHeight()];
};


/**
 * @return {number} Width.
 */
TileRange.prototype.getWidth = function() {
  return this.maxX - this.minX + 1;
};


/**
 * @param {ol.TileRange} tileRange Tile range.
 * @return {boolean} Intersects.
 */
TileRange.prototype.intersects = function(tileRange) {
  return this.minX <= tileRange.maxX &&
      this.maxX >= tileRange.minX &&
      this.minY <= tileRange.maxY &&
      this.maxY >= tileRange.minY;
};
export default TileRange;