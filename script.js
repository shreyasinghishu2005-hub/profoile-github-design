document.getElementById("year").textContent = new Date().getFullYear();

// Lightweight 3D wireframe cube using Three.js. If the CDN is unavailable,
// the portfolio remains usable and the rest of the page still works.
(function () {
  const canvas = document.getElementById("cube-canvas");
  if (!canvas || !window.THREE) {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = 300; canvas.height = 300;
      ctx.strokeStyle = "#26c6ff"; ctx.lineWidth = 2;
      ctx.strokeRect(70, 70, 130, 130);
      ctx.strokeRect(105, 35, 130, 130);
      [[70,70,105,35],[200,70,235,35],[70,200,105,165],[200,200,235,165]].forEach(p => {
        ctx.beginPath(); ctx.moveTo(p[0],p[1]); ctx.lineTo(p[2],p[3]); ctx.stroke();
      });
    }
    return;
  }
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 4.3;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const geometry = new THREE.BoxGeometry(1.65, 1.65, 1.65);
  const material = new THREE.MeshBasicMaterial({ color: 0x0b1d36, wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  const inner = new THREE.Mesh(
    new THREE.BoxGeometry(1.05, 1.05, 1.05),
    new THREE.MeshBasicMaterial({ color: 0x8c5cff, wireframe: true })
  );
  scene.add(inner);
  const edges = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(2.05, 2.05, 2.05)),
    new THREE.LineBasicMaterial({ color: 0x26c6ff })
  );
  scene.add(edges);

  function resize() {
    const width = canvas.clientWidth || 290;
    const height = canvas.clientHeight || 290;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.003;
    cube.rotation.y += 0.006;
    inner.rotation.x -= 0.004;
    inner.rotation.y += 0.005;
    edges.rotation.x = cube.rotation.x;
    edges.rotation.y = cube.rotation.y;
    renderer.render(scene, camera);
  }
  animate();
})();
