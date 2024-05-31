# Query Type

In this section, we deal with `Query` object in CRUD parameters,
As you filter data in your sql queries, you can do this in OpenSql.

`Query` object :

| key      | type                 | required | description                                                                                            |
|----------|----------------------|----------|--------------------------------------------------------------------------------------------------------|
| get      | string, string[]     | true     | List of columns Or Single Column Or Function Helper                                                    |
| from     | string, string[]     | true     | List of tables Or Single Table                                                                         |
| where    | Where                | false    | In where object we have Map of columns with function helper for filter data                            |
| whereNot | Where                | false    | Opposite of Where object                                                                               |
| data     | any[], JSONObject    | false    | Used to insert or update data                                                                          |
| union    | UnionObject[]        | false    | Used to combine the result-set of two or more SELECT statements                                        |
| option   | Option               | false    | Manage option query like: limit, order, group or sort data with asc and desc.                          |
| join     | FnResult, FnResult[] | false    | A JOIN clause is used to combine rows from two or more tables, based on a related column between them. |

`Where` object :

The use of the where key is only limited to find, update and remove operations. In fact, it is a filter on the data
output.
When you want to perform an operation on a specific range of data, you use this key in your queries.

| key        | type | required | description |
|------------|------|----------|-------------|
| columnName | any  | true     | ...         |

`UnionObject` object :

The UNION operator is used to combine the result-set of two or more SELECT statements.

* Every SELECT statement within UNION must have the same number of columns
* The columns must also have similar data types
* The columns in every SELECT statement must also be in the same order

| key   | type   | required | description                   |
|-------|--------|----------|-------------------------------|
| value | Query  | true     | Used in Union Function Helper |
| type  | string | true     | Type of Union Function Helper |

`Option` object :

Glide option is a set of well-known keys such as `group by`, `order by`, `having`, `limit` and ` offset`

| key        | type                 | required | description                                                                                           |
|------------|----------------------|----------|-------------------------------------------------------------------------------------------------------|
| columnName | string               | false    | Used to manage order from specific column. For example : DESC Or ASC                                  |
| $group     | string, string[]     | false    | Groups rows that have the same values into summary rows.                                              |
| $having    | FnResult, FnResult[] | false    | The HAVING clause was added to SQL because the WHERE keyword cannot be used with aggregate functions. |
| $order     | string, string[]     | false    | Used to sort the result-set in ascending or descending order.                                         |
| $limit     | number, number[]     | false    | Limited number of records.                                                                            |
| $offset    | number               | false    | Used with the ORDER BY clause with a value greater than or equal to zero.                             |

`FnResult` object :

The output of all function helpers is of FnResult type. OpenSql does not know which type of join and which type of
comparison operator is used in the written query, so you have to specify it.

:::tip
By default, the relation type is `AND` and the comparison operator is `=`.
:::

| key                | type                                                                | required | description              |
|--------------------|---------------------------------------------------------------------|----------|--------------------------|
| value              | string, number, string[], number[], JSONObject, QCheckValueInObject | true     | Value of Function Helper |
| type               | string                                                              | true     | Type of Function Helper  |
| conjunctionType    | string                                                              | false    | AND , OR                 |
| comparisonOperator | string                                                              | false    | `=` , `>=` , `<=` , ...  |

`QCheckValueInObject` object :

Used When you need query something like this :

```sql
SELECT *
FROM Customers
WHERE NOT Country = 'Germany'
  AND NOT Country = 'USA';
```

| key     | type           | required | 
|---------|----------------|----------|
| value   | string, number | true     |
| haveNot | boolean        | false    |

