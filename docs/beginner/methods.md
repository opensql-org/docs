# Methods

After connecting to the database, you have access to the methods, each method performs its own tasks and returns
different outputs using promises.

## Create

Opensql supports the table creation operation, you can understand how best to test the software, 
don't just focus on the tests written in relation to the tables, pay attention to other operations and read their 
[Create table tests](https://github.com/treegex/opensql/blob/main/test/index.test.ts),
[Opensql tests](https://github.com/treegex/opensql/tree/main/test), [sql parser tests](https://github.com/treegex/opensql/tree/main/lib/sql-parser/test).

### Database

```ts
opensql.createDatabase(
    name,   // string
    set,    // string?
    collate // string?
);
```

#### Arguments

`name` **:** Database Name

`set` **:** Database CHARACTER SET by default `UTF8`

`collate` **:** Database Collation Name by default `UTF8_UNICODE_CI`

### Table

```ts
opensql.createTable(
    ct   // CreateTable
);
```

CreateTable is an object that receives input from the user:

| key        | type             | required | description                                                                         |
|------------|------------------|----------|-------------------------------------------------------------------------------------|
| table      | string           | true     | Table name                                                                          |
| column     | JSONString       | true     | Map of columns with data type , etc                                                 |
| index      | string[]         | false    | List of columns that you want to index for fast research                            |
| unique     | string[]         | false    | List of columns that you want to ensures that all values in a column are different. |
| primaryKey | string, string[] | false    | List of columns Or column that you want to add primary key                          |
| foreignKey | ForeignKeyObject | false    | Map of columns that you want to add foreign key                                     |

#### `JSONString`

Is object, The keys written in this object are treated as column names And the values of that data type are
the column and the options of that column

#### `ForeignKeyObject`

Is object , The keys of this object do not affect the sql output, so you can choose a desired name
for each key, but its values are of ForeignKey type. This object has several parameters with it, which we will learn
about later

### ForeignKey

| key      | type             | required | description                                            |
|----------|------------------|----------|--------------------------------------------------------|
| get      | string, string[] | true     | Column name that you want to reference in other tables |
| to       | string           | true     | Target table name                                      |
| column   | string, string[] | true     | Column of target table                                 |
| onUpdate | RefState         | false    | enum data type                                         |
| onDelete | RefState         | false    | enum data type                                         |

Example code:

```ts
opensql.createTable({
    table: 'users',
    column: {
        id: DataType.INT([NOT_NULL, AUTO_INCREMENT]),
        email: DataType.VARCHAR([NOT_NULL, 255]),
        phone: DataType.VARCHAR(20)
    },
    primaryKey: 'id'
});
```

## Drop

### Database

```ts
opensql.dropDatabase(
    name   // string
);
```

### Table

```ts
opensql.dropTable(
    tableName   // string | string[]
);
```

:::tip Truncate Table
If you want to delete only the contents of the table, use the truncateTable method

```ts
opensql.truncateTable(
    tableName   // string
);
```
:::

## CRUD

In this section, we talk about the crud operation in Opensql and provide you with important points.

:::note 📒 **Note:**
If you do not know anything about the Query object, refer to
the <a style={{color:"blue"}} href="./QueryType">QueryType</a> page
:::

As you can see, three methods are written for the insert operation, each of them performs a unique operation and has
different inputs.

### addOne

The `addOne` method is used when you want to add a record to your table in each column:

```ts
opensql.addOne(
    query   // Query
);
```

Example code:

```ts
opensql.addOne({
    from: 'users',
    data: {
        username: 'root'
    }
});
```

# Select

There are three methods for the select operation, the only difference is in the different outputs.

### find

The find method is executed by Opensql without changing the object, but the two methods `findOne` and `findMany` only
affect the output size.

```ts
opensql.find(
    query   // Query
);
```

Example code:

```ts
opensql.find({
    from: 'users'
});
```

### Update

The update method allows you to update your data :

```ts
opensql.update(
    query   // Query
);
```

Example code:

```ts
opensql.update({
    from: 'users',
    data: {
        bio: 'Simple test'
    },
    where: {
        username: 'root'
    }
});
```

The remove method allows you to delete your data :

### remove

```ts
opensql.remove(
    query   // Query
);
```

Example code:

```ts
opensql.remove({
    from: 'users',
    where: {
        username: 'root'
    }
});
```

## Others

### addWithFind

The `addWithFind` method is used when you want to add a record with select operation:

```ts
opensql.addWithFind(
    targetTableName, // string | TargetTable
    query   // Query
);
```

Example code:

```ts
opensql.addWithFind('book', {
    from: 'users',
    where: {
        username: 'root'
    }
});
```

### addMany

The `addMany` method is used when you want to add several records to your table in each column:

```ts
opensql.addMany(
    query   // Query
);
```

Example code:

```ts
opensql.addMany({
    from: 'users',
    get: ['username', 'password'],
    data: [
        'root', '123',
        'treegex', 'Password123'
    ]
});
```


### findOne

The only difference between the `findOne` and `findMany` methods is in limiting the data

```ts
opensql.findOne(
    query   // Query
);
```

Example code:

```ts
opensql.findOne({
    from: 'users'
});
```

### findById

findById uses the column `id` in the table, if the unique column name is different, Opensql cannot find the desired column.

```ts
opensql.findById(
    id,     // number
    query   // Query
);
```

Example code:

```ts
opensql.findById(50, {
    from: 'users'
});
```

### findMany

The `findMany` method has a limit parameter of number type that you can increase or decrease the limit values. By
default, the output data is 10 numbers.

```ts
opensql.findMany(
    query,   // Query
    limit   // number?
);
```

Example code:

```ts
opensql.findMany({
    from: 'users'
});
```

Changing default limit:

Example code:

```ts
opensql.findMany({
    from: 'users'
}, 5);
```

### Custom query

If your queries are very complex, it is better to write them without any problems using the query method. It should be
noted that in the second parameter, you can use it to prevent injection in SQL.

```ts
opensql.query(
    sql,     // string
    injection // any?
);
```