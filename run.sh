#!/bin/bash
node ./dist/app.js | \
{ \
  trap '' INT; \
  tee -ai \
    ./logs/complete.log \
    >(jq -cM --unbuffered 'select(.level == 40)' >> ./logs/user.log) \
    >(jq -cM --unbuffered 'select(.level >= 50)' >> ./logs/error.log)  | \
  ./node_modules/.bin/pino-pretty --levelFirst --ignore hostname,pid,ctx --translateTime SYS:standard; \
}
