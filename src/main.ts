// tdd -> type driven development (got feedback from compiler - fast and semantically correct)

// Case1: Simple Character Request
//
// * simple prompt (text)
// * -> [planning task]
// * -> character description (text)
// * -> [generate main image]
// * -> main image (Array<Image>)
// * -> [generate spread image]
// * -> spread images (Array<Image>)

// Case2: Character Generation Request with Description <--- this
//
// * detailed prompt (text)
// * [generate main image]
// * -> main image (Array<Image>)
// * -> [generate spread image]
// * -> spread images (Array<Image>)

// * detailed prompt (text)
// * [analyze keywords + style] (user → gives detailed text → system extracts keywords + style)

// Case3: Providing Sample Images
//
// * sample images (Array<Image>)
// * -> [analyze sample images]
// * -> character description (text)
// * -> [generate main image]
// * -> main image (Array<Image>)
// * -> [generate spread image]
// * -> spread images (Array<Image>)

type Workflow = {
  prompt: string;
  images?: ReadonlyArray<Image>;
  steps: ReadonlyArray<Step>;
};

type PlanningTaskStep = "planningTask";
type AnalyzeSampleImages = "analyzeSampleImages";
type GenerateMainImage = "generateMainImage";
type GenerateSpreadImages = "generateSpreadImages";
type AnalyzeKeywords = "analyzeKeywords";

type StepType =
  | PlanningTaskStep
  | AnalyzeSampleImages
  | GenerateMainImage
  | GenerateSpreadImages
  | AnalyzeKeywords;

type Step =
  | { type: PlanningTaskStep }
  | { type: AnalyzeSampleImages }
  | { type: GenerateMainImage }
  | { type: GenerateSpreadImages }
  | { type: AnalyzeKeywords };

type StepInput =
  | { type: PlanningTaskStep; content: string }
  | { type: AnalyzeSampleImages; content: ReadonlyArray<Image> }
  | { type: GenerateMainImage; content: Description }
  | { type: GenerateSpreadImages; content: ReadonlyArray<Image> }
  | { type: AnalyzeKeywords; content: PromptDetail };

type Image = {
  base64: Base64;
};

type Base64 = string;

type CharacterGenerateResponse = {
  mainImages: ReadonlyArray<Image>;
  spreadImages: ReadonlyArray<Image>;
};

type PromptDetail = {
  keywords: string;
  style: string;
};

type WorkflowContext = {
  input: StepInput;
  details?: PromptDetail;
};

const firstStep = (workflow: Workflow): Step => workflow.steps[0];

// interface of our mcp tools
const generateCharacterMCP = (
  workflow: Workflow
): CharacterGenerateResponse => {
  const input: StepInput = (() => {
    const first = firstStep(workflow);

    if (first.type === "planningTask") {
      return { type: "planningTask", content: workflow.prompt };
    }
    if (first.type === "analyzeSampleImages") {
      // array of images
      if (!Array.isArray(workflow.prompt)) {
        throw new Error("expected array of images for sample analysis");
      }
      return { type: "analyzeSampleImages", content: workflow.images || [] };
    }
    if (first.type === "generateMainImage") {
      return { type: "generateMainImage", content: workflow.prompt };
    }
    if (first.type === "generateSpreadImages") {
      return { type: "generateSpreadImages", content: workflow.images || [] };
    }

    throw new Error("unexpectedly reached the end of step processing");
  })();

  const detailInput: PromptDetail = (() => {
    const first = firstStep(workflow);

    if (first.type === "analyzeKeywords") {
      return { keywords: workflow.prompt, style: workflow.prompt }; // TODO??
    }

    throw new Error("unexpectedly reached the end of detail processing");
  })();

  const initialCtx: WorkflowContext = {
    input,
    details: detailInput,
  };

  // reduce: iterative function (higher order function)
  const result = workflow.steps.reduce((currentCtx, step): WorkflowContext => {
    if (step.type === "analyzeKeywords") {
      return {
        input: {
          type: "analyzeKeywords" as const,
          content: analyzeKeywords(currentCtx.details?.keywords || ""),
        },
      };
    }
    if (
      step.type === "planningTask" &&
      currentCtx.input.type === "planningTask"
    ) {
      return {
        input: {
          type: "generateMainImage" as const,
          content: plan(currentCtx.input.content),
        },
      };
    }
    if (
      step.type === "analyzeSampleImages" &&
      currentCtx.input.type === "analyzeSampleImages"
    ) {
      return {
        input: {
          type: "generateMainImage" as const,
          content: analyzeSampleImages(currentCtx.input.content),
        },
      };
    }
    if (
      step.type === "generateMainImage" &&
      currentCtx.input.type === "generateMainImage"
    ) {
      return {
        input: {
          type: "generateSpreadImages" as const,
          content: generateMainImage(currentCtx.input.content),
        },
      };
    }
    if (
      step.type === "generateSpreadImages" &&
      currentCtx.input.type === "generateSpreadImages"
    ) {
      return {
        input: {
          type: "generateSpreadImages" as const,
          content: generateSpreadImages(currentCtx.input.content),
        },
      };
    }

    throw new Error("unexpectedly reached the end of step processing");
  }, initialCtx);

  return {
    mainImages: [],
    spreadImages: [],
  };
};

// language primitive. cannot be domain primitive its takes time, need to refactor. use simple language primitive
type Description = string; // maybe can have limit length

const plan = (input: string): Description => {
  console.log("Step A: planning for", input);
  return input;
};

const analyzeKeywords = (input: string): PromptDetail => {
  console.log("Step E: analyzing keywords for", input);
  return {
    keywords: "extract keywords from input",
    style: "extract style from input",
  };
};

const analyzeSampleImages = (input: ReadonlyArray<Image>): Description => {
  console.log("Step B: analyzing images", input.length);
  return "Analyzed description";
};

const generateMainImage = (input: Description): ReadonlyArray<Image> => {
  console.log("Step C: generating main image for", input);
  return [{ base64: "base64string" }];
};

const generateSpreadImages = (
  input: ReadonlyArray<Image>
): ReadonlyArray<Image> => {
  console.log("Step D: generating spread images for", input.length);
  return [{ base64: "base64string" }];
};

// input from user
const exampleInput1: Workflow = {
  prompt:
    "A female elf warrior character with a sword and shield in a forest background studio ghibli style",
  steps: [
    {
      type: "planningTask",
    },
    {
      type: "analyzeKeywords",
    },
    {
      type: "generateMainImage",
    },
    { type: "generateSpreadImages" },
  ],
};

generateCharacterMCP(exampleInput1);
