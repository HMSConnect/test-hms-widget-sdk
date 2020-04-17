# **Project Structure**

```bash
├── fake
│   ├── mock
│   │   ├── standards
│   │   |   ├── hms_connect
│   │   |   |   ├── ...
│   │   |   |   └── [DOMAIN_RESOURCE_NAME_IN_LOWERCASE].json
│   │   |   ├── smart_fhir
│   │   |   |   ├── ...
│   │   |   |   └── [DOMAIN_RESOURCE_NAME_IN_LOWERCASE].ndjson
|   └── server.js             # Fake data service of HMS (simple sandbox)  
├── app
│   ├── assets                # Any image files for README.md
│   ├── components
│   │   ├── widget            # Stateful components which are ready to use
│   │   |   ├── ...
│   │   |   └── [COMPONENT_NAME].js
│   │   ├── standards         # Stateless components or parser to support :
│   │   |   ├── smart_fhir    # - JSON data object in SmartFHIR standard
│   │   |   |   ├── ...
│   │   |   |   └── [COMPONENT_NAME].js
│   │   |   └── hms_connect   # - JSON data object in HMSConnect standard
│   │   |       ├── ...
│   │   |       └── [COMPONENT_NAME].js
│   │   ├── base              # Any base components which are reuseable
│   │   |   ├── ...
│   │   |   └── [COMPONENT_NAME].js
│   │   └── template          # Component template (if need)
│   │       ├── ...
│   │       └── [COMPONENT_NAME].js
│   ├── dist                  # Built directory (if has)
│   │   ├── ...
│   │   └── index.html
│   ├── node_module           # Any libraries or NPM dependencies
│   ├── pages                 # Page component for showing widgets
│   │   ├── index.js
│   │   ├── ...
│   │   └── dashboard.js
│   ├── static                # Any resources to support the web app
│   │   ├── fonts
│   │   ├── ...
│   │   └── images
│   ├── styles                # Any CSS file (if need)
│   │   ├── ...
│   │   └── css
│   ├── .babelrc              # To support Babel compiler
│   ├── .dockerignore         # Ignore some directory in Docker (if need)
│   ├── .env.development      # Environment for development (required)
│   ├── .env.local            # Environment for local (required)
│   ├── .env.production       # Environment for production (required)
│   ├── .gitignore            # Ignore any directory which are not source code
│   ├── Dockerfile            # File for start/build up Docker
│   ├── next.config.js        # Config webpack for NextJS framework
│   ├── package-lock.json     # Lock library or software dependency version
│   ├── package.json          # Library or software dependency
│   └── routes.js             # Route centralized
│                             
│                             
│                             # Start multi-Docker service via  
│                             # Docker compose in :
├── docker-compose.dev.yml    # - Development environment 
├── docker-compose.local.yml  # - Local environment (local machine)
├── docker-compose.prod.yml   # - Production environment 
├── Jenkinsfile               # To support CI/CD
└── README.md                 # Explain your application detail
```