# creatFontTxtServer

creatFontTxtServer 在线造字生成字体的工具。

通过插入拼接字组成你所需要的字

# 安装
 
`npm i`

# npm Scripts

#### reSet font
用于重置字体，项目初次调用的时候使用一次就可以了

#### run server
启动服务，启动之后就可以来造字了。服务端口webAddress:8082(例：http://localhost:8082)


# API

` webAddress:8082/`

访问功能页，页面中展示了已造的字和造字工具

` webAddress:8082/getAll`

获取数据库中存储的所有字 返回的res.data是造的字的数组对象集合

` webAddress:8082/getNewCode`

基于数据库中已有的字符来计算新增将会使用的字符


#数据
本项目使用的是mysql数据库，只使用了一个表 如下

```sql
create table fontlist
(
    id        varchar(64) default '' not null primary key,
    code      varchar(256)           null,
    group   varchar(256)           null,
    creatDate datetime               null,
    delFalg   decimal(16) default 0  null
);
```
首次使用表中插入一条假数据

id任意  

code:`&#xe1000;`     从1000开始自增长  理论上支持16^3-16^2个字

group任意    

时间要这个格式2020-04-22 23:13:00  

delFalg:0


# 项目说明
本项目基于exprss+mysql来搭建服务

主要使用的工具是[font-carrier](http://purplebamboo.github.io/font-carrier/)+[PNGToSVG](https://github.com/mayuso/PNGToSVG)

本人邮箱：only8023y@foxmail.com

未经授权不可用于商用项目

承接定制、外包服务
> 造字 网页造字 web造字 网页开发 在线造字 自定义字体 生成字体 小程序 
