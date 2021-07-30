# tag

找到package.json中版本号，git打标签并推送到服务器。

```
npm i -g jwtag
```

在nodejs的工程目录下：

```
jwtag
```

如果要使用`npm version`更新版本号，可以添加一个参数：

```
jwtag patch
jwtag minor
jwtag major
```

如果想自定义提交信息，可以再加一个参数：
```
jwtag patch "feat: xxx"
```
或者
```
jwtag "feat: xxx"
```
