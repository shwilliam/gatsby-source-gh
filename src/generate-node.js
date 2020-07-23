export const generateNode = (
  {actions, createNodeId, createContentDigest},
  file,
) => {
  const nodeId = createNodeId(`gatsby-source-gh-${file.path}`)
  const nodeContent = JSON.stringify(file)

  const nodeMeta = {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: 'GitHubFile',
      content: nodeContent,
      contentDigest: createContentDigest(file),
    },
  }

  actions.createNode({...file, ...nodeMeta})
}
