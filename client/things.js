const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	1,
	1000
);
var d = new Date();
var n = d.getHours();
const canvas = document.getElementById('gc');
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
function tc(){
  if(n > 19 || n < 6) {
    return "#191970";
  }
  else if(n > 6 && n < 7) {
    return "#fad6a5";
  } 
    
  else if(n > 16 && n < 19) {
    return "#fad6a5";
  }
  else {
    return "skyblue";
  }
}

scene.background = new THREE.Color(tc());
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const distance = 8;
camera.position.set(0, -5, 0);
camera.rotation.x = Math.PI / 2;

const light = new THREE.AmbientLight("#fff");
scene.add(light);
const shadowLight = new THREE.PointLight(0x777777, 1, 100);
shadowLight.position.set(0, 0, 10);
scene.add(shadowLight);
shadowLight.castShadow = true;
shadowLight.shadow.mapSize.width = 1024;
shadowLight.shadow.mapSize.height = 1024;

var textureLoader = new THREE.TextureLoader();                             
var texture0 = textureLoader.load( 'bside2.png' );                       
var texture1 = textureLoader.load( 'bsides.svg' );                       
var texture2 = textureLoader.load( 'bicon.svg' );                       
var texture3 = textureLoader.load( 'bback.png' );                       
var texture4 = textureLoader.load( 'top.png' );                       
var texture5 = textureLoader.load( 'top.png' );                       
var bcubems = [                                                      
  new THREE.MeshBasicMaterial( { map: texture0 } ),                      
  new THREE.MeshBasicMaterial( { map: texture1 } ),                      
  new THREE.MeshBasicMaterial( { map: texture2 } ),                      
  new THREE.MeshBasicMaterial( { map: texture3 } ),                      
  new THREE.MeshBasicMaterial( { map: texture4 } ),                      
  new THREE.MeshBasicMaterial( { map: texture5 } )                       
];       

var textureLoader = new THREE.TextureLoader();                             
var texture0 = textureLoader.load( 'sides.png' );                       
var texture1 = textureLoader.load( 'sides2.svg' );                       
var texture2 = textureLoader.load( 'icon.svg' );                       
var texture3 = textureLoader.load( 'back.png' );                       
var texture4 = textureLoader.load( 'top.png' );                       
var texture5 = textureLoader.load( 'top.png' );                       
var cubems = [                                                      
  new THREE.MeshBasicMaterial( { map: texture0 } ),                      
  new THREE.MeshBasicMaterial( { map: texture1 } ),                      
  new THREE.MeshBasicMaterial( { map: texture2 } ),                      
  new THREE.MeshBasicMaterial( { map: texture3 } ),                      
  new THREE.MeshBasicMaterial( { map: texture4 } ),                      
  new THREE.MeshBasicMaterial( { map: texture5 } )                       
];  

class Player {
	constructor(x, y, z, img, user) {
		this.mesh = new THREE.Mesh(
			new THREE.BoxGeometry(1, 1, 1), img);
		this.mesh.castShadow = true;
		this.mesh.position.set(x, y, z);
		scene.add(this.mesh);
    
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    this.texture = new THREE.Texture(canvas);
    this.healthbar = new THREE.Sprite(
      new THREE.SpriteMaterial({map: this.texture})
    );
    this.healthbar.position.set(x, y, z + 1.5);
    scene.add(this.healthbar);
    this.ctx = canvas.getContext('2d');
    this.ctx.textAlign = "center";
    this.ctx.font = "bold 25px Courier New";
  }
  updateHealth(hp, score, x, y, z) {
    this.healthbar.position.set(x, y, z + 1.5);
    this.texture.needsUpdate = true;
    this.ctx.clearRect(0, 0, 64, 64);
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 54, 64, 10);
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(0, 54, hp * 0.64, 10);
    this.ctx.fillStyle = "white";
    this.ctx.fillText(score, 32, 40);
  }
}

class Floor {
	constructor(x, y, z, w, h, d, texture) {
		this.mesh = new THREE.Mesh(
			new THREE.BoxGeometry(w, h, d),
      new THREE.MeshLambertMaterial({ map: THREE.ImageUtils.loadTexture(texture) })
		);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		this.mesh.position.set(x, y, z);
		scene.add(this.mesh);
	}
}

function randcol() {
  return '#'+Math.floor(Math.random()*16777215).toString(16);
}

class Bullet {
  constructor(x, y, z) {
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, Math.floor(Math.random() * 8) ,Math.floor(Math.random() * 8)),
      new THREE.MeshLambertMaterial({color: randcol()})
    );
		this.mesh.position.set(x, y, z);
		scene.add(this.mesh);
  }
}
