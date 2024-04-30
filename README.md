## 项目简介

这是星火链网 Remix IDE 仓库

## 克隆代码

```bash
// github 地址
git clone https://github.com/drafish/remix-project
// 或者 gitee 地址
git clone https://gitee.com/drafish/remix-project

// 切到 bif 分支
git checkout bif
```

## 开发环境

```bash
// 安装依赖
yarn

// 启动开发环境
yarn serve
```

## 生产环境

```bash
// 构建生产环境
yarn build:production
```

生产环境构建成功后，Remix IDE 的静态文件目录如下

- `dist/apps/remix-ide`

将该目录上传到服务器，然后配置 nginx 。nginx 配置示例如下

- [nginx.conf](./nginx.conf)

## 更改星火链网插件域名

bif 分支为星火链网 Remix IDE 专用分支，插件的信息都维护在 [metadata.json](./apps/remix-ide/src/assets/metadata.json) 中

如需修改星火链网插件域名 ，只需打开 metadata.json 文件，然后全文搜索 dev.remix.bitfactory.cn ，修改该域名后，重新编译部署即可。
