import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Axes Helper
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/7.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;
const secondMatcapTexture = textureLoader.load("/textures/matcaps/2.png");
secondMatcapTexture.colorSpace = THREE.SRGBColorSpace;
const thirdMatcapTexture = textureLoader.load("/textures/matcaps/3.png");
thirdMatcapTexture.colorSpace = THREE.SRGBColorSpace;
const fourthMatcapTexture = textureLoader.load("/textures/matcaps/4.png");
fourthMatcapTexture.colorSpace = THREE.SRGBColorSpace;
const fifthMatcapTexture = textureLoader.load("/textures/matcaps/5.png");
fifthMatcapTexture.colorSpace = THREE.SRGBColorSpace;
const sixthMatcapTexture = textureLoader.load("/textures/matcaps/6.png");
sixthMatcapTexture.colorSpace = THREE.SRGBColorSpace;
const seventhMatcapTexture = textureLoader.load("/textures/matcaps/7.png");
seventhMatcapTexture.colorSpace = THREE.SRGBColorSpace;
const eighthMatcapTexture = textureLoader.load("/textures/matcaps/8.png");
eighthMatcapTexture.colorSpace = THREE.SRGBColorSpace;

console.log("matcapTexture", matcapTexture);
console.log("added");

/**
 * Fonts
 */
const fontLoader = new FontLoader();
console.log(fontLoader);
fontLoader.load("/fonts/helvetiker_bold.typeface.json", (font) => {
	console.log("font loaded", font);
	const textGeometry = new TextGeometry("Hello World", {
		font,
		size: 0.5,
		height: 0.2,
		curveSegments: 5,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0,
		bevelSegments: 4,
	});
	// textGeometry.computeBoundingBox();
	// textGeometry.translate(
	// 	-(textGeometry.boundingBox.max.x - 0.02) * 0.5,
	// 	-(textGeometry.boundingBox.max.y - 0.02) * 0.5,
	// 	-(textGeometry.boundingBox.max.z - 0.03) * 0.5
	// );
	// textGeometry.computeBoundingBox();
	textGeometry.center();
	console.log(textGeometry.boundingBox);
	const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
	const text = new THREE.Mesh(textGeometry, textMaterial);
	scene.add(text);
	// console.time("donuts");
	const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
	const donutMaterial = new THREE.MeshMatcapMaterial({
		matcap: eighthMatcapTexture,
	});
	for (let i = 0; i < 100; i++) {
		const donut = new THREE.Mesh(donutGeometry, donutMaterial);
		donut.position.x = (Math.random() - 0.5) * 10;
		donut.position.y = (Math.random() - 0.5) * 10;
		donut.position.z = (Math.random() - 0.5) * 10;
		donut.rotation.x = Math.random() * Math.PI * 0.25;
		donut.rotation.y = Math.random() * Math.PI * 0.25;
		const scale = Math.random();
		donut.scale.x = scale;
		donut.scale.y = scale;
		donut.scale.z = scale;

		scene.add(donut);
	}
	// console.timeEnd("donuts");
});

/**
 * Object
 */
// const cube = new THREE.Mesh(
// 	new THREE.BoxGeometry(1, 1, 1),
// 	new THREE.MeshBasicMaterial()
// );

// scene.add(cube);

/**
 * Sizes
 */
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
