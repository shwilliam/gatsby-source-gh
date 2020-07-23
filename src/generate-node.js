import {nanoid} from 'nanoid'

export const generateNode = (
  {actions, createNodeId, createContentDigest},
  {content},
) => {
  const nodeData = {content}
  const key = nanoid()
  const nodeId = createNodeId(`gatsby-source-gh-${key}`)
  const nodeContent = JSON.stringify(nodeData)

  const nodeMeta = {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: 'GitHubFile',
      content: nodeContent,
      contentDigest: createContentDigest(nodeData),
    },
  }

  actions.createNode({...nodeData, ...nodeMeta})
}
