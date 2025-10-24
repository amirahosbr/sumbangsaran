how these three components work together. Let me explain the architecture and workflow:

## How the AI Character Generator System Works

This is a **layered architecture** for AI-powered character image generation that consists of three main components working together:

### 1. **Configuration Layer** (`character.example.yml`)

This YAML file serves as the **input configuration** that defines:

- **Keywords**: Character traits (e.g., "fantasy warrior, medieval armor, heroic pose")
- **Description**: Detailed character description with multiline support
- **Style**: Art style from predefined options (doodle-art, anime, realistic, etc.)
- **Business Name**: Used for logo generation ("BeaverKnight")

### 2. **CLI Interface** (`CharacterGeneratorCLI.ts`)

This is the **user-facing command-line interface** that:

**Input Processing:**

- Reads and parses the YAML configuration file
- Validates required fields (style, businessName)
- Converts configuration into `GenerationParams`

**Workflow Orchestration:**

```typescript
// Sequential generation workflow:
1. genBaseCharacter(style, keywords, description)
2. User choice: continue or regenerate
3. genSecretAgent(baseCharacter.base64Image)
4. genLogo(baseCharacter.base64Image, businessName)
5. genSpread(baseCharacter.base64Image)
```

**User Experience:**

- Progress indicators with `ora` spinners
- Colored output with `chalk`
- Interactive prompts for regeneration
- File path outputs for generated images

### 3. **Repository Layer** (`ImageGenerationRepo.ts`)

This is the **OpenAI API abstraction layer** providing:

**Core Functions:**

- `generateImage()`: Creates initial images using OpenAI's image generation
- `editImage()`: Modifies existing images using OpenAI's responses API
- `writeFile()`: Saves base64 images to filesystem in `/tmp` directory

**Configuration Management:**

```typescript
DEFAULT_GENERATION_SETTINGS = {
  model: "gpt-image-1",
  size: "1024x1024",
  quality: "medium",
  output_format: "jpeg",
};
```

### 4. **Use Case Layer** (`GenerateCharacter.ts`)

This contains the **business logic** with specialized functions:

**Character Generation Functions:**

- `genBaseCharacter()`: Creates the initial character from style/keywords/description
- `genSecretAgent()`: Transforms character into secret agent (sunglasses + tuxedo)
- `genLogo()`: Creates business logo incorporating the character
- `genSpread()`: Generates 4-panel comic featuring the character

**Prompt Engineering:**
Each function has carefully crafted prompts with specific instructions, constraints, and validation steps.

## Complete Workflow Example

```bash
# 1. User runs CLI with config
npm run character-gen ./character.example.yml

# 2. CLI reads YAML config:
keywords: "fantasy warrior, medieval armor, heroic pose"
style: "doodle-art"
businessName: "BeaverKnight"

# 3. CLI calls usecase layer:
genBaseCharacter("doodle-art", ["fantasy warrior", "medieval armor"], description)

# 4. Usecase calls repository:
generateImage(prompt) -> OpenAI API -> base64 image

# 5. Repository saves file:
writeFile(base64, "base", "jpeg") -> /tmp/image-2024-10-14-base.jpeg

# 6. User chooses to continue, CLI generates variations:
genSecretAgent(base64Image) -> secret agent version
genLogo(base64Image, "BeaverKnight") -> business logo
genSpread(base64Image) -> 4-panel comic
```

## Key Architecture Benefits

1. **Separation of Concerns**: Configuration, UI, business logic, and API calls are cleanly separated
2. **Reusability**: Repository functions can be used by other parts of the system
3. **Testability**: Each layer can be tested independently
4. **Flexibility**: Easy to swap OpenAI for other providers by changing repository layer
5. **User Experience**: Interactive CLI with progress feedback and regeneration options

The system demonstrates clean architecture principles with the CLI orchestrating the workflow, the use case layer containing domain logic, and the repository layer handling external API interactions.

---

