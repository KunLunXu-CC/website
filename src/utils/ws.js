export default pathname => new WebSocket(
  `${WS_SERVICER}${pathname}`,
  localStorage.getItem('authorization')
);
