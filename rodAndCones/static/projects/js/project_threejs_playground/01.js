var myTHREEJS = {}
myTHREEJS["renderer"] = createRenderer({"castShadow":true});
myTHREEJS["scene"] = createScene();
myTHREEJS["camera"] = createCamera();

myTHREEJS["control"]  = new function () {
  this.boxScaleX = 1;
  this.boxScaleY = 0.1;
  this.boxScaleZ = 100;
  this.rotationSpeedX = 0.001;
  this.rotationSpeedY = 0.001;
  this.rotationSpeedZ = 0.001;
  this.scale = 7;
};

function addControls(controlObject) {
  var gui = new dat.GUI();
  gui.add(controlObject, 'boxScaleX', 0.1, 100);
  gui.add(controlObject, 'boxScaleY', 0.1, 100);
  gui.add(controlObject, 'boxScaleZ', 0.1, 100);
  gui.add(controlObject, 'rotationSpeedX', -0.1, 0.1);
  gui.add(controlObject, 'rotationSpeedY', -0.1, 0.1);
  gui.add(controlObject, 'rotationSpeedZ', -0.1, 0.1);
  gui.add(controlObject, 'scale', 0.01, 10);
}

(function init() {
  var scene = myTHREEJS["scene"];
  var camera = myTHREEJS["camera"];
  var renderer = myTHREEJS["renderer"];
  
  var plane =  createObject({"type":"plane", "material":"lambert", "color":0xcccccc, "name":"plane_ground", "size":[60,20], "parent":scene});
  var sphere =  createObject({"type":"sphere", "material":"lambert", "color":0xffffff, "name":"sphere", "size":[4,20,20], "parent":scene});
  var cube = createObject({"type":"box", "material":"normal", "name":"cube", "parent":scene});
  var light = createObject({"type":"light_spot", "name":"light_spot_01", "color":0xffffff, "parent":scene, "castShadow":true});
  // var light_ambient = createObject({"type":"light_ambient", "name":"light_ambient_01", "color":0x0c0c0c, "parent":scene});

  //plane.rotation.x=-0.5*Math.PI;
  
  setTransform({"object":camera, "type":"t", "transform":[-30,40,30]});
  setTransform({"object":plane, "type":"t", "transform":[15,0,0]});
  setTransform({"object":plane, "type":"r", "transformX":-0.5*Math.PI});
  setTransform({"object":cube, "type":"t", "transform":[-4,3,0]});
  setTransform({"object":sphere, "type":"t", "transform":[20,4,2]});

  setTransform({"object":light, "type":"t", "transform":[40,60,-10]});
  camera.lookAt(scene.position);

  //createRandomObjects({"type":"box", "material":"lambert", "color":0xffffff, "name":"box-ground-plane", "size":[5,5,5], "parent":scene, "baseName":"cube", "sizeMultiplier":0.25})
  
  addControls(myTHREEJS["control"]);

  document.body.appendChild(renderer.domElement);
  myRender({"renderer":renderer, "scene":scene, "camera":camera});
}
)();

function myRender() {
  var scene = myTHREEJS["scene"];
  var controller = myTHREEJS["control"];

  myTHREEJS["renderer"].render(scene, myTHREEJS["camera"]);

  //var cube = scene.getObjectByName("cube");
  //var plane = scene.getObjectByName("plane");
  var groundPlane = scene.getObjectByName("box-ground-plane");

  //cube.rotation.x += controller.rotationSpeedX;
  //cube.rotation.y += controller.rotationSpeedY;
  //cube.rotation.z += controller.rotationSpeedZ;

  /*
  groundPlane.scale.x = controller.boxScaleX;
  groundPlane.scale.y = controller.boxScaleY;
  groundPlane.scale.z = controller.boxScaleZ;
  */
  //cube.scale.set(controller.scale, controller.scale, controller.scale);
  requestAnimationFrame(myRender);
}
