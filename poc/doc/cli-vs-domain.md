# CLI vs Domain (in coop-csnet-cli)

Based on my exploration of the codebase, I can now provide you with a comprehensive explanation of both the `domain` and `cli` folders:

## Domain Folder (`src/domain/`)

The **domain folder** is the core business logic layer of this Co-op CS Net POC project. It implements a **Domain-Driven Design (DDD)** architecture with clean separation of concerns.

### Purpose
This folder contains the core business domain logic for a cooperative (co-op) catalog planning system. It's designed to help LLMs assist with weekly catalog planning through Text-to-SQL capabilities.

### Key Modules

1. **CatalogPlan** - Handles catalog planning data
   - `PrimaryCatalogPlan` - Main catalog planning information
   - `ThemedPromotionItem` - Themed promotion items
   - `ThemedPromotionPdf` - PDF conversion for promotions

2. **Product** - Product information management
   - Product catalog data with pricing, categories, and supply information
   - Handles both CS (cooperative) and individual cooperative pricing

3. **SupplyReport** - Supply reporting and analytics
   - `ByProductTotal` - Product-level supply totals
   - `ByApproachTotal` - Approach-level supply totals  
   - `ByApproachOverview` - High-level approach summaries

4. **WeatherHistory** - Weather data for planning correlation

5. **MiniETL** - Lightweight Extract, Transform, Load system
   - Processes Excel/CSV files into DuckDB
   - Handles data extraction, transformation, and database loading
   - Supports multiple file formats (XLSX, CSV, images)

6. **LiteOCR** - Optical Character Recognition
   - Integrates with AI services (Claude, OpenAI) for text extraction
   - Used for processing catalog layouts and promotional materials

7. **OlapClient** - Database client for DuckDB
   - Provides SQL query capabilities
   - Handles table definitions and schema management

### Architecture Pattern
- **Entity/UseCase pattern** - Each domain has entities and use cases
- **Atomic components** - Reusable building blocks
- **Vendor integrations** - External service integrations
- **Dependency injection** - Clean dependency management

## CLI Folder (`src/cli/`)

The **CLI folder** is a command-line interface that orchestrates the ETL (Extract, Transform, Load) processes for the domain layer.

### Purpose
Provides a command-line tool to execute data processing workflows that transform raw business documents into queryable databases.

### Key Features

1. **ETL Orchestration** - Uses Commander.js to create CLI commands
2. **Data Processing Pipeline** - Processes data through multiple stages:
   - **Original** → Raw business documents (Excel files, PDFs, etc.)
   - **Processed** → Transformed JSON data with SQL schemas
   - **Standby** → DuckDB databases ready for querying

3. **Multiple Data Sources**:
   - **Catalog Plans** → `primary_catalog.duckdb`
   - **Supply Reports** → `supply_result.duckdb` 
   - **Product Data** → `product.duckdb`
   - **Weather Data** → `weather.duckdb`

### Available Commands

- `all` - Executes all ETL processes
- `themed-promotion-pdf` - Converts themed promotion pages to PDF

### Dependencies
- **Commander.js** - CLI framework
- **Domain layer** - Imports and uses all domain modules
- **File system operations** - Handles file I/O and path management

## Relationship Between Domain and CLI

The CLI acts as the **orchestration layer** that uses the domain's business logic:

1. **CLI** defines the workflow and commands
2. **Domain** provides the actual processing logic
3. **CLI** imports domain processors and executes them in sequence
4. **Domain** handles the complex business rules and data transformations

This separation allows the domain logic to be reused across different interfaces (CLI, API, etc.) while keeping the CLI focused on workflow orchestration and user interaction.

The system is designed to help cooperative organizations plan their weekly catalogs by processing historical data and making it queryable through natural language interfaces via MCP (Model Context Protocol) servers.
