var baseUrl = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/106114/";

var vw = 630;
var vh = 410;

var app = new PIXI.Application(vw, vh, {
  view: document.getElementById("canvas")
});

var loader = new PIXI.loaders.Loader(baseUrl)
  .add("displacementMap", "displacementmap2.png?v=1")
  .add("rocks", "rocks.jpg?v=1")
  .load(water);

function water(loader, resources) {
  console.log(resources);
  var container = new PIXI.Container();
  var background = new PIXI.Sprite(resources.rocks.texture);
  var displacementSprite = new PIXI.Sprite(resources.displacementMap.texture);
  var displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
  
  container.filterArea = new PIXI.Rectangle(0, 0, vw - 20, vh - 20);
  container.filters = [displacementFilter];
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  
  container.position.set(-10);  
  container.addChild(background);
  container.addChild(displacementSprite);
  app.stage.addChild(container);
    
  TweenMax.to(displacementSprite, 5, {
    ease: Linear.easeNone,
    repeat: -1,
    x: 512,
    y: 512
  });
}