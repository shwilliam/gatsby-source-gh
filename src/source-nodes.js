import {fetchRepoContentsRecursive} from './github'
import {generateNode} from './generate-node'

export const sourceNodes = async (
  {actions, createNodeId, createContentDigest},
  configOptions,
) => {
  const {user, repo} = configOptions

  if (!user) throw new Error('No value for `user` found in `gatsby-config.js`')
  if (!repo) throw new Error('No value for `repo` found in `gatsby-config.js`')

  const repoFileContents = await fetchRepoContentsRecursive(user, repo)

  repoFileContents.map(content =>
    generateNode({actions, createNodeId, createContentDigest}, {content}),
  )

  console.log(
    `[gatsby-source-gh] Fetched ${repoFileContents.length} GitHub files`,
  )

  return
}
