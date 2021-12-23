const section = document.querySelector("section.book")

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
section.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight(0x888888)
scene.add(ambient)

const light = new THREE.DirectionalLight(0xffffff)
light.position.set(0, 0, 6)
scene.add(light)

const loader = new THREE.TextureLoader()

const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
const material = new THREE.MeshLambertMaterial( { 
    color: 0x2727e6 
} );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 6;

let currentTimeline = window.pageYOffset / 3000
let aimTimeline = window.pageYOffset / 3000

function animate() {
	requestAnimationFrame( animate );

    currentTimeline += (aimTimeline - currentTimeline) * 0.1

    const rx = currentTimeline * -0.5 + 0.5
    const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 2

    cube.rotation.set(rx, ry, 0)

	renderer.render( scene, camera );
}
animate();

window.addEventListener("scroll", function () {
    aimTimeline = window.pageYOffset / 3000
})