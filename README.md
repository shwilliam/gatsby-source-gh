# `gatsby-source-gh`

> Gatsby source plugin for files in a GitHub repository

## Installation

### 1. Add this package as a dependency

`yarn add gatsby-source-gh`

`npm install --save gatsby-source-gh`

### 2. Configure the plugin in `gatsby-config.js`

```javascript
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-gh`,
      options: {
        repo: `<GITHUB_REPOSITORY>`,
        user: `<GITHUB_USERNAME>`,
      },
    },
  ],
}
```

### 3. Querying

All queried files will return a node with `content` containing the raw text
of the file and all of the data returned when
[querying for a file on GitHub's API](https://docs.github.com/en/rest/reference/repos#get-repository-content).

#### Example query

```
query GitHubQuery {
  allGitHubFile {
    edges {
      node {
        name
        path
        content
      }
    }
  }
}
```

#### Example response

```json
{
  "name": "hello.md",
  "path": "content/hello.md",
  "content": "Hello world",
  "sha": "3d21ec53a331a6f037a91c368710b99387d012c1",
  "type": "file",
  "size": 5362,
  "url": "https://api.github.com/repos/shwilliam/shwilliam/contents/hello.md",
  "git_url": "https://api.github.com/repos/shwilliam/shwilliam/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1",
  "html_url": "https://github.com/shwilliam/shwilliam/blob/master/hello.md",
  "download_url": "https://raw.githubusercontent.com/shwilliam/shwilliam/master/hello.md",
  "_links": {
    "git": "https://api.github.com/repos/shwilliam/shwilliam/git/blobs/3d21ec53a331a6f037a91c368710b99387d012c1",
    "self": "https://api.github.com/repos/shwilliam/shwilliam/contents/hello.md",
    "html": "https://github.com/shwilliam/shwilliam/blob/master/hello.md"
  }
}
```

## Contributing

This project is open to and encourages contributions! Feel free to discuss any
bug fixes/features in the [issues](https://github.com/shwilliam/gatsby-source-gh/issues).
If you wish to work on this project:

1. Fork [this project](https://github.com/shwilliam/gatsby-source-gh)
2. Create a branch (`git checkout -b new-branch`)
3. Commit your changes (`git commit -am 'add new feature'`)
4. Push to the branch (`git push origin new-branch`)
5. [Submit a pull request!](https://github.com/shwilliam/gatsby-source-gh/pull/new/master)
