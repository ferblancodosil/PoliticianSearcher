## Politician Searcher

### Run local enviroment

- Make sure to run npm install

- Environmental variables defined in env.yaml, so create a env.yaml that looks like this...

```yaml
development:
  ELASTIC: 'http://localhost:9200'
  PORT: 3000
  NODE_ENV: "development"
  ELASTIC_INDEX_NAME: 'politician',
  REMOVE_INDEX_BEFORE_BULK: true
  FILTER_FIELDS: ["TITULAR"]
  QUERY_RESULTS: 50
  WHITE_LIST: '*'

production:
  ELASTIC: 'http://localhost:9200'
  PORT: 3000
  NODE_ENV: "production"
  ELASTIC_INDEX_NAME: 'politician',
  REMOVE_INDEX_BEFORE_BULK: true
  FILTER_FIELDS: ["TITULAR"]
  QUERY_RESULTS: 50
  WHITE_LIST: ['http://localhost:3000']
```

## Commands

```npm run dev``` run dev server look for env.yaml for environmental variables

```npm run start``` run in production more, not look for env.yaml

MAKE SURE TO JOIN THE SLACK AND DISCORD COMMUNITIES AT DEVNURSERY.COM
