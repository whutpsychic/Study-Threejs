<!-- 导入模型 -->
<template>
  <main id="canvas"></main>
</template>

<script setup>
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { onMounted } from 'vue';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// 背景壁纸
const textureLoader = new THREE.TextureLoader();
textureLoader.load('image/bg.jpg', function (texture) {
  scene.background = texture; // 将背景设置为图片
});

// 平行光(两道)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 颜色、强度
directionalLight.position.set(1, 1, 1).normalize(); // 设置光源方向
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1); // 颜色、强度
directionalLight2.position.set(-1, -1, -1).normalize(); // 设置光源方向
scene.add(directionalLight);
scene.add(directionalLight2);

// // 聚光灯
// const spotLight = new THREE.SpotLight(0xffffff, 1, 100, Math.PI / 4, 0.5); // 颜色、强度、距离、角度、衰减
// spotLight.position.set(1000, 10, 10); // 设置光源位置
// spotLight.target.position.set(0, 0, 0); // 设置光源目标
// scene.add(spotLight);
// scene.add(spotLight.target); // 必须将目标添加到场景中

// init
onMounted(() => {
  const elemNode = document.getElementById('canvas');
  elemNode.appendChild(renderer.domElement);
  const loader = new GLTFLoader();

  loader.load('models/test_model2.glb', function (gltf) {
    const model = gltf.scene;
    console.log(model)

    // 放大模型(scaleNum倍)
    const scaleNum = 0.8
    model.scale.set(scaleNum, scaleNum, scaleNum);
    // model.position.set(1, 1, 0); // 将模型移动到 (10, 5, 0)
    // model.scale.set(1000, 1000, 1000);

    scene.add(model);

    let angle = 0, radius = 1;

    function animate() {
      requestAnimationFrame(animate);
      model.rotation.x += 0.01
      model.rotation.y += 0.01
      model.rotation.z += 0.01

      // 计算相机位置
      angle += 0.01;
      camera.position.x = radius * Math.cos(angle);
      camera.position.z = radius * Math.sin(angle);

      // 让相机始终朝向原点
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

  }, undefined, function (error) {
    console.error(error);
  });
})


</script>

<style scoped>
#canvas {
  width: 100vw;
  height: 100vh;
}
</style>