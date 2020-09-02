/* eslint no-param-reassign: 0 */
/* eslint no-debugger: 0 */

export const setNodesInitialVisiblilty = (nodes) => nodes.map((node) => {
  let visible = false;
  if (node.level === 0) visible = true;
  return { ...node, visible };
});

export const getVisibleState = (nodes, index) => {
  const { to } = nodes[index];
  if (to) {
    const firstNode = nodes.find((node) => node.current === to[0]);
    return !(firstNode && firstNode.visible);
  }
  return null;
};

const dfsVisibility = (originalNodes, index) => {
  const visited = new Set();
  const nodes = [...originalNodes];
  const dfs = (currentNode, currentNodes, idx) => {
    if (index === -1 || !currentNode.to || visited.has(currentNode)) return currentNodes;
    const { to } = currentNodes[idx];
    if (!to) return currentNodes;
    for (let i = 0; i < to.length; i += 1) {
      const toIndx = currentNodes.findIndex((n) => n.current === to[i]);
      currentNodes[toIndx].visible = false;
      dfs(currentNodes[toIndx], currentNodes, toIndx);
      visited.add(currentNodes[toIndx]);
    }
    return nodes;
  };
  return dfs(nodes[index], nodes, index);
};

export const setNodesExpandVisibility = (nodes, index, node) => {
  const isVisible = getVisibleState(nodes, index);
  if (!isVisible) return dfsVisibility(nodes, index);
  // get current node and its children
  const children = node.to;
  return nodes
    .map((n) => {
      let { visible } = n;
      if (n.current === node.current || children.indexOf(n.current) > -1) visible = true;
      return { ...n, visible };
    });
};

export const getParentsNode = (nodes, index, nodeId) => {
  const { current } = nodes[index];
  if (current) {
    const { to } = nodes[index];
    if (!to) nodes[index].to = [];
    nodes[index].to.push(nodeId);
    return {
      current: nodes[index].current,
      from: nodes[index].from,
      to: nodes[index].to,
      documentId: nodes[index].documentId,
    };
  }
  return nodes[index];
};

export const generateNewNode = (nodes, node) => {
  // get last id num in sub category
  const prefix = node.current;
  const newNode = { from: node.current, to: null };
  const { to } = node;
  if (!to) return { ...newNode, current: `${prefix}_1` };
  return { ...newNode, current: `${prefix}_${to.length + 1}` };
};

export const getAllChildrenNodes = (nodes, index) => {
  const visited = new Set();
  const toDelete = [nodes[index].documentId];
  const dfs = (currentNode, currentNodes, idx) => {
    debugger;
    if (index === -1 || !currentNode.to || visited.has(currentNode)) return;
    const { to } = currentNodes[idx];
    if (!to) return;
    for (let i = 0; i < to.length; i += 1) {
      const toIndx = currentNodes.findIndex((n) => n.current === to[i]);
      toDelete.push(currentNodes[toIndx].documentId);
      dfs(currentNodes[toIndx], currentNodes, toIndx);
      visited.add(currentNodes[toIndx]);
    }
  };
  dfs(nodes[index], nodes, index);
  return toDelete;
};

export default {
  getParentsNode,
  generateNewNode,
  getVisibleState,
  getAllChildrenNodes,
  setNodesExpandVisibility,
  setNodesInitialVisiblilty,
};
