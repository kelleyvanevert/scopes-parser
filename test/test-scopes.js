const fs = require("fs");

const { parser } = require("../dist/index");

describe("first", () => {
  it("should work", () => {
    const tree = parser.parse(
      `
        let adjective = "awesome";

        let obj = {
          let name = "Kelley";
          let sayHello = [to] {
            "hello";
          };
        };

        let fn1 = [name] !{ "Hello" };

        let fn2 = ![name] "Hello";

        // fn2 "Jim";

        let describe = [a;b] !{
          let concepts = [
            !{ let name = "objects"; let adjective = "boring" };
            { let name = "scopes" }
          ];
        }
      `,
      {
        strict: true
      }
    );
    let indent = " ";
    tree.iterate({
      enter(type, start, end) {
        console.log(indent, type.name, start, "->", end);
        indent += "  ";
      },
      leave(type, start, end) {
        indent = indent.slice(0, -2);
      }
    });
  });
});
