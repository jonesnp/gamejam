kontra.init()
kontra.initKeys()

const TILE_SIZE = 64

kontra.setImagePath('assets/imgs/')
kontra
  .load('spritesheet_tiles.png')
  .then(function () {
    let sprite_sheet = kontra.SpriteSheet({
      image: kontra.imageAssets.spritesheet_tiles,
      frameWidth: TILE_SIZE,
      frameHeight: TILE_SIZE,
      animations: { player: { frames: 11, frameRate: 1 } },
    })

    let player = kontra.Sprite({
      x: TILE_SIZE * 2 + 1,
      y: TILE_SIZE * 8 + 1,
      height: 62,
      width: 62,
      animations: sprite_sheet.animations,
    })
    let tile_engine = kontra.TileEngine({
      tilewidth: TILE_SIZE,
      tileheight: TILE_SIZE,
      width: 16,
      height: 16,
      tilesets: [{ firstgid: 1, image: kontra.imageAssets.spritesheet_tiles }],
      layers: [
        { name: 'water', data: Array(256).fill(1) },
        {
          name: 'land',
          data: [
            Array(16 * 2).fill(0),
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            [0, 0, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 0, 0],
            Array(16 * 2).fill(0),
          ].flat(),
        },
      ],
    })

    tile_engine.add(player)

    kontra.onKey('w', function (e) {
      player.y -= 64
      !tile_engine.layerCollidesWith('land', player) && (player.y += 64)
    })
    kontra.onKey('s', function (e) {
      player.y += 64
      !tile_engine.layerCollidesWith('land', player) && (player.y -= 64)
    })
    kontra.onKey('a', function (e) {
      player.x -= 64
      !tile_engine.layerCollidesWith('land', player) && (player.x += 64)
    })
    kontra.onKey('d', function (e) {
      player.x += 64
      !tile_engine.layerCollidesWith('land', player) && (player.x -= 64)
    })

    kontra
      .GameLoop({
        update: function () {},
        render: function () {
          tile_engine.render()
        },
      })
      .start()
  })
  .catch(function (e) {
    console.log(e)
  })
