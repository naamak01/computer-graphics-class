var scene, camera, renderer, skyboxGeo, skybox;

init();

function init(){

    const assetPath = '..Computer_Graphics/three.js/pictures';
  
    envMap = new THREE.CubeTextureLoader().setPath(`${assetPath}skybox3_`).load([
      'ft.jpg', 'bk.jpg', 
      'up.jpg', 'dn.jpg', 
      'rt.jpg', 'lf.jpg'
    ])

    skyboxGeo = new THREE.BoxGeometry(10000, 10000, 10000);
    skybox = new THREE.Mesh(skyboxGeo);
    scene.add(skybox);
  
    animate();


  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 55, window.innerWidth / window.innerHeight, 45, 3000 );
  camera.position.set(1200, -250, 20000);

  const ambient = new THREE.HemisphereLight(0xffffbb, 0x080820);
  scene.add(ambient);

  const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.position.set( 1, 10, 6);
  scene.add(light);

  renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  render.domElement.id = "Canvas"
  document.body.appendChild( renderer.domElement );
  animate();

  window.addEventListener('resize', resize, false);

  update();

}

function animate() {

skybox.rotation.x += 0.005;
skybox.rotation.y += 0.005;
renderer.render(scene, camera);
requestAnimationFrame(animate);
}

init();

  const controls = new THREE.OrbitControls( camera, renderer.domElement );
  controls.addEventListener('change', render);
  controls.target.set(0,4,0);
  controls.update();

  //Add meshes here
  const height = 0.4;
  const geometry = new THREE.BoxGeometry(3, height, 0.9);
  const material = new THREE.MeshLambertMaterial({ color: 0x1bbac5 });
  const mesh = new THREE.Mesh( geometry, material);
  //scene.add(mesh);

 // for(let row=0; row<13; row++){
   // let yPos = row * ( height + 0.02);
   // let offset = -1;
   // for(let count=0; count<3; count++){
   //   const block = mesh.clone();
   //   if (row % 2){
    //    block.rotation.y = Math.PI/2;
    //    block.position.set(offset, yPos, 0);
   //   }else{
     //   block.position.set(0, yPos, offset);
   //   }
   //   scene.add(block);
  //    offset++;
  //  }
 // }

function update(){
  requestAnimationFrame( update );
	renderer.render( scene, camera );
}

function resize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
