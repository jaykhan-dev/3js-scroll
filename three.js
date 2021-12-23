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

const materials = [
    'trigan-logo.png', 
    'trigan-logo.png', 
    'trigan-logo.png'
]

const mapMaterial = materials.map(url => {
    return new THREE.MeshLambertMaterial({
        map: loader.load(materials)
    })
})

const geometry = new THREE.CylinderGeometry(5, 5, 0.5, 32);
const material = new THREE.MeshLambertMaterial( { 
    color: 0x2727e6 
} );
const cylinder = new THREE.Mesh( geometry, materials );
scene.add( cylinder );

camera.position.z = 15;

let currentTimeline = window.pageYOffset / 3000
let aimTimeline = window.pageYOffset / 3000

function animate() {
	requestAnimationFrame( animate );

    currentTimeline += (aimTimeline - currentTimeline) * 0.1

    const rx = currentTimeline * Math.PI * 2
    const ry = (currentTimeline * 0.9 + 0.1) * Math.PI * 1

    cylinder.rotation.set(rx, ry, 0)

	renderer.render( scene, camera );
}
animate();

window.addEventListener("scroll", function () {
    aimTimeline = window.pageYOffset / 3000
})