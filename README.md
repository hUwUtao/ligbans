# ligbans

api that gives interface for litebans index (useful for ssr banlist tables).

generally inspired and blatantly copied:

- > [YoSoyVillaa/next-litebans](https://github.com/YoSoyVillaa/next-litebans)

honorable mention

- > [ThiccMC/ThiccBan](https://github.com/ThiccMC/ThiccBan)

## example

```ts
import connectLitebans from "ligbans";
const cons = connectLitebans(
  "mysql://username:password@127.0.0.1:3306/bantable"
);
let query = await cons.bans({ offset: 0, limit: 16 });
query == [
  {
    id: 727n,
    byName: "Console",
    reason: "§6[§eAnti-cheat Automatic Action§6] §cToo many combined movement violations.",
    time: 1727727727727n,
    origin: "QueueHub",
    expire: 2727-27-27T10:27:27.000Z,
    freedBy: "#expired",
    freedReason: null,
  },
  // ...
]
```
