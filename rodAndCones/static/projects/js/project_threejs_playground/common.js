function createScene() {
  var scene = new THREE.Scene();
  return scene;
}

function createCamera(data) {
  var fov = data && data["fov"] || 45;
  var aspectRatio = data && data["aspectRatio"] || window.innerWidth/window.innerHeight;
  var nearClippingPlane = data && data["near"] || 0.1;
  var farClippingPlane = data &&  data["far"] || 1000;
  var cam = new THREE.PerspectiveCamera(fov, aspectRatio, nearClippingPlane, farClippingPlane);
  console.log(cam);
  return cam;
}

function createRenderer(data) {
  var castShadow = data && data["castShadow"] || false;
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0x000000, 1.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  if (castShadow === true) {
    renderer.shadowMapEnabled = true;
  }
  return renderer;
}

function createRandomObjects(data) {
  var amount = data && data["amount"] || 100;
  var size = data && data["size"] || null;
  var sizeMultiplier = data && data["sizeMultiplier"] || 1;
  var baseName = data && data["baseName"] || null;

  if (size !== null) {
    var sizeX = size[0];
    var sizeY = size[1];
    var sizeZ = size[2];
  } else {
    var sizeX = 1;
    var sizeY = 1;
    var sizeZ = 1;
  }

  for (var i = 0; i < amount; i ++) {
    var randomNumber = Math.random();
    var randomNumberSizeScaled = randomNumber * sizeMultiplier;
    var randomNumberScaled = randomNumber * 1;
    data["size"] = [sizeX * randomNumberSizeScaled, sizeY * randomNumberSizeScaled, sizeZ * randomNumberSizeScaled];
    data["name"] = data["baseName"] + "_" + i || "";
    var object = createObject(data);
    //setTransform({"object":object, "type":"t", "transform":[randomNumberScaled,randomNumberScaled,randomNumberScaled]});
  }
}

function createObject(data) {
  var type = data && data["type"] || null;
  var color = data && data["color"] || "0xcccccc"
  var isWireframe = data && data["wireframe"] || false;
  var material = data && data["material"] || "basic";
  var name = data && data["name"] || null;
  var parent = data && data["parent"] || null;
  var size = data && data["size"] || null;
  var castShadow = data && data["castShadow"] || false;
  var receiveShadow = data && data["receiveShadow"] || false;
  
  if (type === null) {
    return null;
  }
  
  if (size !== null) {
    var sizeX = size[0];
    var sizeY = size[1];
    var sizeZ = size[2];
  } else {
    var sizeX = 1;
    var sizeY = 1;
    var sizeZ = 1;
  }
  
  if (type === "plane") {
    var geometry = new THREE.PlaneGeometry(sizeX,sizeY,sizeZ,1);
  }
  if (type === "box") {
    var geometry = new THREE.BoxGeometry(sizeX,sizeY,sizeZ);
  } 
  if (type === "sphere") {
    var geometry = new THREE.SphereGeometry(sizeX,sizeY,sizeZ);
  }
  if (type === "pivot") {
    var object = new THREE.Object3D();
    var geometry = false;
  }
  if (type == "light_spot") {
    var object = new THREE.SpotLight(color);
    var geometry = false;
  }
  if (type == "light_ambient") {
    var object = new THREE.AmbientLight(color);
    var geometry = false;
  }
  
  if (material === "normal") {
    var material = new THREE.MeshNormalMaterial();
  } 
  if (material === "basic") {
    var material = new THREE.MeshBasicMaterial({"color":color, "wireframe":isWireframe});
  }
  if (material === "lambert") {
    var material = new THREE.MeshLambertMaterial({"color":color, "wireframe":isWireframe});
  }
  
  if (geometry !== false) {
    var object = new THREE.Mesh(geometry, material);
  }
  
  // SHADOW CASTING
  if (castShadow === true) {
      object.castShadow = true;
    }
  if (receiveShadow === true) {
      object.receiveShadow = true;
  }
  
  if (name !== null) {
    object.name = name;
  }
  if (parent !== null) {
    parent.add(object);
  }
  
  return object;
}

function setTransform(data) {
  var obj = data && data["object"] || null;
  if (obj === null) { return null;}
  
  var transformType = data && data["type"] || null;
  if (transformType === null) {return null;}
  
  var transform = data && data["transform"] || null;
  var transformX = data && data["transformX"] || null;
  var transformY = data && data["transformY"] || null;
  var transformZ = data && data["transformZ"] || null;
  
  if (transform !== null) {
    var x = data && data["transform"][0] || null;
    var y = data && data["transform"][1] || null;
    var z = data && data["transform"][2] || null;
  }
  
 if (transformX) {
    var x = data && data["transformX"] || null;
  }
 if (transformY) {
    var y = data && data["transformY"] || null;
 }
 if (transformZ) {
    var z = data && data["transformZ"] || null;
 }
  
  if (transformType === "t") {
    if (x !== null) {obj.position.x = x;}
    if (y !== null) {obj.position.y = y;}
    if (z !== null) {obj.position.z = z;}
  }

  if (transformType === "r") {
    if (x !== null) {obj.rotation.x = x;}
    if (y !== null) {obj.rotation.y = y;}
    if (z !== null) {obj.rotation.z = z;}
  }
}