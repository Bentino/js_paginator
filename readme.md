# JS Paginator
The easiest way to create beautiful pagination for your site with jQuery.

````
$('#after .content').pagination({
	item: 1,
	width: '960px',
	height: '200px',
	margin: '10px',
	row: 1,
	column: 1,
	selector: 'section',
	direction: 'horizontal'
});
````

### Options
* item: Items per page,
	default — 1
* width: Width of 1 item,
	default — 200px
* height: Height of 1 item,
	default — 200px
* margin: Margin of 1 item,
	default — 5px
* row: Define row,
	default — 3
* column: Define column,
	default — 3
* selector: Select children to display in pages,
	default — li
* direction: Animation direction (vertical / horizontal),
	default — vertical
* touch: Touch device enable,
	default — false
* find: Find element (if more than 1 level),
	default — false
