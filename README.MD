# Marshmallow

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

# Project Schedule

#### Setup devops

- Docker
- Deploy on aws ecs

# Future Target

- 再加 reactnative 轉 app
- 再用 electron 轉 multiplatform 既 application

# Project Infomation

#### Framework

| Parts    | Name        |
| -------- | ----------- |
| Frontend | Reactjs     |
| Backend  | Nodejs      |
| DataBase | MongoDB     |
| Library  | React Redux |

#### Git Control Tools:

- bitbucket
- sourceTree (GUI Tools)

#### Project control Tools:

- Asana

# Installation

#### Before Start

##### Install the Following application

- [sourceTree](https://www.sourcetreeapp.com/) - Git GUI tools
- [node.js] - For Backend **Version 12.16.1**
- [Visual Studio Code](https://code.visualstudio.com/) - For Editing

##### Plugin Suggestion for visual studio code

- Gitlens
- Prettier
- Simple react snippets

##### Extension Suggestion for Chrome Browser

- [Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - For Redux Debugging
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) - For React Debugging

```
Create config file

After clone please create your own config file
./config/default.json

{
    "jwtSecret": "xxx",
    "mongoURI": "mongodb://xxx",
    "Mongo":{
        "user": "xxx",
        "pwd": "xxx"
    }
}

mongodb create user

mongo --port 27017 -u root -p example --authenticationDatabase admin

use marshmallow
db.createUser( { user: "dbadmin", pwd: "P@ssw0rd", roles: ["readWrite"] })

#Windows User
block like this in store.js
const store = createStore(
rootReducer,
initalState,
compose(
applyMiddleware(...middleware)
// ,
// window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_()
)
);
```

## License

MIT

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dill]: https://github.com/joemccann/dillinger
[git-repo-url]: https://github.com/joemccann/dillinger.git
[john gruber]: http://daringfireball.net
[df1]: http://daringfireball.net/projects/markdown/
[markdown-it]: https://github.com/markdown-it/markdown-it
[ace editor]: http://ace.ajax.org
[node.js]: http://nodejs.org
[twitter bootstrap]: http://twitter.github.com/bootstrap/
[jquery]: http://jquery.com
[@tjholowaychuk]: http://twitter.com/tjholowaychuk
[express]: http://expressjs.com
[angularjs]: http://angularjs.org
[gulp]: http://gulpjs.com
[pldb]: https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md
[plgh]: https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md
[plgd]: https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md
[plod]: https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md
[plme]: https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md
[plga]: https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md
