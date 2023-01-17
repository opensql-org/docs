---
sidebar_position: 1
---

# Configuration

Let's discover **Opensql in less than 5 minutes**.

## Getting Started

Enter the following command to install :

```bash
npm i opensql
```

### What you'll need

You only need to install the database driver that you want to use ,
also have to manually install the driver for your database of choice:

```shell
# One of the following:
$ npm i --save-dev pg # Postgres
$ npm i --save-dev mysql2 # Mysql
$ npm i --save-dev mssql # Microsoft Sql Server
```

## Connecting to a database

To connect to the database, you must create a [`Opensql`](./beginner/connection) instance. This can be done by either passing the connection parameters separately to the Opensql constructor or by passing a single connection URI:

```ts
import {OpenSql} from 'opensql';

let opensql = new OpenSql('mysql://localhost:3306/foo?user=root&password=123');

opensql.findOne({from: 'users'}).then((data: any) => {
    console.log(data)
});
```