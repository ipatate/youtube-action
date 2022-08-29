const core = require('@actions/core')
const github = require('@actions/github')
const { toJson } = require('xml2json')
const request = require('request')

const youtubeUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id='

try {
  const channelID = core.getInput('channel-id')
  const limit = core.getInput('limit') || 5
  let list = []
  request(`${youtubeUrl}${channelID}`, (err, res, body) => {
    if (err) {
      return console.log(err)
    }
    const _body = JSON.parse(toJson(body))
    if (!_body.feed) {
      return console.log('No feed')
    }

    if (!_body.feed.entry) {
      return console.log('No entry')
    }

    list = _body.feed.entry.map((y) => ({
      title: y.title,
      link: y.link.href,
    }))

    const _list = list.slice(0, -limit)
    core.setOutput('list', _list)
  })

  const payload = JSON.stringify(github.context.payload, undefined, 2)
} catch (error) {
  core.setFailed(error.message)
}
