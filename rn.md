# 🌐📱 React Native Web & App 환경 설정 가이드

이 문서는 React Native 프로젝트를 Web 및 Mobile 환경에서 동작하도록 설정하는 과정을 단계별로 안내합니다.

---

## 📌 1. React 버전 업데이트
- `package.json` 파일에서 `"react": "19.0.0"`을 `"react": "19.1.0"`으로 수정

## 📦 2. 필수 패키지 설치
```sh
npm install react-dom react-native-web
```

## 🔧 3. Babel 플러그인 설치
```sh
npm install --save-dev babel-plugin-react-native-web
```

## ⚙️ 4. Webpack 관련 패키지 설치
```sh
npm install --save-dev @babel/core babel-loader url-loader webpack webpack-cli webpack-dev-server
```

## 🛠 5. Babel 프리셋 및 HTML Webpack Plugin 설치
```sh
npm install @babel/preset-react html-webpack-plugin
```

## 🔹 6. TypeScript 로더 설치
```sh
npm install ts-loader --save-dev
```

## 🚀 7. TypeScript 최신 버전 설치
```sh
npm install --save-dev typescript@latest
```

## 📝 8. `package.json`의 `scripts` 수정
```json
"scripts": {
  "android": "react-native run-android",
  "ios": "react-native run-ios",
  "lint": "eslint .",
  "start": "react-native start",
  "test": "jest",
  "build-react": "webpack --mode production",
  "start-react": "webpack serve --config ./web/webpack.config.js --mode development"
}
```

## 🏗 9. Webpack 설정
- `web` 폴더 생성 및 `webpack.config.js` 파일 추가

### 📄 webpack.config.js 내용
```javascript
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appDirectory = path.resolve(__dirname, '../');

const babelLoaderConfiguration = {
    test: /\.[jt]sx?$/, 
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
        presets: ['@babel/preset-react', '@babel/preset-typescript'],
        plugins: ['react-native-web']
      }
    }
};

const tsLoaderConfiguration = {
    test: /\.tsx?$/, 
    use: 'ts-loader',
    exclude: /node_modules/,
};

module.exports = {
  entry: [
    path.resolve(appDirectory, 'index.js')
  ],
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist')
  },

  module: {
    rules: [
      babelLoaderConfiguration,
      tsLoaderConfiguration,
    ]
  },

  plugins:[new HtmlWebpackPlugin({ template: './public/index.html'})],

  resolve: {
    alias: {
      'react-native$': 'react-native-web'
    },
    extensions: ['.web.js', '.js', '.tsx', '.ts']
  }
};
```

## 📂 10. `public` 폴더 생성 및 `index.html` 파일 추가

### 📄 index.html 내용
```html
<!DOCTYPE html>
<html>
  <head>
    <title>React Native Web</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

## 🔄 11. `index.js` 파일 수정

### 📄 index.js 내용
```javascript
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('app'),
  });
}
```

## 🎯 12. TypeScript 설정 (`tsconfig.json` 수정)

### 📄 tsconfig.json 내용
```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "module": "ESNext",
    "target": "ES6",
    "lib": ["DOM", "ESNext"],
    "jsx": "react-native",
    "moduleResolution": "node",
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "esModuleInterop": true
  },
  "include": ["./src", "App.tsx"],
  "exclude": ["node_modules", "babel.config.js", "metro.config.js"]
}
```

## 🏆 13. `App.tsx` 파일 수정

### 📄 App.tsx 내용
```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function App(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>hello world</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
  },
});

export default App;
```

---

## 🚀 실행 방법
### 🌍 웹 실행
```sh
npm run start-react
```

### 📱 앱 실행 (Android)
```sh
npx react-native run-android
```

### 🍏 앱 실행 (iOS)
```sh
npx react-native run-ios
```

이 가이드를 따라하면 React Native 프로젝트를 웹과 앱 환경에서 실행할 수 있습니다! 🎉
