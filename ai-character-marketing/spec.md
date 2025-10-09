### What to do tomorrow by yosan? (7 oct 2025)

1. meeting together in office and spread the part among us
2. scenario making or concept making to different people.. like input data, summary of the request.
3. use web tools to make the scenario and concept, character personality, storym, etc. (work flow part)
4. generating multiple image... and done simultaneously...
5. not creating or conclutize the design... imagine yosan is a client.. this time, yosan want us to think the solution...
6. "think the how we can solve the problem of generating images... (consistency, quality, multiple images, etc.)"
7. if want permanent right (commercial use, copyright, royalty, etc.) - svg, pay good money.. we have hundred thousands of images...
8. ai cms part... what is the use case?
9. secretagencyhuca into add all ai cms, public page, etc.
10. we gonna use huca to generate secret agent huca...
11. gonna use multiple ai like sora, openai, etc.

### What to do tomorrow by yosan? (8 oct 2025)

CLI task (AI Character Generator):

- gateway -> api gateway, before the application (no need to care for now) contain from cloudflare workers
- data -> no need to care for now
- cli -> extract data from data original.
- backend -> real application backend. no need to care for now
- cli and domain (need to care for now)
- cli -> src directory, have one index.ts file (it just the entry point) -> the configuration, defining the ...
- domain -> minietl. have modurable...
- minietl -> most important part.
- what kind of argument should we have? maybe character generator module in domain directory. maybe character generator expose generate function.
- what todo is: we defining the signature of the function. and type of argument... and discuss about the interface.
- vercel ai sdk maybe in vendor directory. openai in domain directory. (cancelled)
- ai sdk is image generation directory. (CharacterGeneration -> but not this case for HUCA project, maybe camelCase)

Example structure:

```
- src/domain
    - imageGenerator --> maybe this my task...
        - vendor
            - ai sdk image generation actual code
    - CharacterGeneratorCLI (main module)
        - entity
        - usecase
    - CharacterGeneratorWEB (main module)
```

#### Yosan's task

```
* Domain centric, modulable, composable, and parameter injectable design
    * Will reuse those domain components for our First-15-sec implementation
    * 3rd party library should be in vendor
    * Exec you code via unit test, but not for regressional tests nor coverage
    * Follow the architecture of coop-cs-net CLI
* Design function signature first
    * CLI arg, usecase arg
* Width/Height ratio should fit for Instagram
* Define good ubiquitous language
    * Do we (including user) call it "Character" or "Mascot"?
    * Describe by 1 Word as much as you can
    * e.g. Spread: In this project, "Spread" refers to the visual deployment or application examples of character images across various scenes.
* CLI should be what I can exec on my laptop with --output arg, no persistency required, nor no direct post to SNS is required for now
    * Just exporting images and text file (markdown or json/yaml) is fine, text file should contain character's name, story, design decision process...etc
* Interactive CLI console is not required, but I guess "Master Image" generation and "Spread Images" generation are better separated by CLI subcommands
    * Don't focus CLI dir, it's just parameter injection layer, write more in domain
* The main component (like "MiniETL" in coop-cs-net) should be owned by a person who can commit longer time, and sub components should be recent client-work assignees
* Not like phase 1, every components should be always ready to merge into main
* Don't try Agentic Loop now, just a workflow is fine, and don't rely on such libraries like LangGraph, Mastra, except 1st party libraries and Vercel's AI SDK
* Don't create huge PR like we did when phase 1, we go gradually, small CLI just invoke OpenAI image API is definitely our first step
* Back to the official manner of our development, GitHub Board, First Issue writing, Second PR writing, Self Review Process, I will check every decision records there
* Is this short enough?
```

# Wednesday, 8 oct 2025

- size of padding, position of the character-- full size design, mroe flexible -- less restriction, image style
- spread images -> same (image style) same style but the character is different.. (so tomorrow task)
- search: japanese card bikkuri card

library to build cli app
(gui kinda cli)

```
inquirer
chalk
ora
```

- no need gui.. but yaml.. use llm to generate detailed yaml. magic script we can create productive and all.. (specification of llm program, use yaml to execute the process)

- modurality in coop-csnet

using

- yosan want to inject something from outside the openai... like upfile, not crawlee

- basic default stream?? to use openai image generation..
- how many images ai check when generating image (example if we provide many image)
