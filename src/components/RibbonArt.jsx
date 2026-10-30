import React, { useEffect, useRef } from 'react';
import artwork from '../assets/hero-art.png';

// Deform texture coordinates rather than moving a rigid rectangle. The source
// artwork stays as a CSS fallback while the GPU renders the moving material.
export default function RibbonArt() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
    if (!gl) return;
    const shaders = [];
    let program, buffer, texture;
    let frame = 0, previous = 0, elapsed = 0, loaded = false, disposed = false, visible = true;
    let width = 1, height = 1;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mobile = window.matchMedia('(max-width: 767px)');
    const hero = canvas.closest('#hero');
    const pointer = { x: .5, y: .5, vx: 0, vy: 0, targetX: .5, targetY: .5, strength: 0, targetStrength: 0 };
    const compile = (type, source) => {
      const shader = gl.createShader(type);
      shaders.push(shader);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Ribbon shader unavailable');
      return shader;
    };
    try {
      program = gl.createProgram();
      gl.attachShader(program, compile(gl.VERTEX_SHADER, 'attribute vec2 position; varying vec2 uv; void main(){uv=position*.5+.5; gl_Position=vec4(position,0.,1.);}'));
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, `
        precision mediump float;
        varying vec2 uv;
        uniform sampler2D art;
        uniform vec2 resolution;
        uniform vec2 imageSize;
        uniform float time;
        uniform vec2 pointer;
        uniform vec2 breezeOffset;
        uniform float hoverStrength;
        void main(){
          vec2 p=vec2(uv.x,1.-uv.y);
          float aspect=resolution.x/resolution.y;
          float imageAspect=imageSize.x/imageSize.y;
          vec2 crop=vec2(min(1.,aspect/imageAspect), min(1.,imageAspect/aspect));
          // Several traveling waves give the folds independent, continuous motion.
          float wave=sin(p.y*7.5-time*.85)+.35*sin(p.y*15.+p.x*3.+time*.6);
          p.x+=.019*wave;
          p.y+=.011*sin(p.x*7.+p.y*4.-time*.7);
          p=(p-.5)*.94+.5;
          // A soft, local bend in screen space, capped at a few CSS pixels.
          // The broad falloff keeps the painted folds supple without a ripple ring.
          vec2 distanceToPointer=(vec2(uv.x,1.-uv.y)-pointer)*vec2(aspect,1.);
          float influence=exp(-dot(distanceToPointer,distanceToPointer)/.085)*hoverStrength;
          float fold=sin(distanceToPointer.y*6.-distanceToPointer.x*3.+time*.7);
          p+=breezeOffset*influence*vec2(.65+.35*fold,-.55+.25*fold);
          vec2 sampleUV=p*crop+(1.-crop)*vec2(.55,.5);
          vec3 color=texture2D(art,sampleUV).rgb;
          // Restrict the changing light to blue pigment; ivory stays quiet.
          float blue=smoothstep(.04,.3,color.b-color.r);
          color*=1.+blue*.045*sin(p.y*10.-p.x*4.-time);
          color*=1.+blue*.012*influence;
          gl_FragColor=vec4(color,1.);
        }`));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Ribbon program unavailable');
      gl.useProgram(program);
      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    } catch {
      shaders.forEach(shader => gl.deleteShader(shader));
      if (program) gl.deleteProgram(program);
      if (buffer) gl.deleteBuffer(buffer);
      if (texture) gl.deleteTexture(texture);
      return;
    }
    const time = gl.getUniformLocation(program, 'time');
    const resolution = gl.getUniformLocation(program, 'resolution');
    const pointerLocation = gl.getUniformLocation(program, 'pointer');
    const breezeLocation = gl.getUniformLocation(program, 'breezeOffset');
    const strengthLocation = gl.getUniformLocation(program, 'hoverStrength');
    const render = () => {
      if (!loaded || disposed || gl.isContextLost()) return;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(time, media.matches ? 0 : elapsed);
      gl.uniform2f(pointerLocation, media.matches ? 0 : pointer.x, media.matches ? 0 : pointer.y);
      gl.uniform2f(breezeLocation, 6 / Math.max(1, canvas.clientWidth), 4 / Math.max(1, canvas.clientHeight));
      gl.uniform1f(strengthLocation, media.matches || mobile.matches || !finePointer.matches ? 0 : pointer.strength);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    const tick = now => {
      if (disposed) return;
      const delta = previous ? Math.min((now - previous) / 1000, .05) : 0;
      if (!media.matches) elapsed += delta * .16;
      // Exact critically damped spring: smooth reversals, no stiff restart or bounce.
      for (const [axis, velocity, target] of [['x', 'vx', 'targetX'], ['y', 'vy', 'targetY']]) {
        const distance = pointer[axis] - pointer[target];
        const step = (pointer[velocity] + 10 * distance) * delta;
        const decay = Math.exp(-10 * delta);
        pointer[axis] = pointer[target] + (distance + step) * decay;
        pointer[velocity] = (pointer[velocity] - 10 * step) * decay;
      }
      const response = pointer.targetStrength > pointer.strength ? .14 : .3;
      pointer.strength += (pointer.targetStrength - pointer.strength) * (1 - Math.exp(-delta / response));
      previous = now;
      render();
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame);
      previous = 0;
      render();
      if (loaded && visible && !document.hidden && !media.matches && !gl.isContextLost()) frame = requestAnimationFrame(tick);
    };
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.width = Math.max(1, Math.round(canvas.clientWidth * ratio));
      height = canvas.height = Math.max(1, Math.round(canvas.clientHeight * ratio));
      render();
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    intersection.observe(canvas);
    const source = new Image();
    source.onload = () => {
      if (disposed || gl.isContextLost()) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, source);
      gl.uniform2f(gl.getUniformLocation(program, 'imageSize'), source.width, source.height);
      loaded = true;
      resize();
      canvas.dataset.ready = 'true';
      sync();
    };
    source.src = artwork;
    // Fade where the breeze was last felt, instead of sweeping back to the centre.
    const resetPointer = () => { pointer.targetStrength = 0; };
    const movePointer = event => {
      if (event.pointerType !== 'mouse' || !finePointer.matches || media.matches || mobile.matches) { resetPointer(); return; }
      const rect = canvas.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      if (x < 0 || x > 1 || y < 0 || y > 1 || event.target.closest('.hero-container')) { resetPointer(); return; }
      pointer.targetX = x;
      pointer.targetY = y;
      pointer.targetStrength = 1;
    };
    hero.addEventListener('pointermove', movePointer, { passive: true });
    hero.addEventListener('pointerleave', resetPointer);
    window.addEventListener('blur', resetPointer);
    finePointer.addEventListener('change', resetPointer);
    media.addEventListener('change', resetPointer);
    const lost = event => { event.preventDefault(); cancelAnimationFrame(frame); delete canvas.dataset.ready; };
    canvas.addEventListener('webglcontextlost', lost);
    document.addEventListener('visibilitychange', sync);
    media.addEventListener('change', sync);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      source.onload = null;
      observer.disconnect();
      intersection.disconnect();
      canvas.removeEventListener('webglcontextlost', lost);
      document.removeEventListener('visibilitychange', sync);
      media.removeEventListener('change', sync);
      hero.removeEventListener('pointermove', movePointer);
      hero.removeEventListener('pointerleave', resetPointer);
      window.removeEventListener('blur', resetPointer);
      finePointer.removeEventListener('change', resetPointer);
      media.removeEventListener('change', resetPointer);
      shaders.forEach(shader => gl.deleteShader(shader));
      gl.deleteTexture(texture);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);
  return <canvas ref={canvasRef} className="hero-ribbon-canvas" aria-hidden="true" />;
}
