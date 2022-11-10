/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "startpage"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"YPWfg8Sl9D1u2nOa","label":"school","bookmarks":[{"id":"pA01qYQjBxhfPWXB","label":"classroom","url":"https://classroom.google.com/u/1/h"},{"id":"hbW8uoaZaIieJbhT","label":"MEL","url":"https://myenglishlab.pearson-intl.com/assignments/#!/allCourses/allStatuses"},{"id":"Bqp15pCR6oRlDhe4","label":"it","url":"https://911.itknyga.com.ua/course/view.php?id=6"}]},{"id":"OZ9WdU72VabgMgTn","label":"personal","bookmarks":[{"id":"H0POjxfD8UrrpV1r","label":"telegram","url":"https://web.telegram.org"},{"id":"U2p24p91GxHtl0vl","label":"github","url":"https://github.com/liquidgdiet"}]},{"id":"mlayfntBGVCCsKX4","label":"media","bookmarks":[{"id":"pv0pgPFXlX0R0Ehj","label":"youtube","url":"youtube.com"},{"id":"E7pI5m9wbKl1wKTg","label":"twitch","url":"twitch.com"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
