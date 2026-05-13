import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Aurora mesh gradient shader — soft layered noise blobs in deep blue/indigo/cyan/violet.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uRes;

  // 2D simplex noise (Ashima)
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){
    const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));
    vec2 x0=v-i+dot(i,C.xx);
    vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;
    i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
    m=m*m;m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;
    vec3 h=abs(x)-0.5;
    vec3 ox=floor(x+0.5);
    vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;
    g.x=a0.x*x0.x+h.x*x0.y;
    g.yz=a0.yz*x12.xz+h.yz*x12.yw;
    return 130.0*dot(m,g);
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = uv - 0.5;
    p.x *= uRes.x / uRes.y;

    // mouse parallax
    vec2 m = (uMouse - 0.5) * 0.4;
    p += m * 0.15;

    float t = uTime * 0.06;
    float n1 = snoise(p * 1.4 + vec2(t, -t * 0.7));
    float n2 = snoise(p * 2.1 + vec2(-t * 0.8, t * 1.1) + 5.0);
    float n3 = snoise(p * 3.2 + vec2(t * 1.3, t * 0.5) + 12.0);

    // Light hero: soft white field + subtle green wisps (low contrast)
    vec3 cBase    = vec3(0.97, 0.98, 0.97);
    vec3 cMint    = vec3(0.82, 0.94, 0.88);
    vec3 cSage    = vec3(0.72, 0.88, 0.80);
    vec3 cDeep    = vec3(0.55, 0.78, 0.68);

    float a1 = smoothstep(-0.2, 1.0, n1);
    float a2 = smoothstep(-0.1, 0.9, n2);
    float a3 = smoothstep(0.0, 0.8, n3);

    vec3 col = cBase;
    col = mix(col, cMint, a1 * 0.28);
    col = mix(col, cSage, a2 * 0.18);
    col = mix(col, cDeep, a3 * 0.12);

    float v = smoothstep(1.15, 0.35, length(p));
    col = mix(col, vec3(0.99, 0.99, 0.99), 1.0 - v);

    float g = fract(sin(dot(uv * uRes, vec2(12.9898, 78.233))) * 43758.5453);
    col += (g - 0.5) * 0.008;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function AuroraPlane() {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes: { value: new THREE.Vector2(1, 1) },
    }),
    [],
  );

  useFrame(({ clock, size, pointer }) => {
    if (!mat.current) return;
    // pointer is -1..1
    mouse.current.x += ((pointer.x * 0.5 + 0.5) - mouse.current.x) * 0.04;
    mouse.current.y += ((pointer.y * 0.5 + 0.5) - mouse.current.y) * 0.04;
    mat.current.uniforms.uTime.value = clock.elapsedTime;
    mat.current.uniforms.uMouse.value.set(mouse.current.x, mouse.current.y);
    mat.current.uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function AuroraHero() {
  return (
    <div className="absolute inset-0 -z-10 min-h-[100svh] w-full overflow-hidden">
      <Canvas
        className="!block h-full min-h-[100svh] w-full touch-none"
        style={{ width: "100%", height: "100%", minHeight: "100svh" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <AuroraPlane />
      </Canvas>
      {/* Overlay: grid + vignette */}
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-60" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}
