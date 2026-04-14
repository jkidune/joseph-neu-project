"use client";

import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    // Map from bottom-left to top-left to match canvas coordinates
    vUv.y = 1.0 - vUv.y;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const SIM_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tMap;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform float uDecay;
  uniform float uBrushSize;
  uniform vec2 uResolution;

  void main() {
    vec2 uv = vUv;
    vec4 color = texture2D(tMap, uv);
    
    // Slight automatic spreading (diffusion)
    vec4 n = texture2D(tMap, uv + vec2(0.0, 1.0/uResolution.y));
    vec4 s = texture2D(tMap, uv - vec2(0.0, 1.0/uResolution.y));
    vec4 e = texture2D(tMap, uv + vec2(1.0/uResolution.x, 0.0));
    vec4 w = texture2D(tMap, uv - vec2(1.0/uResolution.x, 0.0));
    vec4 blurred = (color * 4.0 + n + s + e + w) / 8.0;
    
    // Fade out (decay)
    vec4 nextColor = blurred * uDecay;
    
    // Add velocity based on mouse activity
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    float d = distance(uv * aspect, uMouse * aspect);
    float influence = exp(-d * d / (uBrushSize * uBrushSize));
    
    // Inject the velocity into the red/green channels
    nextColor.rg += influence * uVelocity * 0.2;
    
    gl_FragColor = nextColor;
  }
`;

const DISPLAY_SHADER = `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tMap;
  uniform float uDistortionStrength;

  // Background gradient map using colors: blue -> gold -> red
  vec3 getBackground(vec2 uv) {
    // The gradient runs from top to bottom
    float t = uv.y; 
    vec3 c1 = vec3(0.0, 0.34, 1.0);    // #0057ff - Blue
    vec3 c2 = vec3(0.95, 0.77, 0.35);  // #f2c55b - Gold
    vec3 c3 = vec3(1.0, 0.0, 0.0);     // #ff0000 - Red

    vec3 col = mix(c1, c2, smoothstep(0.0, 0.5, t));
    col = mix(col, c3, smoothstep(0.5, 1.0, t));
    return col;
  }

  void main() {
    vec2 uv = vUv;
    
    // Read the fluid simulation data
    vec4 fluid = texture2D(tMap, uv);
    
    // Apply distortion based on the fluid velocity
    vec2 distortedUv = uv - fluid.rg * uDistortionStrength;
    
    // Clamp to prevent out-of-bounds artifacting
    distortedUv = clamp(distortedUv, 0.0, 1.0);
    
    // Output the gradient with distortion
    vec3 color = getBackground(distortedUv);
    
    // Optionally add a slight white highlight where fluid is fastest
    float speed = length(fluid.rg);
    color += speed * 0.2;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function createProgram(gl: WebGLRenderingContext, vertexSource: string, fragmentSource: string) {
  const program = gl.createProgram();
  const vs = createShader(gl, gl.VERTEX_SHADER, vertexSource);
  const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  if (!program || !vs || !fs) return null;
  
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    return null;
  }
  return program;
}

function createFBO(gl: WebGLRenderingContext, w: number, h: number) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const fb = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  
  return { texture, fb };
}

export default function ShaderCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const config = useRef({
    brushSize: 0.15,
    distortionStrength: 0.25,
    trailDecay: 0.98,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false });
    if (!gl) return;

    // Config uniform locations
    let simProgram = createProgram(gl, VERTEX_SHADER, SIM_SHADER)!;
    let displayProgram = createProgram(gl, VERTEX_SHADER, DISPLAY_SHADER)!;

    // Full screen quad
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1,
      -1, 1, 1, -1, 1, 1,
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Setup FBOs for Ping-Pong
    let simRes = { w: 512, h: 256 }; // Scaled down for perf
    let readFBO = createFBO(gl, simRes.w, simRes.h);
    let writeFBO = createFBO(gl, simRes.w, simRes.h);

    const mouse = { x: 0.5, y: 0.5, vx: 0, vy: 0 };
    let lastMouse = { x: 0.5, y: 0.5 };
    let rafId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouse.vx = (x - lastMouse.x) * 10;
      mouse.vy = (y - lastMouse.y) * 10;
      mouse.x = x;
      mouse.y = y;
      lastMouse = { x, y };
    };
    window.addEventListener("mousemove", handleMouseMove);

    const render = () => {
      // 1. Simulation Pass
      gl.useProgram(simProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, writeFBO.fb);
      gl.viewport(0, 0, simRes.w, simRes.h);
      
      const posLocSim = gl.getAttribLocation(simProgram, "position");
      gl.enableVertexAttribArray(posLocSim);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(posLocSim, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, readFBO.texture);
      gl.uniform1i(gl.getUniformLocation(simProgram, "tMap"), 0);
      
      gl.uniform2f(gl.getUniformLocation(simProgram, "uMouse"), mouse.x, mouse.y);
      gl.uniform2f(gl.getUniformLocation(simProgram, "uVelocity"), mouse.vx, mouse.vy);
      gl.uniform1f(gl.getUniformLocation(simProgram, "uDecay"), config.current.trailDecay);
      gl.uniform1f(gl.getUniformLocation(simProgram, "uBrushSize"), config.current.brushSize);
      gl.uniform2f(gl.getUniformLocation(simProgram, "uResolution"), simRes.w, simRes.h);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // Ping-pong swap
      const temp = readFBO;
      readFBO = writeFBO;
      writeFBO = temp;

      // Decay velocity slightly over frames
      mouse.vx *= 0.8;
      mouse.vy *= 0.8;

      // 2. Display Pass
      gl.useProgram(displayProgram);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null); // Draw to screen
      gl.viewport(0, 0, canvas.width, canvas.height);

      const posLocDisp = gl.getAttribLocation(displayProgram, "position");
      gl.enableVertexAttribArray(posLocDisp);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.vertexAttribPointer(posLocDisp, 2, gl.FLOAT, false, 0, 0);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, readFBO.texture);
      gl.uniform1i(gl.getUniformLocation(displayProgram, "tMap"), 0);
      gl.uniform1f(gl.getUniformLocation(displayProgram, "uDistortionStrength"), config.current.distortionStrength);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
      gl.deleteProgram(simProgram);
      gl.deleteProgram(displayProgram);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full block rounded-[inherit]" />;
}
