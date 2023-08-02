### Modify .env

```
OPENAI_BASE=https://api.openai.com/v1
OPENAI_KEY=sk-***

GPT_BASE=*** ## Fallback to reversed proxy
GPT_KEY=***
```

### Installation

```bash
yarn install ## or npm install
```

### VS Code setup

1. Using [Code Runner](https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner) extension
    Add this to your settings
    ```json
    {
        // ...

        "code-runner.executorMap" : {
            "typescript" : "node --experimental-specifier-resolution=node --loader ts-node/esm"
        }

    }
    
    ```

### Example

```bash
yarn run example ## or npm run example
```