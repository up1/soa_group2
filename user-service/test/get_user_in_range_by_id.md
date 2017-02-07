# Get user information by ID

This can be run with `silk -silk.url="http://localhost:9001"`

## `GET users?page=10&item_per_page=30`

Perform a find users information with id `271` to  `300`.

===

* `Status: 200`
* `Content-Type: "application/json;charset=UTF-8"`
    ```
[{"id":271,"firstname":"Antonio","lastname":"Burton"},{"id":272,"firstname":"Virginia","lastname":"Johnson"},{"id":273,"firstname":"Chris","lastname":"Payne"},{"id":274,"firstname":"Thomas","lastname":"Nichols"},{"id":275,"firstname":"Lillian","lastname":"Cooper"},{"id":276,"firstname":"Henry","lastname":"Carter"},{"id":277,"firstname":"Phyllis","lastname":"Patterson"},{"id":278,"firstname":"Juan","lastname":"Weaver"},{"id":279,"firstname":"Billy","lastname":"Harvey"},{"id":280,"firstname":"Benjamin","lastname":"Meyer"},{"id":281,"firstname":"Charles","lastname":"Richardson"},{"id":282,"firstname":"Stephanie","lastname":"Peterson"},{"id":283,"firstname":"Tina","lastname":"Moore"},{"id":284,"firstname":"Gary","lastname":"Perkins"},{"id":285,"firstname":"Earl","lastname":"Jordan"},{"id":286,"firstname":"Christine","lastname":"Mcdonald"},{"id":287,"firstname":"Eric","lastname":"Stevens"},{"id":288,"firstname":"Amy","lastname":"Morrison"},{"id":289,"firstname":"Ernest","lastname":"Lewis"},{"id":290,"firstname":"Robert","lastname":"Jones"},{"id":291,"firstname":"Julia","lastname":"Woods"},{"id":292,"firstname":"Lois","lastname":"Wallace"},{"id":293,"firstname":"Chris","lastname":"Ferguson"},{"id":294,"firstname":"Aaron","lastname":"Harvey"},{"id":295,"firstname":"Peter","lastname":"Mills"},{"id":296,"firstname":"Tammy","lastname":"Kelly"},{"id":297,"firstname":"Mark","lastname":"Stone"},{"id":298,"firstname":"Kelly","lastname":"Ray"},{"id":299,"firstname":"Sharon","lastname":"Richards"},{"id":300,"firstname":"Andrea","lastname":"Knight"}]
    ```