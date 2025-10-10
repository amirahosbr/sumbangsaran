Based on domain architecture and the nature of `BASE_IMAGE_STYLE`, I recommend **creating a new Value Object** for it. Here's why:

## Analysis

Looking at current VOs:

- `ImagePrompt`: Contains prompt text, style enum, and size
- `CanvasRules`: Contains layout rules and defaults
- `ColorPalette`: Contains color scheme

The `BASE_IMAGE_STYLE` is a **domain concept** that represents the visual aesthetic rules for character generation. It's:

1. **Immutable business rule** (like other VOs)
2. **Reusable across different use cases**
3. **Domain knowledge** that should be composable and testable
4. **Configuration-like** but with business meaning

## Domain Architecture

- **Value Objects (vo/)**: Simple, immutable data structures with validation (like `ColorPalette`, `ImagePrompt`)
- **Entities**: More complex business objects that may contain multiple VOs
- **Use Cases**: Business logic and orchestration
- **Vendors**: External API integrations

## Why This Structure?

1. **BackgroundColor in vo/**: It's a simple value object like `ColorPalette` - immutable data with validation
2. **HuemintApi in vendor/**: External API integrations belong here, following your existing `AISdk` pattern
3. **No separate usecase**: Since you want "simple use only", just enhance the existing `CharacterDesigner`
4. **Follows your patterns**: Matches your existing namespace and export structure

## Architecture Design

1. Ubiquitous Language Definition
   Based on your requirements, here's the proposed ubiquitous language:

- Character: The main mascot design (not "Mascot" to avoid confusion)
- Base: The foundational character image used as reference
- Spread: Visual deployment/application examples across various scenes
- Canvas: The image dimensions and layout rules
- Palette: Color scheme for the character
- Variation: Different versions of the character (logo, storytelling, etc.)
- Function Signatures First
- Proposed Domain Structure
- Core Domain Use Cases
- Vendor Layer (3rd Party APIs)
- CLI Layer (Parameter Injection)
- Development Workflow
  Following your requirements:
- First Step: Simple CLI that invokes OpenAI image API
- Gradual Development: Small, mergeable PRs
- GitHub Board: Track issues and PRs
  Unit Tests: Execute domain logic via tests
  This architecture provides:
  ✅ Domain-centric: Core logic in domain layer
  ✅ Modular: Composable components with clear interfaces
  ✅ Parameter Injectable: Dependencies injected via interfaces
  ✅ Instagram Ratio: Canvas.instagram() provides 4:5 ratio
  ✅ CLI Subcommands: master and spread separated
  ✅ Export Focus: Images + JSON/Markdown output
  ✅ Vendor Isolation: 3rd party APIs in vendor layer
  ✅ Testable: Unit tests for domain logic
  ✅ Small Steps: Can start with just master generation
  Would you like me to elaborate on any specific part of this architecture?

# Ubiquitous Language Definition for Image Generation Domain

Based on your current codebase analysis, here's the comprehensive Ubiquitous Language for your image generation domain:

## **Core Business Concepts**

### **Character**

The main visual mascot representing a business entity. A character is the central creative asset that embodies the business personality and brand identity.

- **Usage**: Primary term for all mascot-related functionality
- **Example**: "Generate a character for Star Sip business"
- **Code**: `CharacterDesigner`, `characterDescription`

### **Business Concept**

The foundational business information that drives character creation, including business identity, character description, and visual preferences.

- **Components**: businessName, businessType, characterDescription, keywords, secretAgentName, colorPalette
- **Example**: "Star Sip" + "Night-Sky Milk-Tea" + character details
- **Code**: `BusinessConcept.t`

## **Character Creation Process**

### **Master**

The foundational, primary character image that serves as the reference for all variations. This is the "source of truth" character design.

- **Usage**: "Generate master character image"
- **Purpose**: Base reference for consistency across variations
- **Code**: `CharacterVariation.BASE`

### **Variation**

Different versions or applications of the master character for specific use cases.

- **Types**:
  - **Base**: The master reference character
  - **Icon**: Simplified head-only version for logos
  - **Storytelling**: 4-panel comic strip format
  - **Mascot**: Photorealistic life-sized version
  - **Secret Agent**: Character in professional agent attire
- **Code**: `CharacterVariation` enum

### **Spread**

The visual deployment or application examples of character images across various scenes and contexts. Represents how the character appears in different scenarios.

- **Usage**: "Generate character spread variations"
- **Purpose**: Show character versatility and applications
- **Example**: Logo version, storytelling panels, mascot photos

## **Visual Design Elements**

### **Canvas**

The image dimensions, layout rules, and structural constraints that define the visual container for the character.

- **Properties**: aspect ratio, size, padding, alignment, border
- **Example**: Instagram format (4:5 ratio), square format (1:1 ratio)
- **Code**: `CanvasRules.t`

### **Palette**

The color scheme defining the character's visual identity through primary, secondary, and accent colors.

- **Structure**: Three-color system (primary, secondary, accent)
- **Example**: navy (primary), gold (secondary), aqua (accent)
- **Code**: `ColorPalette.t`

### **Style**

The visual aesthetic approach that defines the artistic rendering technique and visual characteristics.

- **Current Types**: kawaii, photorealistic, Pixar short film style
- **Purpose**: Consistent visual treatment across all character images
- **Code**: `ImagePrompt.style`, `BASE_IMAGE_STYLE`

### **Prompt**

The textual instruction that describes the desired image output, combining style, character details, and technical specifications.

- **Components**: descriptive text, style reference, size specifications
- **Purpose**: Bridge between business concept and AI image generation
- **Code**: `ImagePrompt.t`

## **Technical Infrastructure**

### **Generator**

The service responsible for creating character images from prompts using external AI services.

- **Types**: Image generator, background color generator
- **Purpose**: Abstract interface for AI image creation services
- **Code**: Vendor layer implementations

### **Designer**

The use case orchestrator that builds prompts and coordinates the character creation process.

- **Responsibility**: Business logic for character design workflow
- **Purpose**: Transform business concepts into generation instructions
- **Code**: `CharacterDesigner` namespace

## **Output Artifacts**

### **Manifest**

The metadata document containing character information, generation details, and technical specifications.

- **Format**: JSON structure with character story, design decisions, timestamps
- **Purpose**: Documentation and reproducibility of character generation
- **Usage**: Export alongside generated images

### **Export**

The process of saving generated character images and associated metadata to the file system.

- **Outputs**: Image files (PNG/WebP), manifest (JSON), story (Markdown)
- **Purpose**: Deliverable assets for client use
- **CLI**: `--output` directory parameter

## **Domain Rules & Constraints**

### **Aspect Ratio Standards**

- **Instagram**: 4:5 ratio (1080x1350) - Primary social media format
- **Square**: 1:1 ratio (1080x1080) - Universal compatibility
- **Story**: 9:16 ratio (1080x1920) - Vertical story format

### **Character Consistency**

All variations must maintain visual consistency with the master character while adapting to specific use case requirements.

### **Style Coherence**

Each character must adhere to a single visual style throughout all variations to maintain brand identity.

## **CLI Command Structure**

### **Master Command**

Generate the foundational character image.

```bash
character-image master --business-name "Star Sip" --output ./images
```

### **Spread Command**

Generate character variations from existing master.

```bash
character-image spread --master ./master-manifest.json --variations "icon,storytelling" --output ./spread
```

## **One-Word Descriptors (Where Possible)**

- **Character** (not "mascot" - more flexible)
- **Master** (not "base" - clearer hierarchy)
- **Variation** (not "version" - implies purpose-driven change)
- **Spread** (not "deployment" - visual distribution concept)
- **Canvas** (not "layout" - artistic framing concept)
- **Palette** (not "colors" - curated color scheme)
- **Style** (not "aesthetic" - rendering approach)
- **Prompt** (not "instruction" - AI generation input)
- **Generator** (not "service" - creation capability)
- **Designer** (not "builder" - creative orchestration)
- **Manifest** (not "metadata" - comprehensive documentation)
- **Export** (not "save" - deliverable creation)

This ubiquitous language ensures consistent terminology across your domain, CLI, documentation, and team communication, making the system more maintainable and understandable for all stakeholders.
