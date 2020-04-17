# **HMS Widget SDK**
![Node.js CI](https://github.com/HMSConnect/test-hms-widget-sdk/workflows/Node.js%20CI/badge.svg?branch=master)

Fork some part of `hms-widget-sdk` on branch name `feature/sprint4` without containerize.

## **Project structure**

```bash
repository
|- app            # <------------ main service
.
.
|- fake           # <------------ in-memory mock data service
|- ...
`- README.md
```

## **Usage**

### 1. Start mock data service

```bash
# from root directory
$ cd fake
$ npm i
$ npm run dev
```

### 2. Start Main app

```bash
# from root directory
$ cd app
$ npm i
$ npm run dev
```

Enjoy the widget via

```
http://localhost:3000
```

## License

MIT License
