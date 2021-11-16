precision mediump float;
varying vec2 vTexCoord;

void main() {
    // this just draws the uv map (tex coords) to the geometry
    gl_FragColor = vec4(vTexCoord.x, vTexCoord.y, 0.0, 1.0);
}