I'll analyze how these files work together to understand the image generation system. Let me examine the key files to understand the complete flow.

## How the AI Character Generation System Works

This is a sophisticated AI-powered character generation system that creates multiple variations of characters for business branding. Here's how the components work together:

### 1. **Configuration File (`character.example.yml`)**

This YAML file defines the input parameters for character generation:

- **Keywords**: Descriptive terms for the character (e.g., "fantasy warrior, medieval armor")
- **Description**: Detailed character description with visual elements
- **Style**: Art style from predefined options (digital-painting, anime, kawaii, etc.)
- **Business Name**: Used for logo generation

### 2. **CLI Interface (`CharacterGeneratorCLI.ts`)**

The command-line interface that orchestrates the entire process:

**Key Features:**

- **YAML Parser**: Custom parser that handles multiline descriptions and validates input
- **Style Validation**: Ensures the art style is from the approved list
- **Interactive Flow**: Prompts user to continue or regenerate at each step
- **Progress Indicators**: Uses `ora` spinner for visual feedback
- **Sequential Generation**: Creates 4 different image types in order

**Generation Sequence:**

1. **Base Character** → User can regenerate if not satisfied
2. **Secret Agent** → Character in tuxedo with sunglasses
3. **Logo** → Business logo incorporating the character
4. **Comic Spread** → 4-panel comic featuring the character

### 3. **Business Logic (`GenerateCharacter.ts`)**

Contains the core generation functions with specialized prompts:

**Functions:**

- `genBaseCharacter()`: Creates initial character using detailed prompt engineering
- `genSecretAgent()`: Transforms character into secret agent theme
- `genLogo()`: Creates business logo maintaining character design
- `genSpread()`: Generates 4-panel comic with dialogue

**Prompt Engineering:**
Each function uses carefully crafted prompts that:

- Specify exact requirements and constraints
- Maintain character consistency across variations
- Include safety filters (no violence/weapons)
- Provide clear instructions for AI models

### 4. **Image Generation Repository (`ImageGenerationRepo.ts`)**

The low-level interface to OpenAI's image generation APIs:

**Core Functions:**

- `generateImage()`: Creates new images from text prompts
- `editImage()`: Modifies existing images using multimodal AI
- `writeFile()`: Saves base64 images to filesystem with timestamps

**Configuration:**

- Uses different OpenAI models (`gpt-image-1` for generation, `gpt-5` for editing)
- Configurable image settings (size, quality, format)
- Error handling and fallback mechanisms

### 5. **Advanced OpenAI Integration (`OpenAI.ts`)**

A more sophisticated wrapper with strategy-based model selection:

**Strategy System:**

- **Initial Creation**: Uses `gpt-image-1` for efficiency
- **Variation Consistency**: Uses `gpt-5` with previous response ID
- **Complex Editing**: Uses `gpt-5` for multimodal tasks
- **Auto Selection**: Intelligently chooses based on context

**Features:**

- Smart model selection based on task type
- Response ID tracking for consistency
- Comprehensive error handling
- Legacy compatibility with existing code

## Complete Workflow

1. **User runs CLI**: `npm run character-gen character.example.yml`
2. **Configuration loaded**: YAML parsed and validated
3. **Base character generated**: Using text-to-image with detailed prompt
4. **User interaction**: Option to regenerate or continue
5. **Sequential variations**: Agent, logo, and comic spread created using image editing
6. **File output**: All images saved with timestamps in `/tmp` directory

## Key Design Patterns

- **Separation of Concerns**: CLI, business logic, and API calls are separate
- **Strategy Pattern**: Different generation strategies for different use cases
- **Error Handling**: Comprehensive error handling at each layer
- **Prompt Engineering**: Specialized prompts for each image type
- **User Experience**: Interactive CLI with progress indicators and validation

This system demonstrates sophisticated AI integration with careful prompt engineering, user experience design, and robust error handling for a complete character generation pipeline.
