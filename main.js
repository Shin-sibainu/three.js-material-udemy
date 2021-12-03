import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";

let scene, camera, renderer, pointLight, controls, sphere, plane, octahedron;

window.addEventListener("load", init);

function init() {
  //シーン
  scene = new THREE.Scene();

  //カメラ
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);

  //レンダラー
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  document.body.appendChild(renderer.domElement);

  //ジオメトリ
  const sphereGeometry = new THREE.SphereGeometry(0.5, 16, 16);
  const planeGeometry = new THREE.PlaneGeometry(1, 1);
  const octahedronGeometry = new THREE.OctahedronGeometry(0.5);

  //マテリアル
  const material = new THREE.MeshBasicMaterial();
  // material.map = doorColorTexture;
  // // material.color.set("green");
  // material.color = new THREE.Color("#ff0000");
  // material.color = new THREE.Color("#f00");
  // material.color = new THREE.Color("red");
  // material.color = new THREE.Color("rgb(255, 0, 0)");
  // material.color = new THREE.Color(0xff0000);
  // // material.wireframe = true;
  // // material.opacity = 0.5;
  // material.transparent = true;
  // material.alphaMap = doorAlphaTexture;
  // material.side = THREE.DoubleSide;

  // const material = new THREE.MeshNormalMaterial();
  // material.flatShading = true;

  // const material = new THREE.MeshMatcapMaterial(); //画像から色をピックアップして、それを形に沿うように貼り付ける
  // material.matcap = matcapTexture;

  // const material = new THREE.MeshDepthMaterial();

  // const material = new THREE.MeshLambertMaterial();

  // const material = new THREE.MeshPhongMaterial();
  // material.shininess = 100;
  // material.specular = new THREE.Color("red");

  // const material = new THREE.MeshToonMaterial();
  // material.gradientMap = gradientTexture;

  // const material = new THREE.MeshStandardMaterial(); //よりリアルなマテリアル, roughness, metalnessとか
  // material.metalness = 0.45;
  // material.roughness = 0.65;
  // material.map = doorColorTexture;
  // material.aoMap = doorAmbientOcclusionTexture;

  //メッシュ化
  sphere = new THREE.Mesh(sphereGeometry, material);
  plane = new THREE.Mesh(planeGeometry, material);
  octahedron = new THREE.Mesh(octahedronGeometry, material);

  sphere.position.x = -1.5;
  octahedron.position.x = 1.5;

  scene.add(sphere, plane, octahedron);

  //マウス操作
  const controls = new OrbitControls(camera, renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  animate();
}

const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  console.log(elapsedTime);

  //オブジェクトの回転
  sphere.rotation.x = elapsedTime;
  plane.rotation.x = elapsedTime;
  octahedron.rotation.x = elapsedTime;

  sphere.rotation.y = elapsedTime;
  plane.rotation.y = elapsedTime;
  octahedron.rotation.y = elapsedTime;

  //レンダリング
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

//ブラウザのリサイズに対応
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
