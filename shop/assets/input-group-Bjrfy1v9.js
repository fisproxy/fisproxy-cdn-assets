import{B as e,F as t,t as n}from"./jsx-runtime-DxPzWbBr.js";import{a as r,i,y as a}from"./dist--i4x7j8T.js";import{t as o}from"./input-BBIPyWfW.js";import"./textarea-BaxsaPjt.js";var s=e(t(),1),c=n(),l=`/npm/@cap.js/wasm@0.0.7/browser/cap_wasm_bg.wasm`,u=`/npm/pako@2.1.0/dist/pako_inflate.min.js`,d=`0.1.56`,f=`sha384-3XYrD0wPJOSDE3gyujsOnx3hLyGU764cN7C6sfwVd8aL7UP4xNhPooe35mFK8wFP`;function p(e){window.CAP_CUSTOM_WASM_URL=`${e}${l}`,window.CAP_PAKO_URL=`${e}${u}`}function m(e,t){let{promise:n,resolve:r,reject:i}=Promise.withResolvers(),a=document.createElement(`script`);return a.src=e,a.integrity=t,a.crossOrigin=`anonymous`,a.async=!0,a.onload=()=>r(),a.onerror=()=>i(Error(`failed to load ${e}`)),document.head.append(a),n}var h=null,g=[`https://cdn.jsdmirror.com`,`https://jsd.onmicrosoft.cn`];function _(){return h??=g.reduce((e,t)=>e.catch(()=>m(`${t}/npm/@cap.js/widget@${d}/cap.min.js`,f).then(()=>p(t))),Promise.reject(Error(`no mirrors configured`))),h}function v(e){return e&&(e.getValue?.()||e.tokenValue||e.token)||``}var y=(0,s.forwardRef)(function({className:e,enabled:t=!0,onError:n,onReset:i,onSolve:a,resetKey:o},l){let u=(0,s.useRef)(null),[d,f]=(0,s.useState)(!1),p=(0,s.useEffectEvent)(e=>{let t=e.detail?.token||v(u.current);t&&a(t)}),m=(0,s.useEffectEvent)(()=>{i?.()}),h=(0,s.useEffectEvent)((e,t)=>{let r=e?.detail?.message||t||`安全验证失败，请重试。`;i?.(),n?.(r)});return(0,s.useImperativeHandle)(l,()=>({getValue:()=>v(u.current),reset:()=>u.current?.reset?.()}),[]),(0,s.useEffect)(()=>{if(!t)return;let e=!1,n=u.current;if(!n)return;let r=e=>p(e),i=()=>m(),a=e=>h(e);return(async()=>{try{if(window.customElements.get(`cap-widget`)||await _(),e)return;n.addEventListener(`solve`,r),n.addEventListener(`reset`,i),n.addEventListener(`error`,a)}catch{e||(f(!0),h(void 0,`安全验证加载失败，请刷新页面后重试。`))}})(),()=>{e=!0,n.removeEventListener(`solve`,r),n.removeEventListener(`reset`,i),n.removeEventListener(`error`,a)}},[t]),(0,s.useEffect)(()=>{t&&o!==void 0&&u.current?.reset?.()},[t,o]),t?(0,c.jsx)(`div`,{className:r(`flex min-w-0 flex-col gap-2`,e),children:d?(0,c.jsx)(`p`,{className:`text-sm text-destructive`,role:`alert`,children:`安全验证加载失败，请刷新页面后重试。`}):(0,c.jsx)(`cap-widget`,{ref:u,className:`max-w-full`,"data-cap-api-endpoint":`/api/cap/`,"data-cap-worker-count":`8`,"data-cap-i18n-initial-state":`我是人类`,"data-cap-i18n-solved-label":`验证完成`,"data-cap-i18n-verifying-label":`验证中...`,"data-cap-i18n-error-label":`验证失败，请重试`,"data-cap-i18n-wasm-disabled":`请启用 WASM 以获得更快验证`,"data-cap-i18n-required-label":`请先完成安全验证`})}):null}),b=`#version 300 es
in vec2 position;
void main() {
	gl_Position = vec4(position, 0.0, 1.0);
}
`,x=`#version 300 es
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform float progress;
uniform float intensity;
uniform float seed;
uniform vec3 ink;

out vec4 outputColor;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float bayer4(vec2 c) {
	ivec2 p = ivec2(mod(c, 4.0));
	int m[16] = int[16](0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5);
	return (float(m[p.y * 4 + p.x]) + 0.5) / 16.0;
}

void emit(float alpha) {
	float a = clamp(alpha, 0.0, 1.0) * intensity;
	outputColor = vec4(ink * a, a);
}
`,S={dither:`${x}
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t * t * t * (t * (t * 6.0 - 15.0) + 10.0); }

float cnoise(vec2 p) {
	vec4 pi = floor(p.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
	vec4 pf = fract(p.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
	pi = mod289(pi);
	vec4 ix = pi.xzxz;
	vec4 iy = pi.yyww;
	vec4 fx = pf.xzxz;
	vec4 fy = pf.yyww;
	vec4 i = permute(permute(ix) + iy);
	vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0;
	vec4 gy = abs(gx) - 0.5;
	vec4 tx = floor(gx + 0.5);
	gx = gx - tx;
	vec2 g00 = vec2(gx.x, gy.x);
	vec2 g10 = vec2(gx.y, gy.y);
	vec2 g01 = vec2(gx.z, gy.z);
	vec2 g11 = vec2(gx.w, gy.w);
	vec4 norm = taylorInvSqrt(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));
	g00 *= norm.x;
	g01 *= norm.y;
	g10 *= norm.z;
	g11 *= norm.w;
	float n00 = dot(g00, vec2(fx.x, fy.x));
	float n10 = dot(g10, vec2(fx.y, fy.y));
	float n01 = dot(g01, vec2(fx.z, fy.z));
	float n11 = dot(g11, vec2(fx.w, fy.w));
	vec2 fadeXY = fade(pf.xy);
	vec2 nx = mix(vec2(n00, n01), vec2(n10, n11), fadeXY.x);
	return 2.3 * mix(nx.x, nx.y, fadeXY.y);
}

float fbm(vec2 p) {
	float value = 0.0;
	float amplitude = 1.0;
	for (int i = 0; i < 4; i++) {
		value += amplitude * abs(cnoise(p));
		p *= 3.0;
		amplitude *= 0.3;
	}
	return value;
}

float bayer8(vec2 coord) {
	ivec2 p = ivec2(mod(coord, 8.0));
	float m[64] = float[64](
		0.0, 48.0, 12.0, 60.0, 3.0, 51.0, 15.0, 63.0,
		32.0, 16.0, 44.0, 28.0, 35.0, 19.0, 47.0, 31.0,
		8.0, 56.0, 4.0, 52.0, 11.0, 59.0, 7.0, 55.0,
		40.0, 24.0, 36.0, 20.0, 43.0, 27.0, 39.0, 23.0,
		2.0, 50.0, 14.0, 62.0, 1.0, 49.0, 13.0, 61.0,
		34.0, 18.0, 46.0, 30.0, 33.0, 17.0, 45.0, 29.0,
		10.0, 58.0, 6.0, 54.0, 9.0, 57.0, 5.0, 53.0,
		42.0, 26.0, 38.0, 22.0, 41.0, 25.0, 37.0, 21.0
	);
	return m[p.y * 8 + p.x] / 64.0;
}

void main() {
	vec2 cell = floor(gl_FragCoord.xy);
	vec2 p = (cell + 0.5) / resolution - 0.5;
	p.x *= resolution.x / resolution.y;
	float noiseValue = fbm(p + fbm(p - time * 0.05));
	float density = clamp(noiseValue * 0.74 - 0.13, 0.0, 1.0);
	emit(step(bayer8(cell), density));
}
`,scan:`${x}
void main() {
	vec2 cell = floor(gl_FragCoord.xy);
	vec2 uv = (cell + 0.5) / resolution;
	float twinkle = hash(cell + seed + floor(time * 10.0));
	float track = 0.1 * step(0.5, fract((cell.x + cell.y) * 0.5));
	float edge = progress >= 0.0 ? progress : fract(time * 0.42 + seed * 0.13) * 1.3 - 0.15;
	float d = edge - uv.x;
	float filled = progress >= 0.0 ? step(0.0, d) * (0.34 + 0.3 * step(bayer4(cell), 0.5)) : 0.0;
	float width = progress >= 0.0 ? 0.035 : 0.12;
	float band = exp(-abs(d) / width) * (0.55 + 0.45 * twinkle);
	emit(track + filled + band * step(bayer4(cell), band + 0.15));
}
`,rain:`${x}
void main() {
	vec2 cell = floor(gl_FragCoord.xy);
	float column = cell.x + seed * 17.0;
	float columnMask = step(0.42, hash(vec2(column, 3.0)));
	float speed = mix(0.35, 1.1, hash(vec2(column, 11.0)));
	float head = 1.0 - fract(time * speed * 0.32 + hash(vec2(column, 5.0)));
	float y = (cell.y + 0.5) / resolution.y;
	float above = y - head;
	float trail = above > 0.0 ? exp(-above * 7.0) : 0.0;
	float lead = 1.0 - smoothstep(0.0, 1.5 / resolution.y, abs(above));
	float value = max(trail * 0.8, lead);
	emit(columnMask * step(bayer4(cell), value) * (0.55 + 0.45 * value));
}
`,sparkle:`${x}
void main() {
	vec2 cell = floor(gl_FragCoord.xy);
	vec2 uv = (cell + 0.5) / resolution;
	float h = hash(cell + seed);
	float h2 = hash(cell.yx + seed * 3.0);
	float phase = time * (0.6 + h * 1.4) + h2 * 6.2831;
	float twinkle = pow(max(0.0, sin(phase)), 6.0);
	float present = step(0.9, h);
	float falloff = smoothstep(0.0, 0.25, min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y)));
	emit(present * twinkle * (0.35 + 0.65 * falloff) + 0.06 * step(0.985, h2));
}
`},C={ink:`--pixel-ink`,foreground:`--foreground`,muted:`--muted-foreground`,success:`--success`,warning:`--warning`,destructive:`--destructive`},w=1e3/30,T=2048,E=2.4,D=class{glCanvas=document.createElement(`canvas`);probe=document.createElement(`canvas`).getContext(`2d`,{willReadFrequently:!0});gl=null;unavailable=!1;programs=new Map;targets=new Map;startedAt=performance.now();motionQuery=window.matchMedia(`(prefers-reduced-motion: reduce)`);frameId=0;lastFrameAt=0;resizeObserver=new ResizeObserver(e=>{for(let t of e){let e=this.targets.get(t.target);e&&(this.measure(e),this.draw(e,performance.now()))}this.schedule()});intersectionObserver=new IntersectionObserver(e=>{for(let t of e){let e=this.targets.get(t.target);e&&(e.visible=t.isIntersecting,e.visible&&this.draw(e,performance.now()))}this.schedule()},{rootMargin:`64px`});themeObserver=new MutationObserver(()=>{let e=performance.now();for(let t of this.targets.values())this.resolveInk(t),this.draw(t,e)});constructor(){this.glCanvas.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),this.cancelFrame(),this.programs.clear(),this.gl=null}),this.glCanvas.addEventListener(`webglcontextrestored`,()=>this.redrawAll()),this.motionQuery.addEventListener(`change`,()=>this.redrawAll()),document.addEventListener(`visibilitychange`,()=>{document.hidden?this.cancelFrame():this.redrawAll()}),this.themeObserver.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`,`style`,`data-theme`]})}attach(e){let t=e.getContext(`2d`);if(!t)return null;let n={canvas:e,context:t,settings:null,width:0,height:0,ink:[0,0,0],seed:Math.random()*100,visible:!0,shownProgress:-1};return this.targets.set(e,n),this.resizeObserver.observe(e),this.intersectionObserver.observe(e),{update:e=>{let t=n.settings;n.settings=e,t?.tone!==e.tone&&this.resolveInk(n),t?.cell!==e.cell&&this.measure(n),(e.progress<0||n.shownProgress<0||this.motionQuery.matches)&&(n.shownProgress=e.progress),this.draw(n,performance.now()),this.schedule()},detach:()=>{this.targets.delete(e),this.resizeObserver.unobserve(e),this.intersectionObserver.unobserve(e),delete e.dataset.ready}}}redrawAll(){let e=performance.now();for(let t of this.targets.values())this.draw(t,e);this.schedule()}schedule(){if(!(this.frameId||this.motionQuery.matches||document.hidden)){for(let e of this.targets.values())if(e.visible&&e.settings){this.frameId=requestAnimationFrame(this.tick);return}}}cancelFrame(){this.frameId&&cancelAnimationFrame(this.frameId),this.frameId=0}tick=e=>{this.frameId=0;let t=e-this.lastFrameAt;if(t>=w){for(let n of this.targets.values())n.visible&&(this.ease(n,t),this.draw(n,e));this.lastFrameAt=e}this.schedule()};ease(e,t){let n=e.settings?.progress??-1;if(n<0||e.shownProgress<0){e.shownProgress=n;return}let r=1-Math.exp(-Math.min(t,100)/120);e.shownProgress+=(n-e.shownProgress)*r}measure(e){let t=Math.max(1,e.settings?.cell??4),n=Math.min(T,Math.ceil(e.canvas.clientWidth/t)),r=Math.min(T,Math.ceil(e.canvas.clientHeight/t));e.width=n,e.height=r,e.canvas.width!==n&&(e.canvas.width=n),e.canvas.height!==r&&(e.canvas.height=r)}resolveInk(e){let t=C[e.settings?.tone??`ink`],n=getComputedStyle(e.canvas).getPropertyValue(t).trim();if(!this.probe||!n)return;this.probe.clearRect(0,0,1,1),this.probe.fillStyle=`#000`,this.probe.fillStyle=n,this.probe.fillRect(0,0,1,1);let[r,i,a]=this.probe.getImageData(0,0,1,1).data;e.ink=[r/255,i/255,a/255]}context(){if(this.gl&&!this.gl.isContextLost())return this.gl;if(this.unavailable)return null;let e=this.glCanvas.getContext(`webgl2`,{alpha:!0,premultipliedAlpha:!0,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1,powerPreference:`low-power`});if(!e)return this.unavailable=!0,null;let t=e.createBuffer(),n=e.createVertexArray();return e.bindVertexArray(n),e.bindBuffer(e.ARRAY_BUFFER,t),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(0),e.vertexAttribPointer(0,2,e.FLOAT,!1,0,0),e.disable(e.BLEND),e.disable(e.DEPTH_TEST),this.gl=e,e}compile(e,t){if(this.programs.has(t))return this.programs.get(t)??null;let n=(t,n)=>{let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(e.deleteShader(r),null)):null},r=n(e.VERTEX_SHADER,b),i=n(e.FRAGMENT_SHADER,S[t]),a=r&&i?e.createProgram():null,o=null;return a&&r&&i&&(e.attachShader(a,r),e.attachShader(a,i),e.bindAttribLocation(a,0,`position`),e.linkProgram(a),e.getProgramParameter(a,e.LINK_STATUS)?o={program:a,resolution:e.getUniformLocation(a,`resolution`),time:e.getUniformLocation(a,`time`),progress:e.getUniformLocation(a,`progress`),intensity:e.getUniformLocation(a,`intensity`),seed:e.getUniformLocation(a,`seed`),ink:e.getUniformLocation(a,`ink`)}:e.deleteProgram(a)),r&&e.deleteShader(r),i&&e.deleteShader(i),this.programs.set(t,o),o}draw(e,t){let n=e.settings;if(!n||e.width<1||e.height<1)return;let r=this.context();if(!r)return;let i=this.compile(r,n.program);if(!i)return;this.glCanvas.width<e.width&&(this.glCanvas.width=e.width),this.glCanvas.height<e.height&&(this.glCanvas.height=e.height);let a=this.motionQuery.matches?E:(t-this.startedAt)/1e3*n.speed;r.useProgram(i.program),r.viewport(0,0,e.width,e.height),r.uniform2f(i.resolution,e.width,e.height),r.uniform1f(i.time,a),r.uniform1f(i.progress,e.shownProgress),r.uniform1f(i.intensity,n.intensity),r.uniform1f(i.seed,e.seed),r.uniform3f(i.ink,e.ink[0],e.ink[1],e.ink[2]),r.drawArrays(r.TRIANGLE_STRIP,0,4),e.context.clearRect(0,0,e.width,e.height),e.context.drawImage(this.glCanvas,0,this.glCanvas.height-e.height,e.width,e.height,0,0,e.width,e.height),e.canvas.dataset.ready=`true`}},O;function k(){return O??=new D,O}function A({program:e=`sparkle`,cell:t=4,tone:n=`ink`,intensity:i=.5,speed:a=1,progress:o,className:l}){let u=(0,s.useRef)(null),d=(0,s.useRef)(null);return(0,s.useEffect)(()=>{let e=u.current;if(!e)return;let t=k().attach(e);return d.current=t,()=>{t?.detach(),d.current=null}},[]),(0,s.useEffect)(()=>{d.current?.update({program:e,cell:t,tone:n,intensity:i,speed:a,progress:o??-1})},[e,t,n,i,a,o]),(0,c.jsx)(`canvas`,{ref:u,"aria-hidden":!0,"data-slot":`pixel-shader`,className:r(`peer pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-500 [image-rendering:pixelated] data-[ready=true]:opacity-100 motion-reduce:transition-none`,l)})}function j({value:e,label:t,tone:n=`ink`,className:i}){let a=typeof e==`number`&&Number.isFinite(e)?Math.min(100,Math.max(0,e)):void 0;return(0,c.jsxs)(`div`,{role:`progressbar`,"aria-label":t,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":a,"data-slot":`pixel-progress`,className:r(`relative h-3 w-full overflow-hidden rounded-sm bg-muted`,i),children:[(0,c.jsx)(A,{program:`scan`,cell:3,tone:n,intensity:.9,progress:a===void 0?void 0:a/100}),(0,c.jsx)(`div`,{"aria-hidden":!0,className:r(`absolute inset-y-0 left-0 bg-brand/60 peer-data-[ready=true]:hidden`,a===void 0&&`w-1/3 animate-pulse`),style:a===void 0?void 0:{width:`${a}%`}})]})}function M({className:e,...t}){return(0,c.jsx)(`div`,{"data-slot":`input-group`,role:`group`,className:r(`group/input-group relative flex h-8 w-full min-w-0 items-center rounded-lg border border-input transition-colors outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-disabled:bg-input/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:bg-input/30 dark:has-disabled:bg-input/80 dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5`,e),...t})}var N=a(`flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg:not([class*='size-'])]:size-4`,{variants:{align:{"inline-start":`order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]`,"inline-end":`order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]`,"block-start":`order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2`,"block-end":`order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2`}},defaultVariants:{align:`inline-start`}});function P({className:e,align:t=`inline-start`,...n}){return(0,c.jsx)(`div`,{role:`group`,"data-slot":`input-group-addon`,"data-align":t,className:r(N({align:t}),e),onClick:e=>{e.target.closest(`button`)||e.currentTarget.parentElement?.querySelector(`input`)?.focus()},...n})}var F=a(`flex items-center gap-2 text-sm shadow-none`,{variants:{size:{xs:`h-6 gap-1 rounded-[calc(var(--radius)-3px)] px-1.5 [&>svg:not([class*='size-'])]:size-3.5`,sm:``,"icon-xs":`size-6 rounded-[calc(var(--radius)-3px)] p-0 has-[>svg]:p-0`,"icon-sm":`size-8 p-0 has-[>svg]:p-0`}},defaultVariants:{size:`xs`}});function I({className:e,type:t=`button`,variant:n=`ghost`,size:a=`xs`,...o}){return(0,c.jsx)(i,{type:t,"data-size":a,variant:n,className:r(F({size:a}),e),...o})}function L({className:e,...t}){return(0,c.jsx)(o,{"data-slot":`input-group-control`,className:r(`flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0 dark:bg-transparent dark:disabled:bg-transparent`,e),...t})}export{j as a,L as i,P as n,A as o,I as r,y as s,M as t};