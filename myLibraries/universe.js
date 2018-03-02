
var universe = {
  state: false,
  renderer: new THREE.WebGLRenderer({
    antialias: true
  }),
  scene: new THREE.Scene(),
  camera: new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 10000000),
  stats: new Stats(),
  mouse: new THREE.Vector2(),
  controls: null,
  gui: new dat.GUI(),
  params: {
    controls: "TrackballControls"
  },

  createTheUniverse: function () {
    var div = document.getElementById("container");
    div.appendChild(universe.renderer.domElement);
    div.appendChild(universe.stats.dom);

    universe.renderer.setSize(window.innerWidth, window.innerHeight);
    universe.renderer.setPixelRatio(window.devicePixelRatio);


    universe.camera.position.z = 1000;

    universe.controls = new THREE.TrackballControls(universe.camera, universe.renderer.domElement);
    universe.guiControl = "Trackball Controls";

    universe.state = true;

    //universe.gui.add(universe.params, "controls", ["Trackball Controls", "Orbit Controls"]);



    universe.render();

    window.addEventListener("resize", universe.onWindowResize, false);
    universe.renderer.domElement.addEventListener("mousemove", universe.onMouseMove);
    
    universe.drawLine(new THREE.Vector3( 20000, 0, 0), "#ff0000" );

    universe.drawLine(new THREE.Vector3( 0, 20000, 0), "#00ff00" );

    universe.drawLine(new THREE.Vector3( 0, 0, 20000), 0x0000ff );
    
    
    

   

    universe.gui.close();

  },

  render: function () {

    universe.renderer.render(universe.scene, universe.camera);
    universe.verifyControls();
    universe.controls.update();
    universe.stats.update();
    requestAnimationFrame(universe.render);
  },

  onWindowResize: function () {
    universe.camera.aspect = window.innerWidth / window.innerHeight;
    universe.camera.updateProjectionMatrix();
    universe.renderer.setSize(window.innerWidth, window.innerHeight);
    
  },

  onMouseMove: function (event) {

    universe.mouse.x = event.clientX;
    universe.mouse.y = event.clientY;


  },

  verifyControls: function () {
    if (universe.guiControl != universe.params.controls) {
      if (universe.params.controls == "Orbit Controls") {
        delete universe.controls;
        universe.controls = new THREE.OrbitControls(universe.camera, universe.renderer.domElement);

      } else if (universe.params.controls == "Trackball Controls") {
        delete universe.controls;
        universe.controls = new THREE.TrackballControls(universe.camera, universe.renderer.domElement);
      }

      universe.guiControl = universe.params.controls;

    }


  },

  drawLine: function (finalPoint, colorHex ){
    var material = new THREE.LineBasicMaterial( { color: colorHex } );

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( 0, 0, 0) );
    geometry.vertices.push(finalPoint);

    var line = new THREE.Line( geometry, material ); 

    

    universe.scene.add(line);


  }

  



};
universe.createTheUniverse();