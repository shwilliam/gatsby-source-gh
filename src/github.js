import fetch from 'node-fetch'

const BLACKLISTED_DIRS = ['node_modules']

const fetchRepoFileURLsRecursive = async (user, repoName, path = '') => {
  const requestURL = `https://api.github.com/repos/${user}/${repoName}/contents/${path}`
  const repoResponse = await fetch(requestURL)
  const repoJSON = await repoResponse.json()

  const fileURLs = await Promise.all(
    repoJSON.map(async repoNode => {
      switch (repoNode.type) {
        case 'dir':
          if (BLACKLISTED_DIRS.includes(repoNode.name)) return
          return fetchRepoFileURLsRecursive(user, repoName, repoNode.path)
        case 'file':
          return repoNode
        default:
          break
      }
    }),
  )

  return fileURLs.flat()
}

export const fetchRepoContentsRecursive = async (user, repo) => {
  // let these throw, if anything fails we want to know about it
  const repoFiles = await fetchRepoFileURLsRecursive(user, repo)
  const repoFilesRes = await Promise.all(
    repoFiles.map(({download_url}) => fetch(download_url)),
  )
  const repoFilesText = await Promise.all(repoFilesRes.map(res => res.text()))

  return repoFilesText.map((content, idx) => ({
    ...repoFiles[idx],
    content,
  }))
}
