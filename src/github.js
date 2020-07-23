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
          return repoNode.download_url
        default:
          break
      }
    }),
  )

  return fileURLs.flat()
}

export const fetchRepoContentsRecursive = async (user, repo) => {
  const repoFileURLs = await fetchRepoFileURLsRecursive(user, repo)
  const repoFilesRes = await Promise.all(repoFileURLs.map(url => fetch(url)))
  const repoFilesText = await Promise.all(repoFilesRes.map(res => res.text()))

  return repoFilesText
}
