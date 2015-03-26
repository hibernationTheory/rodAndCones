var myTHREEJS = {}

myTHREEJS["mouseX"] = 0;
myTHREEJS["mouseY"] = 0;
myTHREEJS["windowWidth"] = window.innerWidth/2;
myTHREEJS["windowHeight"] = window.innerHeight/2;
myTHREEJS["windowHalfX"] = myTHREEJS["windowWidth"]/2;
myTHREEJS["windowHalfY"] = myTHREEJS["windowHeight"]/2;

function onDocumentMouseMove( event ) {
  myTHREEJS["mouseX"] = event.clientX - myTHREEJS["windowHalfX"];
  myTHREEJS["mouseY"] = event.clientY - myTHREEJS["windowHalfY"];
}

function installWindowEvents(camera, renderer) {
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  //document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  //document.addEventListener( 'touchmove', onDocumentTouchMove, false );
}

function autoTumble(camera, scene) {
  camera.position.x += ( myTHREEJS["mouseX"] - camera.position.x ) * 0.0036;
  camera.position.y += ( - (myTHREEJS["mouseY"]) - camera.position.y ) * 0.0036;
  camera.lookAt(scene.position);
}

function tumble(data) {
  var type = data["type"];
  if (!data["damping"]) {
    data["damping"] = 1;
  }
  if (!data["rotateSpeed"]) {
    data["rotateSpeed"] = 0.01;
  }
  if (!data["minDistance"]) {
    data["minDistance"] = 100;
  }
  if (!data["maxDistance"]) {
    data["maxDistance"] = 200;
  }

  if (type === "orbit") {
    var controls = tumbleOrbit(data);
  }
  if (type === "trackball") {
    var controls = tumbleTrackball(data);
  }
  return controls
}

function tumbleOrbit(data) {
  // function to enable orbit style viewport tumbling, requires the orbit js file
  var camera = data["camera"];
  var render = data["render"];
  var controls = new THREE.OrbitControls(camera);

  controls.damping = data["damping"];
  controls.addEventListener("change", render);
  return controls;
}

function tumbleTrackball(data) {
  // function to enable trackball style camera tumbling, requires the trackball js file
  var camera = data["camera"];
  var render = data["render"];
  var controls = new THREE.TrackballControls(camera);

  controls.rotateSpeed = data["rotateSpeed"];
  controls.minDistance = data["minDistance"];
  controls.maxDistance = data["maxDistance"];
  controls.addEventListener( 'change', render );
  return controls;
}

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
  var amount = data && data["amount"] || 500;
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
    var randomNumberScaled = randomNumber * 100;
    data["size"] = [sizeX * randomNumberSizeScaled, sizeY * randomNumberSizeScaled, sizeZ * randomNumberSizeScaled];
    data["name"] = data["baseName"] + "_" + i || "";
    console.log(data["name"]);
    var object = createObject(data);
    if (Math.floor(randomNumberScaled) % 2 === 0) { randomNumberScaled *= -1}
    setTransform({"object":object, "type":"t", "transform":[randomNumberScaled,randomNumberScaled,randomNumberScaled]});
  }
}

function createSprites(scene) {
    var material = new THREE.SpriteMaterial();

    for (var x = -5; x < 5; x++) {
        for (var y = -5; y < 5; y++) {
            var sprite = new THREE.Sprite(material);
            sprite.position.set(x * 10, y * 10, 0);
            scene.add(sprite);
        }
    }
}

function _createParticles(scene) {
    var geom = new THREE.Geometry();
    var material = new THREE.PointCloudMaterial({size: 1, vertexColors: false, color: 0xffffff});

    for (var x = -5; x < 5; x++) {
        for (var y = -5; y < 5; y++) {
            var particle = new THREE.Vector3(x * 10, y * 10, 0);
            geom.vertices.push(particle);
            geom.colors.push(new THREE.Color(Math.random() * 0x00ffff));
        }
    }

    var cloud = new THREE.PointCloud(geom, material);
    scene.add(cloud);
}

function createParticles(size, transparent, opacity, vertexColors, sizeAttenuation, color, scene) {


    var geom = new THREE.Geometry();
    var material = new THREE.PointCloudMaterial({
        size: size,
        transparent: transparent,
        opacity: opacity,
        vertexColors: vertexColors,

        sizeAttenuation: sizeAttenuation,
        color: color
    });


    var range = 500;
    for (var i = 0; i < 15000; i++) {
        var particle = new THREE.Vector3(Math.random() * range - range / 2, Math.random() * range - range / 2, Math.random() * range - range / 2);
        geom.vertices.push(particle);
        var color = new THREE.Color(0x00ff00);
        color.setHSL(color.getHSL().h, color.getHSL().s, Math.random() * color.getHSL().l);
        geom.colors.push(color);

    }

    cloud = new THREE.PointCloud(geom, material);
    cloud.name = "particles";
    scene.add(cloud);
}


function createObject(data) {
  var type = data && data["type"];
  var color = data && data["color"] || "0xcccccc"
  var isWireframe = data && data["wireframe"] || false;
  var material = data && data["material"] || "basic";
  var name = data && data["name"];
  var parent = data && data["parent"];
  var size = data && data["size"];
  var castShadow = data && data["castShadow"] || false;
  var receiveShadow = data && data["receiveShadow"] || false;
  
  if (type === undefined) {
    return null;
  }
  
  if (size !== undefined) {
    var sizeX = size[0];
    var sizeY = size[1];
    var sizeZ = size[2];
  } else {
    var sizeX = 1;
    var sizeY = 1;
    var sizeZ = 1;
  }
  
  if (type === "plane") {
    var geometry = new THREE.PlaneGeometry(sizeX,sizeY);
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
  
  if (name !== undefined) {
    object.name = name;
  }
  if (parent !== undefined) {
    parent.add(object);
  }
  
  return object;
}

function setTransform(data) {
  var obj = data && data["object"];
  if (obj === undefined) { return null;}
  
  var transformType = data && data["type"];
  if (transformType === undefined) {return null;}
  
  var transform = data && data["transform"];
  var transformX = data && data["transformX"];
  var transformY = data && data["transformY"];
  var transformZ = data && data["transformZ"];
  
  if (transform !== undefined) {
    var x = data && data["transform"][0];
    var y = data && data["transform"][1];
    var z = data && data["transform"][2];
  }
  
 if (transformX) {
    var x = data && data["transformX"];
  }
 if (transformY) {
    var y = data && data["transformY"];
 }
 if (transformZ) {
    var z = data && data["transformZ"];
 }
  
  if (transformType === "t") {
    if (x !== undefined) {obj.position.x = x;}
    if (y !== undefined) {obj.position.y = y;}
    if (z !== undefined) {obj.position.z = z;}
  }

  if (transformType === "r") {
    if (x !== undefined) {obj.rotation.x = x;}
    if (y !== undefined) {obj.rotation.y = y;}
    if (z !== undefined) {obj.rotation.z = z;}
  }
}