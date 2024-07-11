export function convertLatLngToPos(pos, radius) {
  // 지구의 radius 지금 1.3으로 되어있으니까 그 값만큼 곱해줘야 제대로 된 값이 나온다.
  const x = Math.cos(pos.lat) * Math.sin(pos.lng) * radius;
  const y = Math.sin(pos.lat) * radius;
  const z = Math.cos(pos.lat) * Math.cos(pos.lng) * radius;

  return { x, y, z };
}
