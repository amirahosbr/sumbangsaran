1. why need ddd?

- to have same type safe in be and fe.
- also to control.. not to get 3rd party library?? - vendor lock in.
- need to do ddd not only just implement (backend) but also segregate the domain and vendor implementation.
- most use not used vendor... but use dependency injection to use vendor. (DI) https://en.wikipedia.org/wiki/Dependency_injection

- google dependency injection solution golang -> using Wire.

  - Google's primary solution for dependency injection in Golang is Wire.
  - Wire is a code generation tool that helps manage dependencies by automatically wiring together provider functions to create an "injector" function. This injector function then handles the creation and provision of dependencies within your application.
  - GO minimize the syntax or etc when compiling it to be quick...
  - ex; https://github.com/valyala/quicktemplate -> Fast, powerful, yet easy to use template engine for Go

- vendor used from usecase...
- language primitive (datem=, string, conjuctive etc, type.. union, )
- domain primitive type (user define type, developer define type... natural number type, number, ....)
- vendor function take domain primitive and language primitive and return domain primitive + language primitive.
- usecase is not 100% pure,,but at least..

## zod as a 3rd party library but have problem (why we need vendor)

zod problem is they don't export their function separately so they export bundle.
so people use valibot https://valibot.dev/guides/introduction/. valibot just export separately (like tree shaking: It refers to the process of dead code elimination, where unused or "dead" code is removed from the final bundled output of an application.)
technical debt: cost to maintain a system

- how to design the ddd is depends on the context.. sometimes start from domain entity (domain primitive), sometimes start from usecase.
