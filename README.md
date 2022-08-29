# Get Last YoutTube Links from Channel action

This action get the X last links of YouTube channel

## Inputs

## `channel-id`

**Required** ID of channel.

## `limit`

Number of links. Default 5

## Outputs

## `list`

The list of links :

```javascript
 [
  {
    title: "....",
    link: '...'
  }
 ]
```

## Example usage

```
uses: actions/youtube-action@v1.1
with:
  channel-id: 'My channel id'
```