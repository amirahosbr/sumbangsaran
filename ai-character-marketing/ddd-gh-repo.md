Cool — I looked around; I couldn’t find an _exact_ ready-made repo that combines DDD + AI-generated DSL workflows in a CLI tool (yet!), but I did find some relevant projects for DSL / DDD and workflow engines that are good references. (And I can sketch how you’d adapt one of them.)

Then I’ll answer your second question: **whether the example I gave follows DDD + DSL** (spoiler: partially, with caveats).

---

## 🔍 Example projects / references

Here are a few repos / projects that relate to DSL, DDD, or workflow engines:

- **dsl-platform / 101-dsl-examples** — a repo with many DSL examples (showing how domain modeling and DSLs interplay) ([GitHub][1])
- **DomainWorkflows** — a .NET-based workflow engine that integrates domain layer and workflows (orchestration) ([GitHub][2])
- **ddd-by-examples / library** — a solid DDD example project, showing domain modeling, aggregates, value objects, etc. ([GitHub][3])
- **DDDSample (citerus / dddsample-core)** — classic Java / Spring sample for DDD concepts in a domain app ([GitHub][4])

You could adapt these as inspiration. For instance, combining the DDD structure in **ddd-by-examples** with a DSL/workflow layer like **DomainWorkflows** or custom YAML/JSON executor.

If you like, I can dig and find a _TypeScript-based_ repo that mixes DDD + AI-driven DSL workflows, and send you a link — would that be helpful?

---

## ✅ Does my example follow DDD + DSL?

Let’s analyze:

### What my example demonstrates:

- It separates **domain logic** (`functions.ts`) from **workflow orchestration** (`runner.ts` that parses YAML/JSON and dispatches to functions).
- It treats the workflow spec (YAML/JSON) as a **mini DSL**: a declarative language that says _which steps to run_.
- It uses code (TypeScript) to implement the actual behavior (summarize, translate, etc.).

Thus, it **embodies the DSL concept** (the workflow spec is the DSL).

### But: it’s _not a full DDD architecture_

To strictly adhere to DDD, you'd expect (among other things):

- **Domain entities / value objects / aggregates** rather than just standalone functions
- **Bounded contexts**, **repositories**, **domain services**, **application services**
- Richer modeling of state, invariants, relationships, domain invariants
- Separation between domain layer and infrastructure, with clear boundaries

My example is minimal and doesn’t have those full DDD abstractions. It's more of a toy “function + DSL” executor.

So:

- **It includes the DSL side** (the spec describing execution)
- **It includes domain logic side** (you write functions)
- **But it doesn’t fully model a domain in DDD style** (it lacks aggregations, invariants, domain events, etc.)

In other words: It’s a valid proof-of-concept combining _DSL + domain logic_, but to evolve it into full DDD, you’d need to extend the architecture.

---

If you like, I can build you or find a **TypeScript repo on GitHub** that more fully demonstrates **DDD + DSL + workflow orchestration** (closer to your real goal). Do you want me to search for that now?

[1]: https://github.com/dsl-platform/101-dsl-examples?utm_source=chatgpt.com "GitHub - dsl-platform/101-dsl-examples: 101 DSL examples"
[2]: https://github.com/valkush/DomainWorkflows?utm_source=chatgpt.com "GitHub - valkush/DomainWorkflows: DomainWorkflows is an innovative and ..."
[3]: https://github.com/ddd-by-examples/library?utm_source=chatgpt.com "GitHub - ddd-by-examples/library: A comprehensive Domain-Driven Design ..."
[4]: https://github.com/citerus/dddsample-core?utm_source=chatgpt.com "This is the new home of the original DDD Sample app ... - GitHub"
