import connectLitebans from "./src";
const cons = connectLitebans(
  //@ts-ignore
  import.meta.env.DATABASE_URL
);
const out = await cons.bans({ offset: 0, limit: 16 });
console.log(out);
