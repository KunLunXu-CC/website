export default pathname => {
  const ws = new WebSocket(`${WS_SERVICER}${pathname}`);
  return ws;
};
