# Category Endpoint

This can be run with `silk -silk.url="http://localhost:9001"`

## `POST category`

Create additional product's category

```
{
	"name" : "Electronic Accessory",
	"childs" : [
		"Backup Battery"
	],
	"parents" : [
		"Mobile and Tablet"
	]
}
```

===

* `Status: 200`
* `Content-Type: "application/json;charset=UTF-8"`


## `GET category`

Get a list of product's categories