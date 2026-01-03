<!-- Change this title to match WinterTC55 conventions if merging upstream -->

# [@jcbhmr's](https://jcbhmr.com) CLI API polyfill

<table align=center><td>

```sh
node ./app.js "Alan Turing"
```

```js
const name = CLI.args[0] ?? "Ada Lovelace";
console.log("Hello %s!", name);

if (CLI.stdin.supports("tty") && CLI.stderr.supports("tty")) {
    const validColors = ["red", "green", "blue"];
    console.error("What's your favorite color? (one of %O)", validColors);
    let color: string;
    do {
        color = await readLine(CLI.stdin);
    } while (!validColors.includes(color));
    console.log("I like %c%s%c too!", `color: ${color}`, color, "");
}
```

</table>

## Installation

<!-- Change this package's name and publish under @wintertc55 or some other npm organization -->

```sh
npm install @jcbhmr/cli-api
```

You can use this npm package with Deno, Bun, or other Node.js-compatible JavaScript runtimes.

⚠️ This package **does not work in the browser**.

## Usage

TODO

## Development

This package aims to implement the proposed CLI API defined at TODO.
