# sekai-images

A small package for generating certain types of images seen in the Project Sekai game. Mainly for my own use in https://seka.ing

## Supported images
### Deck card
<img height="250" alt="image" src="https://github.com/user-attachments/assets/e125d4f7-188f-48a4-8a91-8260e42139d0" />

### Leader card
<img height="128" alt="image" src="https://github.com/user-attachments/assets/ccfe56f0-ee22-4578-b7d5-21c19e7c658c" />

### Event title/subtitle
<img width="380" height="80" alt="image" src="https://github.com/user-attachments/assets/4bda915a-f601-4346-9452-d4112800079d" />
<img width="180" height="80" alt="image" src="https://github.com/user-attachments/assets/6380716a-4990-4392-8827-5671128e2b04" />


## Installation

```bash
npm install aamiaa/sekai-images
```

## Example usage

```ts
import fs from "fs"
import { LeaderCardImage } from "sekai-images"

const memberImage = await fs.promises.readFile("card.png")
const image = await new LeaderCardImage({
    level: 60,
    masteryRank: 5,
    specialTrainingStatus: "done",
    cardRarityType: "rarity_4",
    attr: "mysterious",
    memberImage
}).create()

await fs.promises.writeFile("output.png", image)
```

## Note on assets
As the game has a lot of assets, only the base ones (i.e. the ones bundled with the app) are included in the package. Any on-demand assets, like card backgrounds, title backgrounds, etc. have to be passed manually as buffers.
